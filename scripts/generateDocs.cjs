const child_process = require("child_process");
const fs = require("fs");
const path = require("path");

const { paramCase } = require("change-case");
const handlebars = require("handlebars");
var helpers = require("handlebars-helpers");
helpers.string();
const _ = require("lodash");
const { inspect } = require("util");
const menuOrder = require("./menuOrder.cjs");

const API_TEMPLATE_FILE = "./docs/templates/api.hbs";
const PARTIALS_PATH = "./docs/templates/partials";
const TAG_TEMPLATE_PATH = "./docs/templates/tag-templates";
const OUTPUT_PATH = "./docs/output";

function run() {
  const jsdocsData = generateJSDocData();
  const data = parseData(jsdocsData);
  writeDataToTemplates(data);
}

function generateJSDocData() {
  const command = "npx jsdoc --explain -c ./jsdoc.json";
  try {
    return child_process.execSync(command).toString();
  } catch (err) {
    console.error(`Unable to generate JSDoc data with command "${command}"`);
    console.error(err.message);
  }
}

/**
 * Transforms JSDoc data (an array of JSDOC identifiers) into the structure
 * expected by our Handlebars templates:
 *
 * {
 *   [tag: string]: {
 *     classes: [
 *       {
 *         name: string,
 *         identifier: identifier,
 *         constructor: identifier,
 *         members: identifier[],
 *         functions: identifier[],
 *       }
 *     ],
 *     functions: identifier[],
 *     enums: {
 *       name: string,
 *       identifier: identifier,
 *       members: identifier[],
 *     },
 *     types: identifier[]
 *   }
 * }
 */
function parseData(jsdocsData) {
  // Parse JSDoc data
  const jsdocs = JSON.parse(jsdocsData);

  // Filter out identifiers we don't need
  const jsdocDataFiltered = jsdocs
    .filter((x) => x.comment)
    .filter((x) => x.access !== "private")
    .filter(
      (x) =>
        (x.kind === "constant" && x.scope === "global") ||
        x.kind === "member" ||
        x.kind === "typedef" ||
        x.kind === "class" ||
        x.kind === "constructor" ||
        x.kind === "function"
    );

  // Adds relative links to typedef properties
  // TODO: Handle parameters in functions
  const typeAndEnumNames = jsdocDataFiltered
    .filter((doc, i) => doc.kind === "typedef" || "enum")
    .map((doc) => doc.name.toLowerCase());
  const mappedJsdoc = jsdocDataFiltered.map((doc, i) => {
    function mapTypes(propOrParam) {
      if (propOrParam.type.names) {
        propOrParam.type.names.forEach((name, index) => {
          // Check if the value is an array

          let isArray = name.includes("Array.<");
          const tagName = name.replace("Array.<", "").replace(">", "");
          // Find link value for each name
          const typeToMatch = isArray ? tagName : name;
          const i = typeAndEnumNames.indexOf(typeToMatch.toLowerCase());
          // Hydrate the names array with an object with additional information
          propOrParam.type.names[index] = {
            link: i >= 0 ? `#${typeToMatch.toLowerCase()}` : null,
            name: name,
            isArray,
          };
        });
        return propOrParam;
      }
    }
    if (doc.kind === "typedef") {
      doc.properties = doc.properties.map((prop) => mapTypes(prop));
    }
    if (doc.kind == "function") {
      doc.params = doc.params.map((param) => mapTypes(param));
    }
    if (doc.kind === "constructor") {
      doc.params = doc.params.map((param) => mapTypes(param));
    }
    if (doc.kind === "member") {
      // TODO: Add link to the member that goes to the proper page
      // doc.params = doc.params.map((param) => mapTypes(param))
    }
    return doc;
  });

  // Group identifiers by tag
  const jsdocDataByTag = _.groupBy(mappedJsdoc, (x) =>
    x.tags?.length ? x.tags[0].text : "untagged"
  );

  // Organize each tag's identifiers into properties our doc templates expect
  const docData = {};
  for (let tag of Object.keys(jsdocDataByTag)) {
    const idents = jsdocDataByTag[tag];

    // Get weight to ensure proper order of
    const tagIndex = menuOrder.indexOf(tag);
    const weight = (tagIndex + 1) * 10;
    if (tag === "Moov") tag = "Node SDK";
    docData[tag] = {
      name: tag,
      weight,
    };

    // Classes and their members
    docData[tag].classes = [];
    const classes = _.remove(idents, (x) => x.kind === "class");
    for (let cls of classes) {
      // Skip duplicate classes (JSDoc bug?)
      if (docData[tag].classes.filter((x) => x.name === cls.name).length) {
        continue;
      }

      // Get constructor
      const constructor = _.first(
        _.remove(
          idents,
          (x) => x.kind === "constructor" && x.memberof === cls.name
        )
      );

      // Get members and functions
      const members = _.remove(
        idents,
        (x) => x.kind === "member" && x.memberof === cls.name
      );
      const functions = _.remove(
        idents,
        (x) => x.kind === "function" && x.memberof === cls.name
      );

      // Record the class name, its members, and its functions
      docData[tag].classes.push({
        name: cls.name,
        identifier: cls,
        constructor,
        members,
        functions,
      });
    }

    // Functions
    docData[tag].functions = _.remove(idents, (x) => x.kind === "function");

    // Enumerations and their members
    docData[tag].enums = [];
    const enums = _.remove(idents, (x) => x.kind === "constant" && x.isEnum);
    for (let e of enums) {
      // Get members
      const members = _.remove(
        idents,
        (x) => x.kind === "member" && x.memberof === e.name
      );

      docData[tag].enums.push({
        name: e.name,
        identifier: e,
        members,
      });
    }

    // Types and their properties
    docData[tag].types = _.remove(idents, (x) => x.kind === "typedef");
  }

  return docData;
}

