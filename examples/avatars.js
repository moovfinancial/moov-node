import { Moov } from "@moovio/node";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

// TODO: Fill in unique ID
const UNIQUE_ID = "031100649"; // Discover routing number

/**
 * Demonstrate how to get avatar associated with uniqueID.
 */
async function run() {
  try {
    // Load credentials and initialize the Moov client
    const credentials = loadCredentials("./secrets/credentials.json");
    const moov = new Moov(credentials, gotOptionsForLogging);

    await moov.avatars.get(UNIQUE_ID);
  } catch (err) {
    console.error("Error: ", err.message);
  }
}

run();
