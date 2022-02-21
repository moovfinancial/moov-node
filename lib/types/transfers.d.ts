/**
 * High-level account information associated with a payment method.
 * @typedef PaymentMethodAccount
 * @property {string} accountID
 * @property {string} email
 * @property {string} displayName
 * @tag Transfers
 */
/**
 * @typedef BankAccount
 * @property {string} bankAccountID
 * @property {string} fingerprint
 * @property {"new"|"verified"|"verificationFailed"|"pending"|"errored"} status
 * @property {string} holderName
 * @property {"individual"|"business"} holderType
 * @property {string} bankName
 * @property {"checking"|"savings"|"unknown"} bankAccountType
 * @property {string} routingNumber
 * @property {string} lastFourAccountNumber
 * @tag Transfers
 */
/**
 * @typedef Wallet
 * @property {string} walletID
 * @tag Transfers
 */
/**
 * @typedef CardExpiration
 * @property {string} month Two-character month
 * @property {string} year Two-character year
 * @tag Transfers
 */
/**
 * The results of submitting cardholder data to a card network for verification.
 * @typedef CardVerification
 * @property {"noMatch"|"match"|"notChecked"|"unavailable"} cvv
 * @property {"noMatch"|"match"|"notChecked"|"unavailable"} addressLine1
 * @property {"noMatch"|"match"|"notChecked"|"unavailable"} postalCode
 * @tag Transfers
 */
/**
 * @typedef Card
 * @property {string} cardID
 * @property {string} fingerprint
 * @property {"American Express"|"Discover"|"MasterCard"|"Visa"} brand
 * @property {"debit"|"credit"|"prepaid"|"unknown"} cardType
 * @property {string} lastFourCardNumber
 * @property {string} bin
 * @property {CardExpiration} expiration
 * @property {string} holderName
 * @property {Address} billingAddress
 * @property {CardVerification} cardVerification
 * @tag Transfers
 */
/**
 * Models the reason for an ACH return or correction.
 * @typedef ACHCode
 * @property {string} code
 * @property {string} reason
 * @property {string} description
 * @tag Transfers
 */
/**
 * @typedef ACHDetails
 * @property {"initiated"|"originated"|"corrected"|"returned"|"completed"}
 * @property {string} traceNumber
 * @property {ACHCode} [return]
 * @property {ACHCode} [correction]
 * @tag Transfers
 */
/**
 * @typedef PaymentMethod
 * @property {string} paymentMethodID
 * @property {"moov-wallet"|"ach-debit-fund"|"ach-debit-collect"|"ach-credit-standard"|"ach-credit-same-day"|"rtp-credit"|"card-payment"} paymentMethodType
 * @property {PaymentMethodAccount} account
 * @property {BankAccount} [bankAccount]
 * @property {Wallet} [wallet]
 * @property {Card} [card]
 * @property {ACHDetails} [achDetails]
 * @property {CardDetails} [cardDetails]
 * @tag Transfers
 */
/**
 * @typedef Amount
 * @property {number} value - Integer quantity in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
 * @property {string} currency - Three-letter ISO 4217 currency code
 * @tag Transfers
 */
/**
 * @typedef Refund
 * @property {string} refundID
 * @property {string} createdOn
 * @property {string} updatedOn
 * @property {"created"|"pending"|"completed"|"failed"} status
 * @property {Amount} amount
 * @tag Transfers
 */
/**
 * @typedef Transfer
 * @property {string} transferID
 * @property {string} createdAt
 * @property {"created"|"pending"|"completed"|"failed"|"reversed"} status
 * @property {PaymentMethod} source
 * @property {PaymentMethod} destination
 * @property {Amount} amount
 * @property {string} description
 * @property {object} metadata - Arbitrary key-value pairs
 * @property {Amount} [refundedAmount]
 * @property {Refund[]} refunds
 * @property {object} facilitatorFee
 * @property {number} moovFee - Integer quantity of Moov fee in USD, so $0.11 would be 11
 * @tag Transfers
 */
