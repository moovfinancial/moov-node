import { check } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";

/** @external Promise */

/**
 * Describes an individual who represents the business.
 * @typedef Representative
 * @property {string} representativeID - Representative identifier
 * @property {RepresentativeName} name - Name for an individual
 * @property {RepresentativePhone} phone - Phone for an individual
 * @property {string} email - Email Address.  string <email> <= 255 characters
 * @property {RepresentativeAddress} address - Address for an individual.
 * @property {boolean} birthDateProvided - Indicates whether this Representative's birth date has been provided
 * @property {boolean} governmentIDProvided - Indicates whether a government ID (SSN, ITIN, etc.) has been provided for this Representative
 * @property {RepresentativeResponsibilities} responsibilities - Describes the job responsibilities of an individual
 * @property {Date} createdOn - Date Representative was created
 * @property {Date} updatedOn - Date Representative was last updated
 * @property {Date} disabledOn - Optional date Representative was disabled
 * 
 * @example
 * {
  "representativeID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
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
  "birthDateProvided": false,
  "governmentIDProvided": false,
  "responsibilities": {
    "isController": false,
    "isOwner": true,
    "ownershipPercentage": 38,
    "jobTitle": "CEO"
  },
  "createdOn": "2019-08-24T14:15:22Z",
  "updatedOn": "2019-08-24T14:15:22Z",
  "disabledOn": "2019-08-24T14:15:22Z"
}
 * 
 * @tag Representatives
 */

/**
 * Representative name
 * @typedef RepresentativeName
 * @property {string} firstName - Name this person was given. This is usually the same as first name.  string <= 64 characters
 * @property {string} middleName - Name this person was given. This is usually the same as middle name.  string <= 64 characters
 * @property {string} lastName - Family name of this person. This is usually the same as last name.  string <= 64 characters
 * @property {string} suffix - Suffix of a given name.  string <= 20 characters
 * 
 * @tag Representatives
 */

/**
 * Representative phone
 * @typedef RepresentativePhone
 * @property {string} number - string <phone> <= 10 characters
 * @property {string} countryCode - string <= 1 characters
 * 
 * @tag Representatives
 */

/**
 * @typedef RepresentativeAddress
 * @property {string} addressLine1 - string <= 32 characters
 * @property {string} addressLine2 - string <= 32 characters
 * @property {string} city - string <= 24 characters
 * @property {string} stateOrProvince - string <= 2 characters
 * @property {string} postalCode - string <= 5 characters
 * @property {string} country - string <= 2 characters
 * 
 * @tag Representatives
 */

/**
 * @typedef RepresentativeResponsibilities
 * @property {boolean} isController - Indicates whether this individual has significant management responsibilities within the business
 * @property {boolean} isOwner - Indiciates whether this individual has an ownership stake of at least 25% in the business
 * @property {number} ownershipPercentage - The percentage of ownership this individual has in the business (required if `isOwner` is `true`)
 * @property {string} jobTitle - string <= 64 characters
 * 
 * @tag Representatives
 */

/**
 * @typedef RepresentativeCreateUpdate
 * @property {RepresentativeName} name - Name for an individual
 * @property {RepresentativePhone} phone - Phone for an individual
 * @property {string} email - Email Address.  string <email> <= 255 characters
 * @property {RepresentativeAddress} address - Address for an individual.
 * @property {boolean} birthDateProvided - Indicates whether this Representative's birth date has been provided
 * @property {boolean} governmentIDProvided - Indicates whether a government ID (SSN, ITIN, etc.) has been provided for this Representative
 * @property {RepresentativeResponsibilities} responsibilities - Describes the job responsibilities of an individual
 * 
 * @tag Representatives
 */

/**
 * The Representatives API
 * @tag Representatives
 */
 export class Representatives {
  constructor(moov) {
    this.moov = moov;
  }

  /**
   * Create representative
   * @param {string} accountID - Account on which to add representative
   * @param {RepresentativeCreateUpdate} representative - Representative to add
   * @returns {Promise<Representative>}
   * 
   * @tag Representatives
   */
   async create(accountID, representative) {
    checkString(accountID).or(Err.AccountID);
    check(representative).or(Err.MISSING_REPRESENTATIVE_ERROR_MESSAGE);

    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/representatives`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
        json: representative,
      })
      .json();

    return result;
  }

  /**
   * List representatives
   * @param {string} accountID - Account on which to add representative
   * @returns {Promise<Representative[]>}
   * 
   * @tag Representatives
   */
   async list(accountID) {
    checkString(accountID).or(Err.AccountID);

    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/representatives`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
      })
      .json();

    return result;
  }

  /**
   * Retrieve a specific representative associated with a given Moov account.
   * @param {string} accountID - Account on which to add representative
   * @param {string} representativeID - Identifier of representative to retrieve
   * @returns {Promise<Representative>}
   * 
   * @tag Representatives
   */
   async get(accountID, representativeID) {
    checkString(accountID).or(Err.AccountID);
    checkString(representativeID).or(Err.RepresentativeID);

    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/representatives/${representativeID}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
      })
      .json();

    return result;
  }

  /**
   * Deletes a business representative associated with a Moov account.
   * @param {string} accountID - Account on which to add representative
   * @param {string} representativeID - Identifier of representative to retrieve
   * @returns {Promise<void>}
   * 
   * @tag Representatives
   */
   async delete(accountID, representativeID) {
    checkString(accountID).or(Err.AccountID);
    checkString(representativeID).or(Err.RepresentativeID);

    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/representatives/${representativeID}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
      })
      .json();

    return result;
  }

  /**
   * Update a specific representative.
   * @param {string} accountID - Account on which to add representative
   * @param {string} representativeID - Identifier of representative to retrieve
   * @param {RepresentativeCreateUpdate} representative - Representative to add
   * @returns {Promise<Representative>}
   * 
   * @tag Representatives
   */
   async update(accountID, representativeID, representative) {
    checkString(accountID).or(Err.AccountID);
    checkString(representativeID).or(Err.RepresentativeID);
    check(representative).or(Err.MISSING_REPRESENTATIVE_ERROR_MESSAGE);

    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/representatives/${representativeID}`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
        json: representative,
      })
      .json();

    return result;
  }
}