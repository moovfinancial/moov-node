import { Moov } from "@moovio/node";
import { gotOptionsForLogging } from "./gotOptionsForLogging.js";
import { loadCredentials } from "./loadCredentials.js";

/**
 * Demonstrate how to search for enriched addresses.
 */
 async function run() {
  // Load credentials and initialize the Moov client
  const credentials = loadCredentials("./secrets/credentials.json");
  const moov = new Moov(credentials, gotOptionsForLogging);

  const criteria = {
    "search": "123 Main St",
    "maxResults": "",
    "includeCities": "",
    "includeStates": "",
    "includeZipcodes": "60412;96818;97209",
    "excludeStates": "AZ;WA;SC",
    "preferCities": "denver;aurora;omaha",
    "preferStates": "CO;MN;WI",
    "preferZipcodes": "",
    "preferRatio": "",
    "preferGeolocation": "none",
    "selected": "Apt",
    "source": "postal"
  };

  const avatar = moov.enrichedAddresses.get(criteria);
}