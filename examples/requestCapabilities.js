import { Moov } from "../lib/moov.js";
import { CAPABILITIES } from "../lib/capabilities.js";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

/**
 * Demonstrates how to request, list, and disable capabilities.
 */
 async function run() {
  // Load credentials and initialize the Moov client
  const credentials = loadCredentials("./secrets/credentials.json");
  const moov = new Moov(credentials, gotOptionsForLogging);

  // Request capabilities
  const capabilites = await moov.capabilities.requestCapabilities(
    credentials.accountID, 
    [CAPABILITIES.TRANSFERS, CAPABILITIES.SEND_FUNDS, CAPABILITIES.WALLET]
    );

  // Get back a particular capability
  let sendFunds = await moov.capabilities.get(credentials.accountID, CAPABILITIES.SEND_FUNDS);

  // List all capabilities for the account
  const list = await moov.capabilities.list(credentials.accountID);

  // Disable a capability
  const disableSendFunds = await moov.capabilities.disable(credentials.accountID, CAPABILITIES.SEND_FUNDS);

  sendFunds = await moov.capabilities.get(credentials.accountID, CAPABILITIES.SEND_FUNDS);
 }

 run();
