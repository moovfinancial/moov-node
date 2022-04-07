import { Moov } from "@moovio/node";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

async function run() {
  const args = process.argv.slice(2);

  if (args.length < 2 || args.length % 2) {
    usage();
  }

  let credentials = {};
  if (args[0] === "-credentials") {
    credentials = loadCredentials("./secrets/credentials.json");
  } else {
    for (var index = 0; index < args.length; index += 2) {
      credentials[args[index].substring(1)] = args[index +1];
    }
  }

  if(!credentials["accountID"] 
    || !credentials["publicKey"] 
    || !credentials["secretKey"] 
    || !credentials["domain"] 
    || !credentials["connectedAccountID"]) {
    usage();
  }

  const moov = new Moov(credentials, gotOptionsForLogging);

  try
  {
    // Get a list of the payment methods
    let result = await moov.wallets.list(credentials.connectedAccountID);

    // Get a specific payment method
    result = await moov.wallets.get(credentials.connectedAccountID, result[0].walletID);
  }
  catch(err)
  {
    // catch an exception you plan to handle, if not allow it to bubble up
    console.error("Error: ", err.message);
  }
}

function usage() {
  console.log("Usage:");
  console.log("  Required:");
  console.log("    Either:");
  console.log("     -credentials {path to credentials file}");
  console.log("    Or:");
  console.log("     -accountID {facilitator account ID}");
  console.log("     -publicKey {public key}");
  console.log("     -secretKey {secret key}");
  console.log("     -domain {domain}");
  console.log("     -connectedAccountID {connected account ID}");
  process.exit(1);
}

run();