import { Moov, SCOPES } from "@moovio/node";
import { loadCredentials } from "./loadCredentials.js";

/**
 * Demonstrates how to generate OAuth tokens for use in Moov.js and Moov Drops.
 * If you're calling the Moov API directly with this SDK, then you don't need to
 * generate tokens--the SDK does it for you automatically.
 */
async function run() {
  // Load credentials and initialize the Moov client
  const credentials = loadCredentials("./secrets/credentials.json");
  const moov = new Moov(credentials);

  // Create a token with permissions to create a new connected account
  const createAccountToken = await moov.generateToken([SCOPES.ACCOUNTS_CREATE]);
  console.log("== create accounts ==\n", createAccountToken.token);

  // Create a token with permissions to update a connected account's profile
  const connectedAccountID = "..."; // Fill in with an actual account ID
  const profileToken = await moov.generateToken(
    [SCOPES.PROFILE_READ, SCOPES.PROFILE_WRITE],
    connectedAccountID
  );
  console.log("== update profile ==\n", profileToken.token);
}

run();
