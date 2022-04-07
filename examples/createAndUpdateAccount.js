import { Moov } from "@moovio/node";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

/**
 * Demonstrates how to create and update a connected account.
 */
async function run() {
  // Load credentials and initialize the Moov client
  const credentials = loadCredentials("./secrets/credentials.json");
  const moov = new Moov(credentials, gotOptionsForLogging);

  try
  {
    // Create a new account
    const account = await moov.accounts.create({
      accountType: "business",
      displayName: "Test Business (from Node SDK)",
      profile: {
        business: {
          businessType: "llc",
          legalBusinessName: "TestCo LLC",
          website: "https://testco.com",
        },
      },
    });

    // Allow the system to catch up
    await sleep(500);

    // Read back the account
    await moov.accounts.get(account.accountID)

    // Update - requires a complete account object
    account.profile.business.phone = { number: "555-555-5555" };
    const updatedAccount = await moov.accounts.update(account);

    // Patch - does not require a complete account object
    const patchedAccount = await moov.accounts.patch({
      accountID: account.accountID,
      profile: {
        business: {
          website: "https://testco.xyz",
        },
      },
    });

    // Read back the account, again
    await moov.accounts.get(account.accountID);

    // Get the countries
    await moov.accounts.getCountries(account.accountID);

    const countries = {
      countries: ["United States", "Canada"]
    };

    // Assign the countries
    await moov.accounts.assignCountries(account.accountID, countries);

    // Get the countries
    await moov.accounts.getCountries(account.accountID);

    // Create a second new account
    await moov.accounts.create({
      accountType: "business",
      displayName: "Test Business 2 (from Node SDK)",
      profile: {
        business: {
          businessType: "llc",
          legalBusinessName: "Testing LLC",
          website: "https://testing.com",
        },
      },
    });

    // Allow the system to catch up
    await sleep(500);

    // Get the list of accounts.
    await moov.accounts.list(credentials.accountID);

    // Get the list of accounts, with a filter criteria.
    await moov.accounts.list(credentials.accountID, {name: "Testing"});
  }
  catch(err)
  {
    // catch an exception you plan to handle, if not allow it to bubble up
    console.error("Error: ", err.message);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

run();