/**
 * @typedef TransferResponse
 * @property {string} transferID
 * @tag Transfers
 */
/**
 * @typedef TransferListCriteria
 * @property {string[]} [accountIDs] - Optional list of account IDs to filter sources and destinations
 * @property {string} [status] - Optional transfer status by which to filter the transfers
 * @property {string} [startDateTime] - Optional date-time which inclusively filters all transfers created after this starting date-time
 * @property {string} [endDateTime] - Optional date-time which exclusively filters all transfers created before this date-time
 * @property {number} [count] - Optional parameter to limit the number of results in the query
 * @property {number} [skip] - Optional number of items to offset before starting to collect the result set
 * @tag Transfers
 */
/**
 * Criteria for finding available payment types for a transfer.
 *
 * @typedef TransferOptionsCriteria
 * @property {object} [source]
 * @property {string} [source.accountID]
 * @property {string} [source.paymentMethodID]
 * @property {object} [destination]
 * @property {string} [destination.accountID]
 * @property {string} [destination.paymentMethodID]
 * @property {Amount} amount
 * @tag Transfers
 */
/**
 * @typedef TransferOptions
 * @property {string} paymentMethodID
 * @property {"moov-wallet"|"ach-debit-fund"|"ach-debit-collect"|"ach-credit-standard"|"ach-credit-same-day"|"rtp-credit"|"card-payment"} paymentMethodType
 * @property {Wallet} wallet - Populated when `paymentMethodType` is "moov-wallet"
 * @property {BankAccount} bankAccount - Populated when `paymentMethodType` is one of the ACH or FTP variations
 * @property {Card} card - Populated when `paymentMethodType` is "card-payment"
 * @tag Transfers
 */
/**
 * @typedef AvailableTransferOptions
 * @property {TransferOptions[]} sourceOptions
 * @property {TransferOptions[]} destinationOptions
 * @tag Transfers
 */
/**
 * @typedef Refund
 * @property {string} refundID
 * @property {string} createdOn
 * @property {string} updatedOn
 * @property {"created"|"pending"|"completed"|"failed"} status
 * @property {Amount} amount
 * @tag Transfers
 */
/**
 * The Transfers API.
 * @tag Transfers
 */
