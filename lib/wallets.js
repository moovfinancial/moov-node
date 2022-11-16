/** @external Promise */

import { checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";
import { Amount } from "./transfers.js";

/**
 * Describes a Moov Wallet
 * @typedef Wallet
 * @property {string} walletID
 * @property {Amount} availableBalance
 * 
 * @example
 * {
  "walletID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "availableBalance": {
    "currency": "USD",
    "value": 1204 // $12.04
  }
}
 * 
 * @tag Wallets
 */

/**
 * @enum
 * @tag Wallets
 */
export const WALLET_TRANSACTION_TYPE = {
  /**
   * When an ach payment is returned, funds are either returned or taken from the wallet balance.
   * @tag Wallets
   */
  ACH_REVERSAL: "ach-reversal",
  /**
   * A payment that was made from a card.
   * @tag Wallets
   */
  CARD_PAYMENT: "card-payment",
  /**
   * Transfer of funds out of a wallet to the account’s bank.
   * @tag Wallets
   */
  CASH_OUT: "cash-out",
  /**
   * When a customer disputes a charge, the disputed amount is debited from the wallet.
   * @tag Wallets
   */
  DISPUTE: "dispute",
  /**
   * If a dispute is won by a merchant, funds will be credited back to their wallet.
   * @tag Wallets
   */
  DISPUTE_REVERSAL: "dispute-reversal",
  /**
   * Fee earned on a transfer.
   * @tag Wallets
   */
  FACILITATOR_FEE: "facilitator-fee",
  /**
   * A refund on a purchase from a Moov issued card.
   * @tag Wallets
   */
  ISSUING_REFUND: "issuing-refund",
  /**
   * An authorized purchase from a Moov issued card.
   * @tag Wallets
   */
  ISSUING_TRANSACTION: "issuing-transaction",
  /**
   * If an authorized purchase is captured for more or less than the original authorization amount, an adjustment will be made to reflect the difference.
   * @tag Wallets
   */
  ISSUING_TRANSACTION_ADJUSTMENT: "issuing-transaction-adjustment",
  /**
   * Any funds that were not captured from an authorized purchase from a Moov issued card will be released.
   * @tag Wallets
   */
  ISSUING_AUTH_RELEASE: "issuing-auth-release",
  /**
   * An ACH payment from a bank to the account’s wallet.
   * @tag Wallets
   */
  PAYMENT: "payment",
  /**
   * A payment from a wallet to another accounts bank.
   * @tag Wallets
   */
  PAYOUT: "payout",
  /**
   * When a refund is initiated, the requested refund amount is debited from the wallet.
   * @tag Wallets
   */
  REFUND: "refund",
  /**
   * To account for refund failures, a credit will be made back into the wallet.
   * @tag Wallets
   */
  REFUND_FAILURE: "refund-failure",
  /**
   * Transfer of funds into a wallet from the account’s bank.
   * @tag Wallets
   */
  TOP_UP: "top-up",
  /**
   * Funds that move between Moov wallets.
   * @tag Wallets
   */
  WALLET_TRANSFER: "wallet-transfer",
};

/**
 * @enum
 * @tag Wallets
 */
export const WALLET_TRANSACTION_SOURCE_TYPE = {
  /**
   * Transaction was part of a transfer.
   * @tag Wallets
   */
  TRANSFER: "transfer",
  /**
   * Transaction was part of a dispute.
   * @tag Wallets
   */
  DISPUTE: "dispute",
  /**
   * Transaction was part of an issuing transaction.
   * @tag Wallets
   */
  ISSUING_TRANSACTION: "issuing-transaction",
};

/**
 * @enum
 * @tag Wallets
 */
export const WALLET_TRANSACTION_STATUS = {
  /**
   * Transaction has not completed.
   * @tag Wallets
   */
  PENDING: "pending",
  /**
   * Transaction has completed.
   * @tag Wallets
   */
  COMPLETED: "completed",
  /**
   * Transaction failed.
   * @tag Wallets
   */
  FAILED: "failed",
};

/**
 * @typedef WalletTransaction
 * @property {string} walletID - UUID v4
 * @property {string} transactionID - UUID v4
 * @property {WALLET_TRANSACTION_TYPE} transactionType - wallet transaction type.
 * @property {WALLET_TRANSACTION_SOURCE_TYPE} sourceType - where the transaction originated.
 * @property {string} sourceID - ID of the source Moov object to which this transaction is related.
 * @property {WALLET_TRANSACTION_STATUS} status - wallet transaction status.
 * @property {string} memo - Detailed description of the transaction.
 * @property {string} createdOn - Date transaction was created.
 * @property {string} [completedOn] - Date transaction was completed.
 * @property {string} currency - 3-letter ISO 4217 currency code.
 * @property {integer} grossAmount - The total transaction amount. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
 * @property {integer} fee - Total fees paid for the transaction. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
 * @property {integer} netAmount - Net amount is the gross amount less fees paid, and the amount that affects the wallet's balance. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
 * @property {integer} [availableBalance] - The wallet's total available balance after recording a completed transaction. The value is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
 * @tag Wallets
 */

/**
 * @typedef WalletTransactionListCriteria
 * @property {WALLET_TRANSACTION_TYPE} [transactionType] - Only return transactions of this type.
 * @property {WALLET_TRANSACTION_SOURCE_TYPE} [sourceType] - Only return transactions of this source type.
 * @property {string} [sourceID] - Only return transactions that were part of this transfer ID.
 * @property {WALLET_TRANSACTION_STATUS} [status] - Only return transactions in this state.
 * @property {string} [createdStartDateTime] - Only return transactions created on or after this datetime.
 * @property {string} [createdEndDateTime] - Only return transactions created before this datetime.
 * @property {string} [completedStartDateTime] - Only return transactions completed on or after this datetime.
 * @property {string} [completedEndDateTime] - Only return transactions completed before this datetime.
 * @property {number} [count] - Maximum number of transactions to return in results
 * @property {number} [skip] - Number of transactions to skip before collection results
 * @tag Wallets
 */

/**
 * The Wallets API
 * @tag Wallets
 */
export class Wallets {
  constructor(moov) {
    this.moov = moov;
  }

  /**
   * Get information on a specific Moov wallet (e.g., the available balance).
   *
   * @param {string} accountID - Account on which to request wallet
   * @param {string} walletID - The ID for the wallet associated with an account
   * @returns {Promise<Wallet>}
   *
   * @tag Wallets
   */
  async get(accountID, walletID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(walletID).or(Err.MISSING_WALLET_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/wallets/${walletID}`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * List the wallets associated with a Moov account.
   *
   * @param {string} accountID - Account on which to request wallets
   * @returns {Promise<Wallet[]>}
   *
   * @tag Wallets
   */
  async list(accountID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/wallets`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * Get the details of a wallet transaction.
   *
   * @param {string} accountID - UUID v4
   * @param {string} walletID - UUID v4
   * @param {string} transactionID - UUID v4
   * @returns {Promise<WalletTransaction>}
   *
   * @tag Wallets
   */
  async getTransaction(accountID, walletID, transactionID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(walletID).or(Err.MISSING_WALLET_ID);
    checkString(transactionID).or(Err.MISSING_WALLET_TRANSACTION_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/wallets/${walletID}/transactions/${transactionID}`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * List the transactions in a wallet.
   *
   * @param {string} accountID - UUID v4
   * @param {string} walletID - UUID v4
   * @param {WalletTransactionListCriteria} [criteria] - Filtering criteria to limit the results returned.
   * @returns {Promise<Wallet[]>}
   *
   * @tag Wallets
   */
  async listTransactions(accountID, walletID, criteria) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(walletID).or(Err.MISSING_WALLET_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/wallets/${walletID}/transactions`,
        method: "GET",
        searchParams: criteria,
      })
      .json();

    return result;
  }
}
