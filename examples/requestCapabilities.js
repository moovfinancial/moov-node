import { Moov, CAPABILITIES } from "@moovio/node";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

/**
 * Demonstrates how to request, list, and disable capabilities.
 */
async function run() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    usage();
  }

  let credentials = {};
  if (args[0] === "-credentials") {
    credentials = loadCredentials("./secrets/credentials.json");
  } else {
    for (var index = 0; index < args.length; index += 2) {
      credentials[args[index].substring(1)] = args[index + 1];
    }
  }

  if (
    !credentials["accountID"] ||
    !credentials["publicKey"] ||
    !credentials["secretKey"] ||
    !credentials["domain"]
  ) {
    usage();
  }

  /**
   * Example credentials:
   * {
        "accountID": "36ba5283-2d4a-4002-95da-1004c307f888",
        "publicKey": "gB_CANsWvMZ1FtuD",
        "secretKey": "Y9gmf9fS-weRmIdMvtiqnardhsnrFMWM",
        "domain": "http://local.moov.io"
      }
   */
  const moov = new Moov(credentials, gotOptionsForLogging);

  let accountID;
  if (credentials["connectedAccountID"]) {
    accountID = credentials["connectedAccountID"];
  } else {
    accountID = credentials["accountID"];
  }

  try {
    // Request capabilities
    const capabilities = await moov.capabilities.requestCapabilities(accountID, [
      CAPABILITIES.TRANSFERS,
      CAPABILITIES.SEND_FUNDS,
      CAPABILITIES.WALLET,
    ]);

    // Get back a particular capability
    let sendFunds = await moov.capabilities.get(
      accountID,
      CAPABILITIES.SEND_FUNDS
    );

    // List all capabilities for the account
    let list = await moov.capabilities.list(accountID);

    // Disable a capability
    const disableSendFunds = await moov.capabilities.disable(
      accountID,
      CAPABILITIES.SEND_FUNDS
    );

    list = await moov.capabilities.list(accountID);
  } catch (err) {
    // catch an exception you plan to handle, if not allow it to bubble up
    console.error("Error: ", err.message);
  }
}

function usage() {
  console.log("Usage:");
  console.log("  Required:");
  console.log("   -accountID {facilitator account ID}");
  console.log("   -publicKey {public key}");
  console.log("   -secretKey {secret key}");
  console.log("   -domain {domain}");
  console.log("  Optional:");
  console.log("   -connectedAccountID {connected account ID}");
  process.exit(1);
}

run();