export class Transfers {
    constructor(moov: any);
    /**
     * @type {Moov}
     * @private
     */
    private moov;
    /**
     * Creates a transfer to move money from a source to a destination.
     *
     * @param {Transfer} transfer - Subset of the Transfer object
     * @returns {Promise<TransferResponse>}
     * @tag Transfers
     *
     * @example
     * const moov = new Moov(...);
     * try {
     *   const transfer = {
     *     source: { paymentMethodID: "..." },
     *     destination: { paymentMethodID: "..." },
     *     amount: {
     *       value: 3215, // $32.15
     *       currency: "USD"
     *     },
     *     facilitatorFee: {
     *       value: 8, // $0.8
     *       currency: "USD"
     *     },
     *     description: "Yoga class"
     *   };
     *   const { transferID } = moov.transfers.create(transfer);
     * } catch (err) {
     *   // ...
     * }
     *
     */
    create(transfer: Transfer): Promise<TransferResponse>;
    /**
     * Lists transfers that match the given criteria.
     *
     * @param {TransferListCriteria} [criteria]
     * @returns {Promise<Transfer[]>} - Matching transfers
     * @tag Transfers
     *
     * @example
     * const moov = new Moov(...);
     * try {
     *   const criteria = {
     *     accountIDs: ["...", "...", ...],
     *     status: "pending",
     *     startDateTime: new Date("1/1/2022").toISOString(), // inclusive
     *     endDateTime: new Date("2/1/2022").toISOString(), // exclusive
     *     count: 15,
     *     skip: 15, // start on page 2
     *   };
     *   const results = await moov.transfers.list(criteria);
     * } catch (err) {
     *   // ...
     * }
     */
    list(criteria?: TransferListCriteria): Promise<Transfer[]>;
    /**
     * Gets the details of a transfer.
     *
     * @param {string} transferID
     * @returns {Promise<Transfer>}
     * @tag Transfers
     *
     * @example
     * const moov = new Moov(...);
     * try {
     *   const transfer = await moov.transfers.get("...");
     * } catch (err) {
     *   // ...
     * }
     */
    get(transferID: string): Promise<Transfer>;
    /**
     * Update the metadata on a transfer.
     *
     * @param {string} transferID
     * @param {object} metadata - Arbitrary key-value pairs
     * @returns {Promise<Transfer>}
     * @tag Transfers
     *
     * @example
     * const moov = new Moov(...);
     * try {
     *   const transfer = await moov.transfers.updateMetadata(
     *     "...",
     *     { key: "value" }
     *   );
     * } catch (err) {
     *   // ...
     * }
     */
    updateMetadata(transferID: string, metadata: object): Promise<Transfer>;
    /**
     * Gets the available payment options for a transfer.
     *
     * @param {TransferOptionsCriteria} transferOptionsCriteria - Criteria for available payment options
     * @returns {Promise<AvailableTransferOptions>}
     * @tag Transfers
     *
     * @example
     * const moov = new Moov(...);
     * try {
     *   const options = moov.transfers.getTransferOptions({
     *     source: {
     *       accountID: "...",
     *       paymentMethodID: "..."
     *     },
     *     destination: {
     *       accountID: "...",
     *       paymentMethodID: "..."
     *     },
     *     amount: {
     *       value: 43350, // $433.50
     *       currency: "USD"
     *     }
     *   });
     * } catch (err) {
     *   // ...
     * }
     */
    getTransferOptions(transferOptionsCriteria: TransferOptionsCriteria): Promise<AvailableTransferOptions>;
    /**
     * Initiate a refund for a card transfer.
     *
     * @param {string} transferID
     * @returns {Promise<TransferResponse>}
     * @tag Transfers
     *
     * @example
     * const moov = new Moov(...);
     * try {
     *   const { transferID } = moov.transfers.refund("...");
     * } catch (err) {
     *   // ...
     * }
     */
    refund(transferID: string): Promise<TransferResponse>;
    /**
     * List refunds for a card transfer.
     *
     * @param {string} transferID
     * @returns {Promise<Refund[]>}
     * @tag Transfers
     *
     * @example
     * const moov = new Moov(...);
     * try {
     *   const refunds = moov.transfers.listRefunds("...");
     * } catch (err) {
     *   // ...
     * }
     */
    listRefunds(transferID: string): Promise<Refund[]>;
    /**
     * Get details of a specific refund.
     *
     * @param {string} transferID
     * @param {string} refundID
     * @returns {Promise<Refund>}
     * @tag Transfers
     *
     * @example
     * const moov = new Moov(...);
     * try {
     *   const refund = moov.transfers.getRefund("...");
     * } catch (err) {
     *   // ...
     * }
     */
    getRefund(transferID: string, refundID: string): Promise<Refund>;
}
/**
 * High-level account information associated with a payment method.
 */
export type PaymentMethodAccount = {
    accountID: string;
    email: string;
    displayName: string;
};
export type BankAccount = {
    bankAccountID: string;
    fingerprint: string;
    status: "new" | "verified" | "verificationFailed" | "pending" | "errored";
    holderName: string;
    holderType: "individual" | "business";
    bankName: string;
    bankAccountType: "checking" | "savings" | "unknown";
    routingNumber: string;
    lastFourAccountNumber: string;
};
export type Wallet = {
    walletID: string;
};
export type CardExpiration = {
    /**
     * Two-character month
     */
    month: string;
    /**
     * Two-character year
     */
    year: string;
};
/**
 * The results of submitting cardholder data to a card network for verification.
 */
