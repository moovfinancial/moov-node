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

  // Link bank account to facilitator
  let bankAccount = {
    "holderName": "Jules Jackson",
    "holderType": "individual",
    "bankAccountType": "checking",
    "routingNumber": "107005047",
    "accountNumber": "1234567890"
  }

  try
  {
    let linkResult = await moov.bankAccounts.link(credentials.accountID, bankAccount).catch((error) => {
      console.error("Promise Error: ", error.message);
    });

    // Get the bank account
    let result = await moov.bankAccounts.get(credentials.accountID, linkResult.bankAccountID)

    // Link bank account to connected account
    bankAccount = {
      "holderName": "Fred Flintstone",
      "holderType": "individual",
      "bankAccountType": "checking",
      "routingNumber": "107005047",
      "accountNumber": "123412340"
    }
    linkResult = await moov.bankAccounts.link(credentials.connectedAccountID, bankAccount);

    // Get the bank account
    result = await moov.bankAccounts.get(credentials.connectedAccountID, linkResult.bankAccountID)
    const fredBankAccountID = result.bankAccountID;

    // Add one more
    bankAccount = {
      "holderName": "Barney Rubble",
      "holderType": "individual",
      "bankAccountType": "checking",
      "routingNumber": "107005047",
      "accountNumber": "777777000"
    }
    linkResult = await moov.bankAccounts.link(credentials.connectedAccountID, bankAccount);

    // Get a list of the bank accounts
    result = await moov.bankAccounts.list(credentials.connectedAccountID);

    // Disable Barney's bank account
    await moov.bankAccounts.disable(credentials.connectedAccountID, linkResult.bankAccountID);

    // Get a list of the bank accounts
    result = await moov.bankAccounts.list(credentials.connectedAccountID);

    // Initiate micro deposits
    await moov.bankAccounts.initMicroDeposits(credentials.connectedAccountID, fredBankAccountID);

    // complete micro deposits
    await moov.bankAccounts.completeMicroDeposits(credentials.connectedAccountID, fredBankAccountID, [0, 0])
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