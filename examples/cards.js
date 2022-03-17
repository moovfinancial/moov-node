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

  // Get lsit of all cards for connected account.
  const results = await moov.cards.list(credentials.connectedAccountID);
  console.log(results);

  // Get a specific card.
  const result = await moov.cards.get(credentials.connectedAccountID, results[0].cardID);

  // Disable a specific card.
  await moov.cards.disable(credentials.connectedAccountID, results[0].cardID);
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