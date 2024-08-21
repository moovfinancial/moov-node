import { check, checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";

/** @typedef {import('./paymentMethods.js').PaymentMethod} PaymentMethod */

/** @external Promise */

/**
 * @enum
 * @tag Cards
 */
export const CARD_BRAND = {
  /**
   * American Express
   * @tag Cards
   */
  AMEX: "American Express",
  /**
   * Discover
   * @tag Cards
   */
  DISCOVER: "Discover",
  /**
   * MasterCard
   * @tag Cards
   */
  MC: "MasterCard",
  /**
   * Visa
   * @tag Cards
   */
  VISA: "Visa",
};

/**
 * @enum
 * @tag Cards
 */
export const CARD_TYPE = {
  /**
   * Debit card
   * @tag Cards
   */
  DEBIT: "debit",
  /**
   * Credit card
   * @tag Cards
   */
  CREDIT: "credit",
  /**
   * Prepaid card
   * @tag Cards
   */
  PREPAID: "prepaid",
  /**
   * Unknown type
   * @tag Cards
   */
  UNKNOWN: "unknown",
};

/**
 * @enum
 * @tag Cards
 */
export const CARD_VERIFICATION_STATUS = {
  /**
   * No Match
   * @tag Cards
   */
  NO_MATCH: "noMatch",
  /**
   * Match
   * @tag Cards
   */
  MATCH: "match",
  /**
   * Not Checked
   * @tag Cards
   */
  NOT_CHECKED: "notChecked",
  /**
   * Unavailable
   * @tag Cards
   */
  UNAVAILABLE: "unavailable",
};

/**
 * Card account expiration date
 * @typedef CardExpiration
 * @property {string} month - 2 character month
 * @property {string} year - 2 character year
 *
 * @tag Cards
 */

 /** @template T
  *  @template K {extends keyof T}
  *  @typedef {Pick<Partial<T>, K> & Omit<T, K>} Optional
  */

/**
 * Card information collected for acquisition.
 * @typedef LinkCard
 * @property {string} cardNumber - All digits of the card
 * @property {CardExpiration} expiration - Card expiration date
 * @property {string} cardCvv - 3-4 digit card verification value
 * @property {string} holderName - Full name of the card holder
 * @property {Optional<CardBillingAddress, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'country'>} billingAddress - The billing address of the card
 * @property {boolean} [ cardOnFile = false ] - Indicates cardholder has authorized card to be stored for future payments. Only cards marked as card-on-file are eligible for automatic updates via card account updater
 *
 * @tag Cards
 */

/**
 * Card information that can be updated.
 * @typedef UpdateCard
 * @property {CardExpiration} expiration - Card expiration date
 * @property {string} cardCvv - 3-4 digit card verification value
 * @property {Optional<CardBillingAddress, 'addressLine1' | 'addressLine2' | 'city' | 'stateOrProvince' | 'country'>} billingAddress - The billing address of the card
*
 * @tag Cards
 */

/**
 * Card billing address
 * @typedef CardBillingAddress
 * @property {string} addressLine1 - string <= 32 characters
 * @property {string} addressLine2 - string <= 32 characters
 * @property {string} city - string <= 24 characters
 * @property {string} stateOrProvince - string <= 2 characters
 * @property {string} postalCode - string <= 5 characters
 * @property {string} country - string <= 2 characters
 *
 * @tag Cards
 */

/**
 * Card verification statuses
 * @typedef CardVerficationStatuses
 * @property {CARD_VERIFICATION_STATUS} cvv - Verification status of the CVV
 * @property {CARD_VERIFICATION_STATUS} addressLine1 - Verification status of addressLine1
 * @property {CARD_VERIFICATION_STATUS} postalCode - Verification status of the postalCode
 *
 * @tag Cards
 */

/**
 * Describes a Card account.
 * @typedef Card
 * @property {string} cardID - Card account identifier
 * @property {string} fingerprint - string <= 100 characters that is a unique fingerprint of a card
 * @property {CARD_BRAND} brand - The card brand
 * @property {CARD_TYPE} cardType - The type of the card
 * @property {string} lastFourCardNumber - Last four digits of the card
 * @property {string} bin - The BIN number of the card
 * @property {CardExpiration} expiration - The expiration info of the card
 * @property {string} holderName - The name of the card holder
 * @property {CardBillingAddress} billingAddress - The billing address of the card
 * @property {CardVerficationStatuses} cardVerfication - The results of submitting cardholder data to a card network for verification
 * @property {string} issuer - The name of the issuer
 * @property {string} issuerCountry - The country of the issuer
 * @property {string} merchantAccountID
 * @property {PaymentMethod[]} [paymentMethods]
 *
 * @example
 * {
 "billingAddress": {
   "addressLine1": "123 Main Street",
   "addressLine2": "Apt 302",
   "city": "Boulder",
   "country": "US",
   "postalCode": "80301",
   "stateOrProvince": "CO"
 },
 "bin": "123456",
 "brand": "Discover",
 "cardAccountUpdater": {
   "updateType": "number-update",
   "updatedOn": "2019-08-24T14:15:22Z"
 },
 "cardID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
 "cardOnFile": true,
 "cardType": "debit",
 "cardVerification": {
   "addressLine1": "match",
   "cvv": "match",
   "postalCode": "match"
 },
 "domesticPushToCard": "fast-funds",
 "expiration": {
   "month": "01",
   "year": "21"
 },
 "fingerprint": "9948962d92a1ce40c9f918cd9ece3a22bde62fb325a2f1fe2e833969de672ba3",
 "holderName": "Jules Jackson",
 "issuer": "GRINGOTTS BANK",
 "issuerCountry": "US",
 "lastFourCardNumber": "1234",
 "merchantAccountID": "50469144-f859-46dc-bdbd-9587c2fa7b42",
 "paymentMethods": [
   {
     "paymentMethodID": "9506dbf6-4208-44c3-ad8a-e4431660e1f2",
     "paymentMethodType": "card-payment"
   },
   {
     "paymentMethodID": "3f9969cf-a1f3-4d83-8ddc-229a506651cf",
     "paymentMethodType": "push-to-card"
   }
 ]
}
 *
 * @tag Cards
 */

/**
 * The Cards API.
 * @tag Cards
 */
export class Cards {
  constructor(moov) {
    this.moov = moov;
  }

  /**
   * Retrieves details for the card with the specified ID.
   * The `CARDS_READ` scope enum is required when making a request from the browser.
   *
   * @param {string} accountID - Account to query
   * @param {string} cardID - Card to query
   * @returns {Promise<Card>}
   * @tag Cards
   */
  async get(accountID, cardID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(cardID).or(Err.MISSING_CARD_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/cards/${cardID}`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * Lists all the cards associated with a particular Moov account.
   * The `CARDS_READ` scope enum is required when making a request from the browser.
   *
   * @param {string} accountID - Account to query
   * @returns {Promise<Card[]>}
   * @tag Cards
   */
  async list(accountID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/cards`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * Links a card to a Moov account. Only use this endpoint if you have provided Moov with a
   * copy of your PCI attestation of compliance.
   * The `CARDS_WRITE` scope enum is required when making a request from the browser.
   *
   * @param {string} accountID - Account to link
   * @param {LinkCard} card - Card information
   * @param {boolean} [waitForPaymentMethods = false] whether to wait for payment methods to be created and included in response
   * @returns {Promise<Card>}
   * @tag Cards
   */
  async link(accountID, card, waitForPaymentMethods = false) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    check(card).or(Err.MISSING_CARD);

    const headers = {};
    if (waitForPaymentMethods) headers['X-Wait-For'] = 'payment-method'

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/cards`,
        headers,
        method: "POST",
        json: card,
      })
      .json();

    return result;
  }

  /**
   * Updates a card in a Moov account. Only use this endpoint if you have provided Moov with a
   * copy of your PCI attestation of compliance.
   * The `CARDS_WRITE` scope enum is required when making a request from the browser.
   *
   * @param {string} accountID - Account linked to card
   * @param {string} cardID - Card to update
   * @param {UpdateCard} cardUpdates - Card information
   * @returns {Promise<Card>}
   * @tag Cards
   */
    async update(accountID, cardID, cardUpdates) {
      checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
      checkString(cardID).or(Err.MISSING_CARD_ID);
      check(cardUpdates).or(Err.MISSING_CARD);
  
      const result = await this.moov
        .got({
          url: `accounts/${accountID}/cards/${cardID}`,
          method: "PATCH",
          json: cardUpdates,
        })
        .json();
  
      return result;
    }

  /**
   * Disables a card with the specified ID.
   * The `CARDS_WRITE` scope enum is required when making a request from the browser.
   *
  * @param {string} accountID - Account to query
   * @param {string} cardID - Card to query
   * @returns {Promise<void>}
   * @tag Cards
   */
  async disable(accountID, cardID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(cardID).or(Err.MISSING_CARD_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/cards/${cardID}`,
        method: "DELETE",
      })
      .json();

    return result;
  }
}
