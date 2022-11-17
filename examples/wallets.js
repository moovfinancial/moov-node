import {
  Moov,
  WALLET_TRANSACTION_TYPE,
  WALLET_TRANSACTION_STATUS,
} from "@moovio/node";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

/**
 * Demonstrate how to list and examine wallet transactions.
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
    !credentials["domain"] ||
    !credentials["connectedAccountID"]
  ) {
    usage();
  }

  const moov = new Moov(credentials, gotOptionsForLogging);

  try {
    // Get a list of wallets for this account
    const wallets = await moov.wallets.list(credentials.connectedAccountID);

    // Get a specific wallet
    const wallet = await moov.wallets.get(
      credentials.connectedAccountID,
      wallets[0].walletID
    );

    console.log(
      `Wallet ${wallet.walletID} has a balance of ${
        wallet.availableBalance.value / 100
      } ${wallet.availableBalance.currency}`
    );

    // Get a list of wallet transactions, no criteria
    const transactions = await moov.wallets.listTransactions(
      credentials.connectedAccountID,
      wallets[0].walletID
    );

    // Get a list of pending "top-up" wallet transactions
    const topUpTransactions = await moov.wallets.listTransactions(
      credentials.connectedAccountID,
      wallets[0].walletID,
      {
        status: WALLET_TRANSACTION_STATUS.PENDING,
        transactionType: WALLET_TRANSACTION_TYPE.TOP_UP,
      }
    );
  } catch (err) {
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
