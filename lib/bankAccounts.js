import './bankAccountsTypedefs.js';
import { Err } from "./helpers/errors.js";

/** @external Promise */

/**
 * The Bank Accounts API
 * @tag BankAccounts
 */
export class BankAccounts {
  constructor(moov) {
    this.moov = moov;
  }

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
  async link( accountID, bankAccount, plaidToken, mxAuthorizationCode ) {
    let payload = {};
    if (!accountID) {
      console.log(Err.MISSING_ACCOUNT_ID_ERROR_MESSAGE);
      return;
    }
    
    if (!bankAccount && !plaidToken && !mxAuthorizationCode) {
      console.log(Err.MISSING_BANK_PAYLOAD);
      return;
    }

    if (bankAccount) {
      if (!bankAccount.accountNumber) {
        console.log(Err.MISSING_BANK_ACCOUNT_NUMBER_ERROR_MESSAGE);
        return;
      }
      if (!bankAccount.routingNumber) {
        console.log(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER_ERROR_MESSAGE);
        return;
      }
      if (bankAccount.routingNumber.length !== 9) {
        console.log(Err.MISSING_BANK_ACCOUNT_ROUTING_NUMBER_LENGTH_ERROR_MESSAGE);
        return;
      }
      if (!bankAccount.holderName) {
        console.log(Err.MISSING_BANK_ACCOUNT_HOLDER_NAME_ERROR_MESSAGE);
        return;
      }
      if (!bankAccount.holderType) {
        console.log(Err.MISSING_BANK_ACCOUNT_HOLDER_TYPE_ERROR_MESSAGE);
        return;
      }
      payload = {
        account: bankAccount
      }
    } else if (plaidToken) {
      payload = {
        plaid: { token: plaidToken }
      }
    } else if (mxAuthorizationCode) {
      payload = {
        mx: { authorizationCode: mxAuthorizationCode }
      }
    }

    const token = await this.moov.getToken(accountID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
        json: payload,
      })
      .json();

    return result;
  }

  /**
   * Retrieve bank account details (i.e. routing number or account type) associated with a specific Moov account.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @param {string} bankAccountID - ID of the bank account to retrieve 
   * @returns {Promise<BankAccount>}
   * 
   * @tag BankAccounts
   */
   async get(accountID, bankAccountID) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts/${bankAccountID}`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
        },
      })
      .json();

    return result;
  }

  /**
   * List all the bank accounts associated with a particular Moov account.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @returns {Promise<BankAccount[]>}
   * 
   * @tag BankAccounts
   */
   async list(accountID) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts`,
        method: "GET",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
        },
      })
      .json();

    return result;
  }

  /**
   * Discontinue using a specified bank account linked to a Moov account.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @param {string} bankAccountID - ID of the bank account to disable 
   * @returns {Promise<void>}
   * 
   * @tag BankAccounts
   */
   async disable(accountID, bankAccountID) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts/${bankAccountID}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
        },
      })
      .json();

    return result;
  }

  /**
   * Initiate a micro deposit for a bank account linked to a Moov account.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @param {string} bankAccountID - ID of the bank account to disable 
   * @returns {Promise<void>}
   * 
   * @tag BankAccounts
   */
   async initMicroDeposits(accountID, bankAccountID) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts/${bankAccountID}/micro-deposits`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
        },
      })
      .json();

    return result;
  }

  /**
   * Complete the micro-deposit validation process by passing the amounts of the two transfers.
   * 
   * @param {string} accountID - Account on which to request bank account
   * @param {string} bankAccountID - ID of the bank account to disable 
   * @returns {Promise<void>}
   * 
   * @tag BankAccounts
   */
   async completeMicroDeposits(accountID, bankAccountID, amounts) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/bank-accounts/${bankAccountID}/micro-deposits`,
        method: "PUT",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
        },
        json: {"amounts": amounts},
      })
      .json();

    return result;
  }

}