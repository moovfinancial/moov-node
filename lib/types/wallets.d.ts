/**
 * Describes a Moov Wallet Balance
 * @typedef WalletBalance
 * @property {string} currency - A 3-letter ISO 4217 currency code
 * @property {number} value - Quantity in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
 *
 * @tag Wallets
 */
/**
 * Describes a Moov Wallet
 * @typedef Wallet
 * @property {string} walletID - Payment Method identifier
 * @property {WalletBalance} availableBalance - A representation of money containing an integer value and it's currency.
 *
 * @example
 * {
  "walletID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "availableBalance": {
    "currency": "USD",
    "value": 1204
  }
}
 *
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
}
/**
 * Describes a Moov Wallet Balance
 */
export type WalletBalance = {
    /**
     * - A 3-letter ISO 4217 currency code
     */
    currency: string;
    /**
     * - Quantity in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99.
     */
    value: number;
};
/**
 * Describes a Moov Wallet
 */
export type Wallet = {
    /**
     * - Payment Method identifier
     */
    walletID: string;
    /**
     * - A representation of money containing an integer value and it's currency.
     */
    availableBalance: WalletBalance;
};
//# sourceMappingURL=wallets.d.ts.map