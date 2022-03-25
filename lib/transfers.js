import { randomUUID } from "crypto";
import { checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";

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
 * @typedef TransferCreate
 * @property {PaymentMethod} source 
 * @property {PaymentMethod} destination
 * @property {Amount} amount
 * @property {object} facilitatorFee
 * @property {string} description
 * @property {object} metadata - Arbitrary key-value pairs
 * 
 * @example 
 * {
  "source": {
    "transferID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
    "paymentMethodID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
    "cardDetails": {}
  },
  "destination": {
    "paymentMethodID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43"
  },
  "amount": {
    "currency": "USD",
    "value": 1204
  },
  "facilitatorFee": {
    "total": 0,
    "markup": 0
  },
  "description": "Pay Instructor for May 15 Class",
  "metadata": {
    "property1": "string",
    "property2": "string"
  }
}
 * @tag Transfers
 */

/**
 * @typedef TransferResponse
 * @property {string} transferID
 * 
 * @example
 * {
  "transferID": "e23de6dd-5168-4e1d-894d-807fa691dc80"
}
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
  constructor(moov) {
    /**
     * @type {Moov}
     * @private
     */
    this.moov = moov;
  }

  /**
   * Creates a transfer to move money from a source to a destination.
   *
   * @param {TransferCreate} transfer - Subset of the Transfer object
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
  async create(transfer) {
    const token = await this.moov.getToken();

    const result = await this.moov
      .got({
        url: `transfers`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token.token}`,
          "x-idempotency-key": randomUUID(),
        },
        json: transfer,
      })
      .json();

    return result;
  }

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
  async list(criteria) {
    const token = await this.moov.getToken();

    const options = {
      url: "transfers",
      method: "GET",
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    };

    if (criteria) {
      const params = new URLSearchParams();

      if (criteria.accountIDs) {
        params.append("accountIDs", criteria.accountIDs.join(","));
      }
      if (criteria.status) {
        params.append("status", criteria.status);
      }
      if (criteria.startDateTime) {
        params.append("startDateTime", criteria.startDateTime);
      }
      if (criteria.endDateTime) {
        params.append("endDateTime", criteria.endDateTime);
      }
      if (criteria.count) {
        params.append("count", criteria.count.toString());
      }
      if (criteria.skip) {
        params.append("skip", criteria.skip.toString());
      }

      options.searchParams = params;
    }

    const result = await this.moov.got(options).json();

    return result;
  }

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
  async get(transferID) {
    const token = await this.moov.getToken();

    const result = await this.moov
      .got({
        url: `transfers/${transferID}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
          "x-account-id": this.moov.credentials.accountID,
        },
      })
      .json();

    return result;
  }

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
  async updateMetadata(transferID, metadata) {
    const token = await this.moov.getToken();

    const result = await this.moov
      .got({
        url: `transfers/${transferID}`,
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token.token}`,
          "x-account-id": this.moov.credentials.accountID,
        },
        json: {
          metadata,
        },
      })
      .json();

    return result;
  }

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
  async getTransferOptions(transferOptionsCriteria) {
    const token = await this.moov.getToken();

    const result = await this.moov
      .got({
        url: `transfer-options`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token.token}`,
          "x-account-id": this.moov.credentials.accountID,
        },
        json: transferOptionsCriteria,
      })
      .json();

    return result;
  }

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
  async refund(transferID) {
    const token = await this.moov.getToken();

    const result = await this.moov
      .got({
        url: `transfers/${transferID}/refunds`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token.token}`,
          "x-idempotency-key": randomUUID(),
        },
      })
      .json();

    return result;
  }

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
  async listRefunds(transferID) {
    const token = await this.moov.getToken();

    const result = await this.moov
      .got({
        url: `transfers/${transferID}/refunds`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
        },
      })
      .json();

    return result;
  }

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
  async getRefund(transferID, refundID) {
    const token = await this.moov.getToken();

    const result = await this.moov
      .got({
        url: `transfers/${transferID}/refunds/${refundID}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
        },
      })
      .json();

    return result;
  }
}
