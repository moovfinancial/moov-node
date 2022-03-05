export type PAYMENT_METHODS_TYPE = any;
export namespace PAYMENT_METHODS_TYPE {
    const MOOV_WALLET: string;
    const ACH_DEBIT_FUND: string;
    const ACH_DEBIT_COLLECT: string;
    const ACH_CREDIT_STANDARD: string;
    const ACH_CREDIT_SAME_DAY: string;
    const CARD: string;
}
/**
 * Wallet Payment Type
 * @typedef WalletPaymentType
 * @property {string} walletID - Wallet identifier
 * @tag PaymentMethods
 */
/**
 * Describes a Payment Method.
 * @typedef PaymentMethod
 * @property {string} paymentMethodID - Payment Method identifier
 * @property {PAYMENT_METHODS_TYPE} paymentMethodType - Fingerprint of Bank Account
 * @property {WalletPaymentType} [wallet] - Optional wallet object when payment method type is 'moov-wallet'.
 * @property {BankAccount} [bankAccount] - Optional bank account object when payment method type is one of 'ach-debit-fund', 'ach-debit-collect', ach-credit-standard', or 'ach-credit-same-day'.
 *
 * @example
 * {
  "paymentMethodID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "paymentMethodType": "ach-debit-fund",
  "bankAccount": {
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
}
 *
 * @tag PaymentMethods
 */
/**
 * The Payment Methods API
 * @tag PaymentMethods
 */
export class PaymentMethods {
    constructor(moov: any);
    moov: any;
    /**
     * Get the specified payment method associated with a Moov account.
     *
     * @param {string} accountID - Account on which to request bank account
     * @param {string} paymentMethodID - ID of the payment method to retrieve
     * @returns {Promise<PaymentMethod>}
     *
     * @tag PaymentMethods
     */
    get(accountID: string, paymentMethodID: string): Promise<PaymentMethod>;
    /**
     * Retrieve all of the payment methods associated with a Moov account.
     *
     * @param {string} accountID - Account on which to request bank account
     * @returns {Promise<PaymentMethod[]>}
     *
     * @tag PaymentMethods
     */
    list(accountID: string): Promise<PaymentMethod[]>;
}
/**
 * Wallet Payment Type
 */
export type WalletPaymentType = {
    /**
     * - Wallet identifier
     */
    walletID: string;
};
/**
 * Describes a Payment Method.
 */
export type PaymentMethod = {
    /**
     * - Payment Method identifier
     */
    paymentMethodID: string;
    /**
     * - Fingerprint of Bank Account
     */
    paymentMethodType: any;
    /**
     * - Optional wallet object when payment method type is 'moov-wallet'.
     */
    wallet?: WalletPaymentType;
    /**
     * - Optional bank account object when payment method type is one of 'ach-debit-fund', 'ach-debit-collect', ach-credit-standard', or 'ach-credit-same-day'.
     */
    bankAccount?: BankAccount;
};
//# sourceMappingURL=paymentMethods.d.ts.map