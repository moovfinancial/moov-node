/** @external Promise */
/**
 * The Bank Accounts API
 * @tag BankAccounts
 */
export class BankAccounts {
    constructor(moov: any);
    moov: any;
    /**
     * Link a bank account to a Moov account
     *
     * @param {string} accountID - Account on which to add the bank account
     * @param {BankAccountAdd} [bankAccount] - Optional bank account details
     * @param {string} [plaidToken] - Optional Plaid processor token
     * @param {string} [mxAuthorizationCode] - Optional Plaid processor authorization code
     * @returns {Promise<BankAccount>}
     *
     * @tag BankAccounts
     */
    link(accountID: string, bankAccount?: BankAccountAdd, plaidToken?: string, mxAuthorizationCode?: string): Promise<BankAccount>;
    /**
     * Retrieve bank account details (i.e. routing number or account type) associated with a specific Moov account.
     *
     * @param {string} accountID - Account on which to request bank account
     * @param {string} bankAccountID - ID of the bank account to retrieve
     * @returns {Promise<BankAccount>}
     *
     * @tag BankAccounts
     */
    get(accountID: string, bankAccountID: string): Promise<BankAccount>;
    /**
     * List all the bank accounts associated with a particular Moov account.
     *
     * @param {string} accountID - Account on which to request bank account
     * @returns {Promise<BankAccount[]>}
     *
     * @tag BankAccounts
     */
    list(accountID: string): Promise<BankAccount[]>;
    /**
     * Discontinue using a specified bank account linked to a Moov account.
     *
     * @param {string} accountID - Account on which to request bank account
     * @param {string} bankAccountID - ID of the bank account to disable
     * @returns {Promise<void>}
     *
     * @tag BankAccounts
     */
    disable(accountID: string, bankAccountID: string): Promise<void>;
    /**
     * Initiate a micro deposit for a bank account linked to a Moov account.
     *
     * @param {string} accountID - Account on which to request bank account
     * @param {string} bankAccountID - ID of the bank account to disable
     * @returns {Promise<void>}
     *
     * @tag BankAccounts
     */
    initMicroDeposits(accountID: string, bankAccountID: string): Promise<void>;
    /**
     * Complete the micro-deposit validation process by passing the amounts of the two transfers.
     *
     * @param {string} accountID - Account on which to request bank account
     * @param {string} bankAccountID - ID of the bank account to disable
     * @returns {Promise<void>}
     *
     * @tag BankAccounts
     */
    completeMicroDeposits(accountID: string, bankAccountID: string, amounts: any): Promise<void>;
}
//# sourceMappingURL=bankAccounts.d.ts.map