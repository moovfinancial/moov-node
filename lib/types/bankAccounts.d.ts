export type BANK_ACCOUNT_STATUS = any;
export namespace BANK_ACCOUNT_STATUS {
    const NEW: string;
    const VERIFIED: string;
    const VERIFICATION_FAILED: string;
    const PENDING: string;
    const ERRORED: string;
}
export type BANK_ACCOUNT_HOLDER_TYPE = any;
export namespace BANK_ACCOUNT_HOLDER_TYPE {
    const INDIVIDUAL: string;
    const BUSINESS: string;
}
export type BANK_ACCOUNT_TYPE = any;
export namespace BANK_ACCOUNT_TYPE {
    const CHECKING: string;
    const SAVINGS: string;
    const UNKNOWN: string;
}
/**
 * Describes a Moov capability associated with an account.
 * @typedef BankAccount
 * @property {string} bankAccountID - Bank Account identifier
 * @property {string} fingerprint - Fingerprint of Bank Account
 * @property {BANK_ACCOUNT_STATUS} status - The bank account status
 * @property {string} holderName - Name of the bank account holder
 * @property {BANK_ACCOUNT_HOLDER_TYPE} holderType - The type of holder on a funding source
 * @property {string} bankName - Name of the bank
 * @property {BANK_ACCOUNT_TYPE} bankAccountType - The bank account type
 * @property {string} routingNumber - Bank account routing number
 * @property {string} lastFourAccountNumber - Last four digits of the bank account number
 *
 * @example
 * {
  "bankAccountID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "fingerprint": "9948962d92a1ce40c9f918cd9ece3a22bde62fb325a2f1fe2e833969de672ba3",
  "status": "new",
  "holderName": "Jules Jackson",
  "holderType": "individual",
  "bankName": "Chase Bank",
  "bankAccountType": "checking",
  "routingNumber": "string",
  "lastFourAccountNumber": "7000"
}
 *
 * @tag BankAccounts
 */
/**
 * Describes a Bank Account to be added.
 * @typedef BankAccountAdd
 * @property {string} holderName - Name of the bank account holder
 * @property {BANK_ACCOUNT_HOLDER_TYPE} holderType - The type of holder on a funding source
 * @property {string} routingNumber - Bank account routing number
 * @property {string} accountNumber - The bank account number
 * @property {BANK_ACCOUNT_TYPE} [bankAccountType] - The bank account type
 *
 * @tag BankAccounts
 */
/**
 * The BankAccounts API
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
     * Discontinue using a specified bank account linked to a Moov account.
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
/**
 * Describes a Moov capability associated with an account.
 */
export type BankAccount = {
    /**
     * - Bank Account identifier
     */
    bankAccountID: string;
    /**
     * - Fingerprint of Bank Account
     */
    fingerprint: string;
    /**
     * - The bank account status
     */
    status: any;
    /**
     * - Name of the bank account holder
     */
    holderName: string;
    /**
     * - The type of holder on a funding source
     */
    holderType: any;
    /**
     * - Name of the bank
     */
    bankName: string;
    /**
     * - The bank account type
     */
    bankAccountType: any;
    /**
     * - Bank account routing number
     */
    routingNumber: string;
    /**
     * - Last four digits of the bank account number
     */
    lastFourAccountNumber: string;
};
/**
 * Describes a Bank Account to be added.
 */
export type BankAccountAdd = {
    /**
     * - Name of the bank account holder
     */
    holderName: string;
    /**
     * - The type of holder on a funding source
     */
    holderType: any;
    /**
     * - Bank account routing number
     */
    routingNumber: string;
    /**
     * - The bank account number
     */
    accountNumber: string;
    /**
     * - The bank account type
     */
    bankAccountType?: any;
};
//# sourceMappingURL=bankAccounts.d.ts.map