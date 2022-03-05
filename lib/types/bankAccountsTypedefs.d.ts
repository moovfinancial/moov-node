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
 * Describes a Bank Account.
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
//# sourceMappingURL=bankAccountsTypedefs.d.ts.map