export type CardVerification = {
    cvv: "noMatch" | "match" | "notChecked" | "unavailable";
    addressLine1: "noMatch" | "match" | "notChecked" | "unavailable";
    postalCode: "noMatch" | "match" | "notChecked" | "unavailable";
};
export type Card = {
    cardID: string;
    fingerprint: string;
    brand: "American Express" | "Discover" | "MasterCard" | "Visa";
    cardType: "debit" | "credit" | "prepaid" | "unknown";
    lastFourCardNumber: string;
    bin: string;
    expiration: CardExpiration;
    holderName: string;
    billingAddress: Address;
    cardVerification: CardVerification;
};
/**
 * Models the reason for an ACH return or correction.
 */
export type ACHCode = {
    code: string;
    reason: string;
    description: string;
};
export type ACHDetails = {
    "": "initiated" | "originated" | "corrected" | "returned" | "completed";
    traceNumber: string;
    return?: ACHCode;
    correction?: ACHCode;
};
export type PaymentMethod = {
    paymentMethodID: string;
    paymentMethodType: "moov-wallet" | "ach-debit-fund" | "ach-debit-collect" | "ach-credit-standard" | "ach-credit-same-day" | "rtp-credit" | "card-payment";
    account: PaymentMethodAccount;
    bankAccount?: BankAccount;
    wallet?: Wallet;
    card?: Card;
    achDetails?: ACHDetails;
    cardDetails?: CardDetails;
};
export type Amount = {
    /**
     * - Integer quantity in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
     */
    value: number;
    /**
     * - Three-letter ISO 4217 currency code
     */
    currency: string;
};
export type Refund = {
    refundID: string;
    createdOn: string;
    updatedOn: string;
    status: "created" | "pending" | "completed" | "failed";
    amount: Amount;
};
export type Transfer = {
    transferID: string;
    createdAt: string;
    status: "created" | "pending" | "completed" | "failed" | "reversed";
    source: PaymentMethod;
    destination: PaymentMethod;
    amount: Amount;
    description: string;
    /**
     * - Arbitrary key-value pairs
     */
    metadata: object;
    refundedAmount?: Amount;
    refunds: Refund[];
    facilitatorFee: object;
    /**
     * - Integer quantity of Moov fee in USD, so $0.11 would be 11
     */
    moovFee: number;
};
export type TransferResponse = {
    transferID: string;
};
export type TransferListCriteria = {
    /**
     * - Optional list of account IDs to filter sources and destinations
     */
    accountIDs?: string[];
    /**
     * - Optional transfer status by which to filter the transfers
     */
    status?: string;
    /**
     * - Optional date-time which inclusively filters all transfers created after this starting date-time
     */
    startDateTime?: string;
    /**
     * - Optional date-time which exclusively filters all transfers created before this date-time
     */
    endDateTime?: string;
    /**
     * - Optional parameter to limit the number of results in the query
     */
    count?: number;
    /**
     * - Optional number of items to offset before starting to collect the result set
     */
    skip?: number;
};
/**
 * Criteria for finding available payment types for a transfer.
 */
export type TransferOptionsCriteria = {
    source?: {
        accountID?: string;
        paymentMethodID?: string;
    };
    destination?: {
        accountID?: string;
        paymentMethodID?: string;
    };
    amount: Amount;
};
export type TransferOptions = {
    paymentMethodID: string;
    paymentMethodType: "moov-wallet" | "ach-debit-fund" | "ach-debit-collect" | "ach-credit-standard" | "ach-credit-same-day" | "rtp-credit" | "card-payment";
    /**
     * - Populated when `paymentMethodType` is "moov-wallet"
     */
    wallet: Wallet;
    /**
     * - Populated when `paymentMethodType` is one of the ACH or FTP variations
     */
    bankAccount: BankAccount;
    /**
     * - Populated when `paymentMethodType` is "card-payment"
     */
    card: Card;
};
export type AvailableTransferOptions = {
    sourceOptions: TransferOptions[];
    destinationOptions: TransferOptions[];
};
//# sourceMappingURL=transfers.d.ts.map