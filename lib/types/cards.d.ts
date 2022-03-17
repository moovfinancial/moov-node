export type CARD_BRAND = any;
export namespace CARD_BRAND {
    const AMEX: string;
    const DISCOVER: string;
    const MC: string;
    const VISA: string;
}
export type CARD_TYPE = any;
export namespace CARD_TYPE {
    const DEBIT: string;
    const CREDIT: string;
    const PREPAID: string;
    const UNKNOWN: string;
}
export type CARD_VERIFICATION_STATUS = any;
export namespace CARD_VERIFICATION_STATUS {
    const NO_MATCH: string;
    const MATCH: string;
    const NOT_CHECKED: string;
    const UNAVAILABLE: string;
}
/**
 * Card account expiration date
 * @typedef CardExpiration
 * @property {string} month - 2 character month
 * @property {string} year - 2 character year
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
 *
 * @example
 * {
  "cardID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "fingerprint": "9948962d92a1ce40c9f918cd9ece3a22bde62fb325a2f1fe2e833969de672ba3",
  "brand": "American Express",
  "cardType": "debit",
  "lastFourCardNumber": "1234",
  "bin": "123456",
  "expiration": {
    "month": "01",
    "year": "21"
  },
  "holderName": "Jules Jackson",
  "billingAddress": {
    "addressLine1": "123 Main Street",
    "addressLine2": "Apt 302",
    "city": "Boulder",
    "stateOrProvince": "CO",
    "postalCode": "80301",
    "country": "US"
  },
  "cardVerification": {
    "cvv": "match",
    "addressLine1": "match",
    "postalCode": "match"
  },
  "issuer": "GRINGOTTS BANK",
  "issuerCountry": "US"
}
 *
 * @tag Cards
 */
/**
 * The Cards API.
 * @tag Cards
 */
export class Cards {
    constructor(moov: any);
    moov: any;
    /**
     * Retrieves details for the card with the specified ID.
     *
     * @param {string} accountID - Account to query
     * @param {string} cardID - Card to query
     * @returns {Promise<Card>}
     * @tag Cards
     */
    get(accountID: string, cardID: string): Promise<Card>;
    /**
     * Lists all the cards associated with a particular Moov account.
     *
     * @param {string} accountID - Account to query
     * @returns {Promise<Card[]>}
     * @tag Cards
     */
    list(accountID: string): Promise<Card[]>;
    /**
     * Disables a card with the specified ID.
     *
     * @param {string} accountID - Account to query
     * @param {string} cardID - Card to query
     * @returns {Promise<void>}
     * @tag Cards
     */
    disable(accountID: string, cardID: string): Promise<void>;
}
/**
 * Card account expiration date
 */
export type CardExpiration = {
    /**
     * - 2 character month
     */
    month: string;
    /**
     * - 2 character year
     */
    year: string;
};
/**
 * Card billing address
 */
export type CardBillingAddress = {
    /**
     * - string <= 32 characters
     */
    addressLine1: string;
    /**
     * - string <= 32 characters
     */
    addressLine2: string;
    /**
     * - string <= 24 characters
     */
    city: string;
    /**
     * - string <= 2 characters
     */
    stateOrProvince: string;
    /**
     * - string <= 5 characters
     */
    postalCode: string;
    /**
     * - string <= 2 characters
     */
    country: string;
};
/**
 * Card verification statuses
 */
export type CardVerficationStatuses = {
    /**
     * - Verification status of the CVV
     */
    cvv: any;
    /**
     * - Verification status of addressLine1
     */
    addressLine1: any;
    /**
     * - Verification status of the postalCode
     */
    postalCode: any;
};
/**
 * Describes a Card account.
 */
export type Card = {
    /**
     * - Card account identifier
     */
    cardID: string;
    /**
     * - string <= 100 characters that is a unique fingerprint of a card
     */
    fingerprint: string;
    /**
     * - The card brand
     */
    brand: any;
    /**
     * - The type of the card
     */
    cardType: any;
    /**
     * - Last four digits of the card
     */
    lastFourCardNumber: string;
    /**
     * - The BIN number of the card
     */
    bin: string;
    /**
     * - The expiration info of the card
     */
    expiration: CardExpiration;
    /**
     * - The name of the card holder
     */
    holderName: string;
    /**
     * - The billing address of the card
     */
    billingAddress: CardBillingAddress;
    /**
     * - The results of submitting cardholder data to a card network for verification
     */
    cardVerfication: CardVerficationStatuses;
    /**
     * - The name of the issuer
     */
    issuer: string;
    /**
     * - The country of the issuer
     */
    issuerCountry: string;
};
//# sourceMappingURL=cards.d.ts.map