/**
 * Writes transformed doc data first using the API template and then using the
 * tag's template if it exists.
 */
function writeDataToTemplates(data) {
  // Register helpers
  handlebars.registerHelper("descriptionIfSummary", (x) =>
    x.summary ? x.description : ""
  );
  handlebars.registerHelper("isConstructor", (x) => x.kind === "constructor");
  handlebars.registerHelper("isGlobal", (x) => x.scope === "global");
  handlebars.registerHelper("isTopLevelParam", (x) => x.indexOf(".") === -1);
  handlebars.registerHelper("joinTypes", (x) => x.join(", "));
  handlebars.registerHelper(
    "object",
    (obj) => new handlebars.SafeString(inspect(obj))
  );
  handlebars.registerHelper(
    "summaryOrDescription",
    (x) => x.summary || x.description
  );
  handlebars.registerHelper("paramCase", (x) => paramCase(x));
  handlebars.registerHelper("capitalizeFirst");
  // Renders the inline link
  handlebars.registerHelper("renderLink", (name, link, isArray) => {
    if (isArray && link != null) {
      const linkText = name.replace("Array.<", "").replace(">", "");
      return `Array.<[${linkText}](${link})>`;
    } else if (link != null) {
      return `[${name}](${link})`;
    } else {
      const noQuotes = name.replace(/"/g, "");
      return `\`${noQuotes}\``;
    }
  });

  // Register partials
  try {
    const partialFiles = fs.readdirSync(PARTIALS_PATH);
    for (let partialFile of partialFiles) {
      if (path.extname(partialFile) === ".hbs") {
        // Open partial file
        const partialContent = fs.readFileSync(
          path.join(PARTIALS_PATH, partialFile),
          "utf-8"
        );

        // Register partial
        const partialName = path
          .basename(partialFile)
          .slice(0, partialFile.lastIndexOf("."));
        handlebars.registerPartial(partialName, partialContent);
      }
    }
  } catch (err) {
    console.error(`Unable to register partials from "${PARTIALS_PATH}"`);
    console.error(err.message);
    process.exit(1);
  }

  // Load and compile the API template
  let apiContent;
  try {
    apiContent = fs.readFileSync(API_TEMPLATE_FILE, "utf-8");
  } catch (err) {
    console.error(
      `Unable to load the API template at "${API_TEMPLATE_FILE}". Did it move?`
    );
    console.error(err.message);
    process.exit(1);
  }
  const apiTemplate = handlebars.compile(apiContent, { noEscape: true });

  // Process our docs by tag
  for (let tag of Object.keys(data)) {
    // Compile using the API template
    const apiDocs = {
      apiDocs: apiTemplate(data[tag]),
    };

    // Look for a template for this specific tag
    let tagContent = "{{apiDocs}}";
    let usingTagTemplate = false;
    try {
      tagContent = fs.readFileSync(
        path.join(TAG_TEMPLATE_PATH, `${tag}.hbs`),
        "utf-8"
      );
      usingTagTemplate = true;
    } catch {
      // Intentional no-op
    }
    const tagTemplate = handlebars.compile(tagContent, { noEscape: true });

    // Write the final file
    let filename = tag;
    // Rename Moov tag to index;
    if (tag === "Node SDK") filename = "_index";
    const filenameWithDashes = filename.replace(" ", "-");
    const outputPath = path.join(
      OUTPUT_PATH,
      `${filenameWithDashes.toLowerCase()}.md`
    );
    try {
      fs.writeFileSync(
        outputPath,
        tagTemplate(usingTagTemplate ? data[tag] : apiDocs)
      );

      const localCopy = false;
      if (localCopy) {
        const pathToDocRepo = "/Users/scottmoov/Documents/projects/"; // Replace with path to cloned docs repo
        const localpath =
          "docs/content/node/" + filenameWithDashes.toLowerCase() + ".md";
        fs.writeFileSync(
          pathToDocRepo + localpath,
          tagTemplate(usingTagTemplate ? data[tag] : apiDocs)
        );
      }
    } catch (err) {
      console.error(`Unable to write docs to "${outputPath}"`);
      console.error(err.message);
      process.exit(1);
    }
  }
}

run();
