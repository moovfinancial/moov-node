import './bankAccountsTypedefs.js';
import { checkString } from './helpers/checks.js';
import { Err } from "./helpers/errors.js";

/** @external Promise */

/**
 * @enum
 * @tag Payment methods
 */
 export const PAYMENT_METHODS_TYPE = {
  /**
   * Moov Wallet Payment Type
   * @tag Payment methods
   */
  MOOV_WALLET: "moov-wallet",
  /**
   * ACH Debt Fund Payment Type
   * @tag Payment methods
   */
  ACH_DEBIT_FUND: "ach-debit-fund",
  /**
   * ACH Debt Collect Payment Type
   * @tag Payment methods
   */
  ACH_DEBIT_COLLECT: "ach-debit-collect",
  /**
   * ACH Credit Standard Payment Type
   * @tag Payment methods
   */
  ACH_CREDIT_STANDARD: "ach-credit-standard",
  /**
   * ACH Credit Same Day Payment Type
   * @tag Payment methods
   */
  ACH_CREDIT_SAME_DAY: "ach-credit-same-day",
  /**
   * Card Payment Type
   * @tag Payment methods
   */
  CARD: "card-payment",
 }

 /**
  * Wallet Payment Type
  * @typedef WalletPaymentType
  * @property {string} walletID - Wallet identifier
  * @tag Payment methods
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
 * @tag Payment methods
 */

/**
 * The Payment methods API
 * @tag Payment methods
 */
 export class PaymentMethods {
  constructor(moov) {
    this.moov = moov;
  }

  /**
   * Get the specified payment method associated with a Moov account.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @param {string} paymentMethodID - ID of the payment method to retrieve 
   * @returns {Promise<PaymentMethod>}
   * 
   * @tag Payment methods
   */
   async get(accountID, paymentMethodID) {
    checkString(accountID).or(Err.AccountID);
    checkString(paymentMethodID).or(Err.PaymentMethodID)

    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/payment-methods/${paymentMethodID}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
      })
      .json();

    return result;
  }

  /**
   * Retrieve all of the payment methods associated with a Moov account.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @returns {Promise<PaymentMethod[]>}
   * 
   * @tag Payment methods
   */
   async list(accountID) {
    checkString(accountID).or(Err.AccountID);
    
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/payment-methods`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
      })
      .json();

    return result;
  }

}