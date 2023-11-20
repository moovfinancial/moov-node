import { check, checkString } from "./helpers/checks.js";
import { BankAccount, BankAccountAdd } from "./bankAccountsTypedefs.js";
import { Err } from "./helpers/errors.js";

/** @external Promise */

/**
 * The Bank Accounts API
 * @tag Bank accounts
 */
export class BankAccounts {
  constructor(moov) {
    this.moov = moov;
  }

  /**
   * Link a bank account to a Moov account
   * The `BANK_ACCOUNTS_WRITE` scope enum is required when making a request from the browser.
   *
   * @param {string} accountID - Account on which to add the bank account
   * @param {BankAccountAdd} [bankAccount] - Optional bank account details
   * @param {string} [plaidToken] - Optional Plaid processor token
   * @param {string} [mxAuthorizationCode] - Optional Plaid processor authorization code
   * @returns {Promise<BankAccount>}
   *
   * @tag Bank accounts
   */
  async link(accountID, bankAccount, plaidToken, mxAuthorizationCode) {
    let payload = {};
    if (!accountID) {
      console.log(Err.MISSING_ACCOUNT_ID_ERROR_MESSAGE);
      throw new Error(Err.MISSING_ACCOUNT_ID_ERROR_MESSAGE);
    }

    if (!bankAccount && !plaidToken && !mxAuthorizationCode) {
      console.log(Err.MISSING_BANK_PAYLOAD);
      throw new Error(Err.MISSING_BANK_PAYLOAD);
    }

    if (bankAccount) {
      if (!bankAccount.accountNumber) {
        console.log(Err.MISSING_BANK_ACCOUNT_NUMBER);
        throw new Error(Err.MISSING_BANK_ACCOUNT_NUMBER);
      }
      if (!bankAccount.routingNumber) {
        console.log(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER);
        throw new Error(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER);
      }
      if (bankAccount.routingNumber.length !== 9) {
        console.log(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER_LENGTH);
        throw new Error(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER_LENGTH);
      }
      if (!bankAccount.holderName) {
        console.log(Err.MISSING_BANK_ACCOUNT_HOLDER_NAME);
        throw new Error(Err.MISSING_BANK_ACCOUNT_HOLDER_NAME);
      }
      if (!bankAccount.holderType) {
        console.log(Err.MISSING_BANK_ACCOUNT_HOLDER_TYPE);
        throw new Error(Err.MISSING_BANK_ACCOUNT_HOLDER_TYPE);
      }
      payload = {
        account: bankAccount,
      };
    } else if (plaidToken) {
      payload = {
        plaid: { token: plaidToken },
      };
    } else if (mxAuthorizationCode) {
      payload = {
        mx: { authorizationCode: mxAuthorizationCode },
      };
    }

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts`,
        method: "POST",
        json: payload,
      })
      .json();

    return result;
  }

  /**
   * Retrieve bank account details (i.e. routing number or account type) associated with a specific Moov account.
   * The `BANK_ACCOUNTS_READ` scope enum is required when making a request from the browser.
   * @param {string} accountID - Account on which to request bank account
   * @param {string} bankAccountID - ID of the bank account to retrieve
   * @returns {Promise<BankAccount>}
   *
   * @tag Bank accounts
   */
  async get(accountID, bankAccountID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts/${bankAccountID}`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * List all the bank accounts associated with a particular Moov account.
   * The `BANK_ACCOUNTS_READ` scope enum is required when making a request from the browser.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @returns {Promise<BankAccount[]>}
   *
   * @tag Bank accounts
   */
  async list(accountID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * Discontinue using a specified bank account linked to a Moov account.
   * The `BANK_ACCOUNTS_WRITE` scope enum is required when making a request from the browser.
   *
   * @param {string} accountID - Account on which to request bank account
   * @param {string} bankAccountID - ID of the bank account to disable
   * @returns {Promise<void>}
   *
   * @tag Bank accounts
   */
  async disable(accountID, bankAccountID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts/${bankAccountID}`,
        method: "DELETE",
      })
      .json();

    return result;
  }

  /**
   * Initiate a micro deposit for a bank account linked to a Moov account.
   * The `BANK_ACCOUNTS_WRITE` scope enum is required when making a request from the browser.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @param {string} bankAccountID - ID of the bank account to disable
   * @returns {Promise<void>}
   *
   * @tag Bank accounts
   */
  async initMicroDeposits(accountID, bankAccountID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts/${bankAccountID}/micro-deposits`,
        method: "POST",
      })
      .json();

    return result;
  }

  /**
   * Complete the micro-deposit validation process by passing the amounts of the two transfers.
   * The `BANK_ACCOUNTS_WRITE` scope enum is required when making a request from the browser.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @param {string} bankAccountID - ID of the bank account to disable
   * @param {Array.<number>} amounts - Array of two positive integers, in cents, equal to the values of the micro-deposits sent to the bank account.
   * @returns {Promise<void>}
   *
   * @tag Bank accounts
   */
  async completeMicroDeposits(accountID, bankAccountID, amounts) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(bankAccountID).or(Err.MISSING_BANK_ACCOUNT_ID);
    check(amounts).or(Err.MISSING_AMOUNTS);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts/${bankAccountID}/micro-deposits`,
        method: "PUT",
        json: { amounts: amounts },
      })
      .json();

    return result;
  }
}
