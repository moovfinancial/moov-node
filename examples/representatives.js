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

  // Get a list of the representatives
  let result = await moov.representatives.list(credentials.connectedAccountID);

  const newRep1 = {
    "name": {
      "firstName": "Amanda",
      "middleName": "Amanda",
      "lastName": "Yang",
      "suffix": "Jr"
    },
    "phone": {
      "number": "8185551212",
      "countryCode": "1"
    },
    "email": "amanda@classbooker.dev",
    "address": {
      "addressLine1": "123 Main Street",
      "addressLine2": "Apt 302",
      "city": "Boulder",
      "stateOrProvince": "CO",
      "postalCode": "80301",
      "country": "US"
    },
    "birthDate": {
      "day": 9,
      "month": 11,
      "year": 1989
    },
    "governmentID": {
      "ssn": {
        "full": "123-45-6789",
        "lastFour": "6789"
      },
      "itin": {
        "full": "123-45-6789",
        "lastFour": "6789"
      }
    },
    "responsibilities": {
      "isController": false,
      "isOwner": true,
      "ownershipPercentage": 38,
      "jobTitle": "CEO"
    }
  }

  // Create a new representative
  result = await moov.representatives.create(credentials.connectedAccountID, newRep1);

  const newRep2 = {
    "name": {
        "firstName": "Steve",
        "middleName": "J.",
        "lastName": "Bartowski",
        "suffix": "Jr"
    },
    "phone": {
        "number": "818.555.1212",
        "countryCode": "1"
    },
    "email": "amanda@classbooker.dev",
    "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apt 302",
        "city": "Boulder",
        "stateOrProvince": "CO",
        "postalCode": "80301",
        "country": "US"
    },
    "birthDate": {
        "day": 9,
        "month": 11,
        "year": 1989
    },
    "governmentID": {
        "ssn": {
            "full": "123-45-6789",
            "lastFour": "6789"
        },
        "itin": {
            "full": "123-45-6789",
            "lastFour": "6789"
        }
    },
    "responsibilities": {
        "isController": false,
        "isOwner": true,
        "ownershipPercentage": 25,
        "jobTitle": "CTO"
    }
  }

  // Create a second new representative
  result = await moov.representatives.create(credentials.connectedAccountID, newRep2);

  // Get list of the representatives, again
  result = await moov.representatives.list(credentials.connectedAccountID);

  let updateRep = result[0];

  // Get a specific representative
  result = await moov.representatives.get(credentials.connectedAccountID, updateRep.representativeID);

  updateRep.email = "steve@classbooker.dev";

  // Update a specific representative
  result = await moov.representatives.update(credentials.connectedAccountID, updateRep.representativeID, updateRep);

  // Get list of the representatives, again
  result = await moov.representatives.list(credentials.connectedAccountID);

  // Delete a specific representative
  result = await moov.representatives.delete(credentials.connectedAccountID, updateRep.representativeID);

  // Get list of the representatives, again
  result = await moov.representatives.list(credentials.connectedAccountID);
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