import { Moov } from "@moovio/node";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

// TODO: Enter an email to retreive.
const PROFILE_EMAIL = "employee@business.com";

/**
 * Demonstrate how to retrieve enriched profile data.
 */
async function run() {
  // Load credentials and initialize the Moov client
  const credentials = loadCredentials("./secrets/credentials.json");
  const moov = new Moov(credentials, gotOptionsForLogging);

  const profile = await moov.enrichedProfiles.get(PROFILE_EMAIL).catch((error) => {
    console.error("Error: ", error.message);
  });
}

run();