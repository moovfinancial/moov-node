# Node SDK for Moov API

This SDK provides convenient configurations and methods for using the Moov API in a server-side Node.js environment. 

## Installation

```shell
npm install @moovio/node
```

## Usage

Initialize the Moov client with your account ID and API key credentials. Get
these from the Moov Dashboard.

```javascript
import { Moov } from "@moovio/node";

const moov = new Moov({
  accountID: "...",
  publicKey: "...",
  secretKey: "...",
  domain: "...",
});
await moov.ping();
```

Generate OAuth tokens for Moov.js and Moov Drops using `Moov.generateToken()`.

```javascript
import { Moov, SCOPES } from "@moovio/node";

const moov = new Moov({
  accountID: "...",
  publicKey: "...",
  secretKey: "...",
  domain: "...",
});
const token = await moov.generateToken([SCOPES.ACCOUNTS_CREATE]);
```

See the [`/examples`]() folder for more details.

## Documentation

The node SDK is documented using [JSDoc](https://jsdoc.app/index.html) comments to annotate functions, methods, types, and enums. This allows us to provide autofill and inline context to developers, and is used to generate markdown files which are copied into our docs repo and exposed on docs.moov.io.

The following JSDoc tags should be included on any functions, methods, types, and enums that we want to expose to end users. 

@summary - Short description that appears at the start of the section

@description - Longer description that will appear at start if no summary is provided. 

@example - Used to include a code example of how a customer would implement this. Multiple examples can be used. 

@param - Documents a parameter of a function or method. 

@returns - What the function will return

@tag - The tag determines which markdown file the element will be included on. 

@typedef - To document types like `Account` or `Transfer`. You can reference other types in your type definition. 

@property - Used with the @typedef to document a propery of the type. 

@enum - To document Enums

@private - To not include the in any public documentation for customers.

## Documentation generation

To generate the documentation, run

```bash
npm run docs
```

The generation logic is in `scripts/generateDocs.cjs`. We parse the raw data produced by JSDoc and then run it through a set of handlebars templates in `docs/templates`. The final output is in `docs/output`.

Handlebars "helpers" do a lot of the custom documentation generation we require for our documentation website. See the calls to `handlebars.registerHelper()` in `scripts/generateDocs.cjs` for more information.

## Troubleshooting and support

TBD

## Prerequisite
Node.js minimum version of 14.17.0 is required.

## Changelog

See [CHANGELOG.md](/CHANGELOG.md) for details.

## License

Apache 2.0. See [LICENSE](/LICENSE) for details.

## Contributing

Yes, please! Be sure to start a [discussion](moovfinancial/moov-node/discussions) or create an [issue](moovfinancial/moov-node/issues) before submitting a pull request.
