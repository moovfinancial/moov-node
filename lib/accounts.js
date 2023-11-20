import { check, checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";
import { Address } from "./address.js";

/** @external Promise */

/**
 * Describes a Moov account associated with an individual or a business.
 * @typedef Account
 * @property {string} accountID - Account identifier
 * @property {"individual"|"business"} accountType - Type of entity represented by this account
 * @property {string} displayName - Name of individual or business
 * @property {Profile} profile - Details for individual or business
 * @property {object} metadata - Arbitrary key-value pairs
 * @property {string} foreignID - Optional identification or alias
 * @property {AccountVerification} verification - Describes identity verification status and relevant identity verification documents
 * @property {CustomerSupport|null} customerSupport - Displayed on credit card transactions (business only)
 * @property {AccountSettings|null} settings - Account settings
 * @property {string} createdOn - Date account was created
 * @property {string} updatedOn - Date account was last updated
 * 
 * @example
 * {
  "accountType": "business",
  "profile": {
    "business": {
      "legalBusinessName": "Whole Body Fitness LLC",
      "doingBusinessAs": "Whole Body Fitness",
      "businessType": "llc",
      "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apt 302",
        "city": "Boulder",
        "stateOrProvince": "CO",
        "postalCode": "80301",
        "country": "US"
      },
      "phone": {
        "number": "8185551212",
        "countryCode": "1"
      },
      "email": "amanda@classbooker.dev",
      "website": "www.wholebodyfitnessgym.com",
      "description": "Local fitness center paying out instructors",
      "taxID": {
        "ein": {
          "number": "123-45-6789"
        }
      },
      "industryCodes": {
        "naics": "713940",
        "sic": "7991",
        "mcc": "7997"
      }
    }
  },
  "metadata": {
    "property1": "string",
    "property2": "string"
  },
  "termsOfService": {
    "token": "kgT1uxoMAk7QKuyJcmQE8nqW_HjpyuXBabiXPi6T83fUQoxsyWYPcYzuHQTqrt7YRp4gCwyDQvb6U5REM9Pgl2EloCe35t-eiMAbUWGo3Kerxme6aqNcKrP_6-v0MTXViOEJ96IBxPFTvMV7EROI2dq3u4e-x4BbGSCedAX-ViAQND6hcreCDXwrO6sHuzh5Xi2IzSqZHxaovnWEboaxuZKRJkA3dsFID6fzitMpm2qrOh4"
  },
  "foreignID": "4528aba-b9a1-11eb-8529-0242ac13003",
  "customerSupport": {
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
    "website": "www.wholebodyfitnessgym.com"
  },
  "settings": {
    "cardPayment": {
      "statementDescriptor": "Whole Body Fitness"
    }
  }
}
 * 
 * @tag Accounts
 */

/**
 * @typedef AccountCreate
 * @property {"individual"|"business"} accountType - Type of entity represented by this account
 * @property {Profile} profile - Details for individual or business
 * @property {object} metadata - Arbitrary key-value pairs
 * @property {TermsOfServiceToken|null} termsOfService - An encrypted value used to record acceptance of Moov's Terms of Service
 * @property {string} foreignID - Optional identification or alias
 * @property {CustomerSupport|null} customerSupport - Displayed on credit card transactions (business only)
 * @property {AccountSettings|null} settings - Account settings
 * 
 * @example
 * {
  "mode": "production",
  "accountType": "business",
  "profile": {
    "individual": {
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
      }
    },
    "business": {
      "legalBusinessName": "Whole Body Fitness LLC",
      "doingBusinessAs": "Whole Body Fitness",
      "businessType": "llc",
      "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apt 302",
        "city": "Boulder",
        "stateOrProvince": "CO",
        "postalCode": "80301",
        "country": "US"
      },
      "phone": {
        "number": "8185551212",
        "countryCode": "1"
      },
      "email": "amanda@classbooker.dev",
      "website": "www.wholebodyfitnessgym.com",
      "description": "Local fitness center paying out instructors",
      "taxID": {
        "ein": {
          "number": "123-45-6789"
        }
      },
      "industryCodes": {
        "naics": "713940",
        "sic": "7991",
        "mcc": "7997"
      }
    }
  },
  "metadata": {
    "property1": "string",
    "property2": "string"
  },
  "termsOfService": {
    "token": "kgT1uxoMAk7QKuyJcmQE8nqW_HjpyuXBabiXPi6T83fUQoxsyWYPcYzuHQTqrt7YRp4gCwyDQvb6U5REM9Pgl2EloCe35t-eiMAbUWGo3Kerxme6aqNcKrP_6-v0MTXViOEJ96IBxPFTvMV7EROI2dq3u4e-x4BbGSCedAX-ViAQND6hcreCDXwrO6sHuzh5Xi2IzSqZHxaovnWEboaxuZKRJkA3dsFID6fzitMpm2qrOh4"
  },
  "foreignID": "4528aba-b9a1-11eb-8529-0242ac13003",
  "customerSupport": {
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
    "website": "www.wholebodyfitnessgym.com"
  },
  "settings": {
    "cardPayment": {
      "statementDescriptor": "Whole Body Fitness"
    }
  }
}
 * @tag Accounts
 */

/**
 * A token that can then be used to accept Moov's Terms of Service. Must be generated from a web browser. See the [Moovjs](/moovjs/accounts/accounts/#platform-terms-of-service-agreement) documentation for more details.
 * @typedef TermsOfServiceToken
 * @property {string} token - An encrypted value used to record acceptance of Moov's Terms of Service
 * @tag Accounts
 */

/**
 * A person's name.
 * @typedef Name
 * @property {string} firstName - A person's first name
 * @property {string} middleName - A person's middle name
 * @property {string} lastName - A person's last name
 * @property {string} suffix - A person's suffix
 * @tag Accounts
 */

/**
 * Profile for a Moov acocunt. May be business or individual.
 * @typedef Profile
 * @property {BusinessProfile} [business] - A business account
 * @property {IndividualProfile} [individual] - An individual account
 * @tag Accounts
 */

/**
 * Describes a business account.
 * @typedef BusinessProfile
 * @property {string} legalBusinessName - Business's legal name
 * @property {string} doingBusinessAs - Business's trade name (if different than the legal name)
 * @property {"soleProprietorship"|"unincorporatedAssociation"|"trust"|"publicCorporation"|"privateCorporation"|"privateCorporation"|"llc"|"partnership"|"unincorporatedNonProfit"|"incorporatedNonProfit"} businessType - The legal registered type of the business
 * @property {Address} address - Business's address
 * @property {Phone} phone - Business's phone number
 * @property {string} email - Business's email
 * @property {string} website - Business's website
 * @property {string} description - Description of the business
 * @property {boolean} taxIDProvided - `true` if business's tax ID has been provided
 * @property {Representative[]} representatives
 * @property {boolean} ownersProvided - `true` if business owner(s) have been provided
 * @property {IndustryCodes} industryCodes - Business's industry code (for example, `mcc`)
 * @tag Accounts
 */

/**
 * Describes the individual associated with a non-business account.
 * @typedef IndividualProfile
 * @property {Name} name - Individual's name
 * @property {Phone} phone - Individual's phone number
 * @property {string} email - Individual's email address
 * @property {Address} address - Individual's address
 * @property {boolean} birthDateProvided - `true` if individual's birth date has been provided
 * @property {boolean} governmentIDProvided - `true` if individual's government-issued ID has been provided
 * @tag Accounts
 */

/**
 * @typedef Phone
 * @property {string} number - Phone number
 * @property {string} [countryCode] - 1 digit country code
 * @tag Accounts
 */

/**
 * Standard industry codes for businesses.
 * @typedef IndustryCodes
 * @property {string} naics - North American Industry Classification System
 * @property {string} sic - Standard Industry Classification
 * @property {string} mcc - Merchant Category Codes
 * @tag Accounts
 */

/**
 * Describes an individual who represents a business account.
 * @typedef Representative
 * @property {Name} name - Representative's first and last name
 * @property {Phone} phone - Representative's phone number
 * @property {string} email - Representative's email address
 * @property {Address} address - Representative's address
 * @property {boolean} birthDateProvided - `true` if individual's birth date has been provided
 * @property {boolean} governmentIDProvided - `true` if individual's government-issued ID has been provided
 * @property {Responsibility[]} responsibilities
 * @property {string} createdOn - Date representative was recorded
 * @property {string} updatedOn - Date representative was last updated
 * @property {string} disabledOn - Date representative was removed from business
 * @tag Accounts
 */

/**
 * Describes the responsibilities associated with a business representative.
 * @typedef Responsibility
 * @property {boolean} isController - `true` if representative  has significant management responsibilities
 * @property {boolean} isOwner - `true` if representative owns ≥25% of the business
 * @property {number} ownershipPercentage - % of business representative owns (required if `isOwner` is `true`)
 * @property {string} jobTitle - Job title of representative (for example, CEO)
 * @tag Accounts
 */

/**
 * Describes the verification state of an account
 * @typedef AccountVerification
 * @property {"unverified"|"pending"|"resubmit"|"review"|"verified"|"failed"} verificationStatus - The status of an identity verification for a profile
 * @tag Accounts
 */

/**
 * Describes customer support contact information for a business account.
 * @typedef CustomerSupport
 * @property {Phone} phone - Customer support phone number
 * @property {string} email - Customer support email
 * @property {Address} address - Customer support address
 * @property {string} website - Customer support website
 * @tag Accounts
 */

/**
 * @typedef AccountSettings
 * @property {CardPaymentSettings} cardPayment - Card payment settings (business only)
 * @tag Accounts
 */

/**
 * @typedef CardPaymentSettings
 * @property {string} statementDescriptor - Description to display on credit card transactions
 * @tag Accounts
 */

/**
 * @typedef Countries
 * @property {string[]} countries - Countries of operation for an account
 * @tag Accounts
 */

/**
 * @typedef AccountListCriteria
 * @property {Name} name - If provided, this query will attempt to find matches (including partial) against the following Account and Profile fields: Account `displayName`, Individual Profile `firstName`, `middleName`, `lastName`, and `suffix`, and Business Profile `legalBusinessName`, and `doingBusinessAs`
 * @property {string} email - Filter connected accounts by email address. It is not necessary to provided the full email address as partial matches will also be returned.
 * @property {"individual"|"business"} type - Filter connected accounts by AccountType. If the `type` parameter is used in combination with name, only the corresponding type's `name` fields will be searched. For example, if `type=business` and `name=moov`, the search will attempt to find matches against the display name and Business Profile name fields (`legalBusinessName`, and `doingBusinessAs`).
 * @property {string} foreignID - Serves as an optional alias from a foreign/external system which can be used to reference this resource
 * @property {number} count - Optional parameter to limit the number of results in the query
 * @property {number} skip - The number of items to offset before starting to collect the result set
 * @tag Accounts
 */

/**
 * The Accounts API.
 * @tag Accounts
 */
export class Accounts {
  constructor(moov) {
    this.moov = moov;
  }

  /**
   * Create a new connected account.
   * The `ACCOUNTS_CREATE` scope enum is required when making a request from the browser.
   *
   * @param {AccountCreate} account - New account details
   * @returns {Promise<Account>}
   * @tag Accounts
   */
  async create(account) {
    const result = await this.moov
      .got({
        url: `accounts`,
        method: "POST",
        json: account,
      })
      .json();

    return result;
  }

  /**
   * Retrieves details for the list of accounts.
   * The `ACCOUNTS_READ` scope enum is required when making a request from the browser.
   * 
   * @param {string} accountID - Account to query
   * @param {AccountListCriteria} criteria - Optional criteria to limit the list returned.
   * @returns {Promise<Account[]>}
   * @tag Accounts
   */
  async list(accountID, criteria) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    let params = "";

    if (criteria) {
      params = "?";
      for (const [key, value] of Object.entries(criteria)) {
        params += key + "=" + value + "&";
      }
    }

    params = params.substring(0, params.length - 1);

    const result = await this.moov
      .got({
        url: `accounts${params}`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * Retrieves details for the account with the specified ID.
   * The `PROFILE_READ` scope enum is required when making a request from the browser.
   *
   * @param {string} connectedAccountID - User account to query
   * @returns {Promise<Account>}
   * @tag Accounts
   */
  async get(connectedAccountID) {
    checkString(connectedAccountID).or(Err.MISSING_ACCOUNT_ID);
    const result = await this.moov
      .got({
        url: `accounts/${connectedAccountID}`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * Updates an existing account. Requires a complete Account object.
   * The `PROFILE_WRITE` scope enum is required when making a request from the browser.
   *
   * @param {Account} account - Account to update
   * @returns {Promise<Account>}
   * @tag Accounts
   * @deprecated update call for accounts is deprecated, please use the patch call.
   */
  async update(account) {
    await this.patch(account);
    throw new Error(
      "update call for accounts is deprecated, please use the patch call."
    );
  }

  /**
   * Updates an existing account. Does not require a complete Account object,
   * but the `accountID` property is required.
   * The `PROFILE_WRITE` scope enum is required when making a request from the browser.
   *
   * @param {Account} account - Account to update
   * @returns {Promise<Account>}
   * @tag Accounts
   */
  async patch(account) {
    checkString(account.accountID).or(Err.MISSING_ACCOUNT_ID);

    const patchAccount = { ...account };

    delete patchAccount.accountID;

    const result = await this.moov
      .got({
        url: `accounts/${account.accountID}`,
        method: "PATCH",
        json: patchAccount,
      })
      .json();

    return result;
  }

  /**
   * Retrieve the specified countries of operation for an account.
   * The `PROFILE_READ` scope enum is required when making a request from the browser.
   *
   * @param {string} accountID - Account to query
   * @returns {Promise<Countries>}
   * @tag Accounts
   */
  async getCountries(accountID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/countries`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * Assign the countries of operation for an account. This endpoint will always overwrite the previously assigned values.
   * The `PROFILE_WRITE` scope enum is required when making a request from the browser.
   *
   * @param {string} accountID - Account to query
   * @param {Countries} countries - Countries to add to the account
   * @returns {Promise<Countries>}
   * @tag Accounts
   */
  async assignCountries(accountID, countries) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    check(countries).or(Err.MISSING_COUNTRIES);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/countries`,
        method: "PUT",
        json: countries,
      })
      .json();

    return result;
  }
}
