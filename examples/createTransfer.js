import { Moov } from "@moovio/node";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

// TODO: Fill in account IDs from your dashboard
const SOURCE_ACCOUNT_ID = "";
const DESTINATION_ACCOUNT_ID = "";

const TRANSFER_AMOUNT = {
  value: 99, // $0.99
  currency: "USD",
};

/**
 * Demonstrates how to get available transfer options and then create a
 * transfer.
 */
async function run() {
  // Load credentials and initialize the Moov client
  const credentials = loadCredentials("./secrets/credentials.json");
  const moov = new Moov(credentials, gotOptionsForLogging);

  // Get available transfer options for the source account
  const { sourceOptions } = await moov.transfers.getTransferOptions({
    source: {
      accountID: SOURCE_ACCOUNT_ID,
    },
    amount: TRANSFER_AMOUNT,
  });

  try
  {
  // Select ACH
    const sourcePaymentMethodID = sourceOptions.find(
      (x) => x.paymentMethodType === "ach-debit-fund"
    ).paymentMethodID;

    // Get destination transfer options given the source transfer option
    const { destinationOptions } = await moov.transfers.getTransferOptions({
      source: {
        paymentMethodID: sourcePaymentMethodID,
      },
      destination: {
        accountID: DESTINATION_ACCOUNT_ID,
      },
      amount: TRANSFER_AMOUNT,
    });

    // Select ACH standard
    const destinationPaymentMethodID = destinationOptions.find(
      (x) => x.paymentMethodType === "ach-credit-standard"
    ).paymentMethodID;

    // Create the transfer
    const transfer = await moov.transfers.create({
      source: {
        paymentMethodID: sourcePaymentMethodID,
      },
      destination: {
        paymentMethodID: destinationPaymentMethodID,
      },
      amount: TRANSFER_AMOUNT,
    });
  }
  catch(err)
  {
    // catch an exception you plan to handle, if not allow it to bubble up
    console.error("Error: ", err.message);
  }
}

run();
