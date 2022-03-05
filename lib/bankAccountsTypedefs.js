/**
 * @enum
 * @tag BankAccounts
 */
 export const BANK_ACCOUNT_STATUS = {
  /**
   * Bank Account is created and waiting on verification.
   * @tag BankAccounts
   */
  NEW: "new",
  /**
   * Bank Account is verified and ready for use.
   * @tag BankAccounts
   */
  VERIFIED: "verified",
  /**
   * Bank Account verfiication failed.
   * @tag BankAccounts
   */
   VERIFICATION_FAILED: "verificationFailed",
  /**
   * Bank Account is pending approval.
   * @tag BankAccounts
   */
  PENDING: "pending",
  /**
   * Bank Account is in an errored state.
   * @tag BankAccounts
   */
   ERRORED: "errored"
}

/**
 * @enum
 * @tag BankAccounts
 */
 export const BANK_ACCOUNT_HOLDER_TYPE = {
  /**
   * Bank Account holder is a type of individual.
   * @tag BankAccounts
   */
  INDIVIDUAL: "individual",
  /**
   * Bank Account holder is a type of individual.
   * @tag BankAccounts
   */
   BUSINESS: "business"
 }

 /**
 * @enum
 * @tag BankAccounts
 */
  export const BANK_ACCOUNT_TYPE = {
    /**
     * Bank Account is a type of checking.
     * @tag BankAccounts
     */
    CHECKING: "checking",
    /**
     * Bank Account is a type of savings.
     * @tag BankAccounts
     */
    SAVINGS: "savings",
    /**
     * Bank Account is a type of unknown.
     * @tag BankAccounts
     */
    UNKNOWN: "unknown"
   }

/**
 * Describes a Bank Account.
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