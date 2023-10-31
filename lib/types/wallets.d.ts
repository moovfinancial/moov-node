export type WALLET_TRANSACTION_TYPE = any;
export namespace WALLET_TRANSACTION_TYPE {
    const ACH_REVERSAL: string;
    const CARD_PAYMENT: string;
    const CASH_OUT: string;
    const DISPUTE: string;
    const DISPUTE_REVERSAL: string;
    const FACILITATOR_FEE: string;
    const ISSUING_REFUND: string;
    const ISSUING_TRANSACTION: string;
    const ISSUING_TRANSACTION_ADJUSTMENT: string;
    const ISSUING_AUTH_RELEASE: string;
    const PAYMENT: string;
    const PAYOUT: string;
    const REFUND: string;
    const REFUND_FAILURE: string;
    const TOP_UP: string;
    const WALLET_TRANSFER: string;
}
export type WALLET_TRANSACTION_SOURCE_TYPE = any;
export namespace WALLET_TRANSACTION_SOURCE_TYPE {
    export const TRANSFER: string;
    const DISPUTE_1: string;
    export { DISPUTE_1 as DISPUTE };
    const ISSUING_TRANSACTION_1: string;
    export { ISSUING_TRANSACTION_1 as ISSUING_TRANSACTION };
}
export type WALLET_TRANSACTION_STATUS = any;
export namespace WALLET_TRANSACTION_STATUS {
    const PENDING: string;
    const COMPLETED: string;
    const FAILED: string;
}
/**
 * @typedef WalletTransaction
 * @property {string} walletID - UUID v4
 * @property {string} transactionID - UUID v4
 * @property {WALLET_TRANSACTION_TYPE} transactionType - wallet transaction type.
 * @property {WALLET_TRANSACTION_SOURCE_TYPE} sourceType - where the transaction originated.
 * @property {string} sourceID - ID of the source Moov object to which this transaction is related (UUID string of one of `walletID`, `cardID`, or `bankAccountID`).
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
    constructor(moov: any);
    moov: any;
    /**
     * Get information on a specific Moov wallet (e.g., the available balance).
     *
     * @param {string} accountID - Account on which to request wallet
     * @param {string} walletID - The ID for the wallet associated with an account
     * @returns {Promise<Wallet>}
     *
     * @tag Wallets
     */
    get(accountID: string, walletID: string): Promise<Wallet>;
    /**
     * List the wallets associated with a Moov account.
     *
     * @param {string} accountID - Account on which to request wallets
     * @returns {Promise<Wallet[]>}
     *
     * @tag Wallets
     */
    list(accountID: string): Promise<Wallet[]>;
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
    getTransaction(accountID: string, walletID: string, transactionID: string): Promise<WalletTransaction>;
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
    listTransactions(accountID: string, walletID: string, criteria?: WalletTransactionListCriteria): Promise<Wallet[]>;
}
/**
 * Describes a Moov Wallet
 */
export type Wallet = {
    /**
     * - UUID v4
     */
    walletID: string;
    /**
     * - Balance based on all completed transactions against the wallet.
     */
    availableBalance: Amount;
};
export type WalletTransaction = {
    /**
     * - UUID v4
     */
    walletID: string;
    /**
     * - UUID v4
     */
    transactionID: string;
    /**
     * - wallet transaction type.
     */
    transactionType: any;
    /**
     * - where the transaction originated.
     */
    sourceType: any;
    /**
     * - ID of the source Moov object to which this transaction is related.
     */
    sourceID: string;
    /**
     * - wallet transaction status.
     */
    status: any;
    /**
     * - Detailed description of the transaction.
     */
    memo: string;
    /**
     * - Date transaction was created.
     */
    createdOn: string;
    /**
     * - Date transaction was completed.
     */
    completedOn?: string;
    /**
     * - 3-letter ISO 4217 currency code.
     */
    currency: string;
    /**
     * - The total transaction amount. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
     */
    grossAmount: integer;
    /**
     * - Total fees paid for the transaction. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
     */
    fee: integer;
    /**
     * - Net amount is the gross amount less fees paid, and the amount that affects the wallet's balance. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
     */
    netAmount: integer;
    /**
     * - The wallet's total available balance after recording a completed transaction. The value is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
     */
    availableBalance?: integer;
};
export type WalletTransactionListCriteria = {
    /**
     * - Only return transactions of this type.
     */
    transactionType?: any;
    /**
     * - Only return transactions of this source type.
     */
    sourceType?: any;
    /**
     * - Only return transactions that were part of this transfer ID.
     */
    sourceID?: string;
    /**
     * - Only return transactions in this state.
     */
    status?: any;
    /**
     * - Only return transactions created on or after this datetime.
     */
    createdStartDateTime?: string;
    /**
     * - Only return transactions created before this datetime.
     */
    createdEndDateTime?: string;
    /**
     * - Only return transactions completed on or after this datetime.
     */
    completedStartDateTime?: string;
    /**
     * - Only return transactions completed before this datetime.
     */
    completedEndDateTime?: string;
    /**
     * - Maximum number of transactions to return in results
     */
    count?: number;
    /**
     * - Number of transactions to skip before collection results
     */
    skip?: number;
};
import { Amount } from "./transfers.js";
//# sourceMappingURL=wallets.d.ts.map