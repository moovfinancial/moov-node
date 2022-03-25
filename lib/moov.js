import got from "got";

import {
  check,
  checkArrayLength,
  checkString,
  checkUrl,
} from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";
import { Accounts } from "./accounts.js";
import { Avatars } from "./avatars.js";
import { BankAccounts } from "./bankAccounts.js";
import { Capabilities } from "./capabilities.js";
import { Cards } from "./cards.js";
import { EnrichedAddresses } from "./enrichedAddress.js";
import { EnrichedProfiles } from "./enrichedProfile.js";
import { Institutions } from "./institutions.js";
import { PaymentMethods } from "./paymentMethods.js";
import { Representatives } from "./representatives.js";
import { Transfers } from "./transfers.js";
import { Wallets } from "./wallets.js";

/** external Promise */
/** external Accounts */

/**
 * Available scopes to request on OAuth tokens.
 * @enum
 * @tag Authentication
 */
export const SCOPES = {
  /**
   * Allows a new Moov account to be created
   * @tag Authentication
   */
  ACCOUNTS_CREATE: "/accounts.write",
  /**
   * Access to view Moov accounts
   * @tag Authentication
   */
  ACCOUNTS_READ: "/accounts.read",
  /**
   * Access to view a linked bank account to a Moov account
   * @tag Authentication
   */
  BANK_ACCOUNTS_READ: "/accounts/{accountID}/bank-accounts.read",
  /**
   * Access to add a linked bank account to a Moov account
   * @tag Authentication
   */
  BANK_ACCOUNTS_WRITE: "/accounts/{accountID}/bank-accounts.write",
  /**
   * Access to view a linked card on a Moov account
   * @tag Authentication
   */
  CARDS_READ: "/accounts/{accountID}/cards.read",
  /**
   * Access add a linked card to a Moov account
   * @tag Authentication
   */
  CARDS_WRITE: "/accounts/{accountID}/cards.write",
  /**
   * Access to view capabilities, determining what actions the account can do
   * @tag Authentication
   */
  CAPABILITIES_READ: "/accounts/{accountID}/capabilities.read",
   /**
    * Access to request capabilities, determining what actions the account can do
    * @tag Authentication
    */
  CAPABILITIES_WRITE: "/accounts/{accountID}/capabilities.write",
  /**
   * Access to view documents (like I-9s, W-4s) associated with a Moov account
   * @tag Authentication
   */
  DOCUMENTS_READ: "/accounts/{accountID}/documents.read",
   /**
    * Access to upload documents (like I-9s, W-4s) associated with a Moov account
    * @tag Authentication
    */
  DOCUMENTS_WRITE: "/accounts/{accountID}/documents.write",
  /**
   * Access to view payment methods for the account specified
   * @tag Authentication
   */
  PAYMENT_METHODS_READ: "/accounts/{accountID}/payment-methods.read",
  /**
   * Access to view a Moov account’s profile image
   * @tag Authentication
   */
  PROFILE_ENRICHMENT_READ: "/accounts/{accountID}/profile-enrichment.read",
  /**
   * Access to view details associated with a Moov account
   * @tag Authentication
   */
  PROFILE_READ: "/accounts/{accountID}/profile.read",
  /**
   * Access to edit details associated with a Moov account
   * @tag Authentication
   */
  PROFILE_WRITE: "/accounts/{accountID}/profile.write",
  /**
   * Access to view details on business representatives for a Moov account
   * @tag Authentication
   */
  REPRESENTATIVE_READ: "/accounts/{accountID}/representatives.read",
   /**
    * Access to add details on business representatives for a Moov account
    * @tag Authentication
    */
  REPRESENTATIVE_WRITE: "/accounts/{accountID}/representatives.write",
  /**
   * Access to view transfers
   * @tag Authentication
   */
  TRANSFERS_READ: "/accounts/{accountID}/transfers.read",
  /**
   * Access to move money by creating transfers
   * @tag Authentication
   */
  TRANSFERS_WRITE: "/accounts/{accountID}/transfers.write",
  /**
   * Access to view the balance on an account’s Moov wallet
   * @tag Authentication
   */
  WALLETS_READ: "/accounts/{accountID}/wallets.read",
  /**
   * Allows a developer to use the institutions lookup service to look up a bank name by routing number
   * @tag Authentication
   */
  FED_READ: "/fed.read",
  /**
   * Ping Moov servers to test for connectivity
   * @tag Authentication
   */
  PING: "/ping.read",
};

/**
 * For internal use only. Do not generate OAuth tokens for Moov.js and Moov
 * Drops that contain more permissions than are necessary.
 * @private
 */
export const ALL_SCOPES = [
  SCOPES.ACCOUNTS_CREATE,
  SCOPES.ACCOUNTS_READ,
  SCOPES.BANK_ACCOUNTS_READ,
  SCOPES.BANK_ACCOUNTS_WRITE,
  SCOPES.CARDS_READ,
  SCOPES.CARDS_WRITE,
  SCOPES.CAPABILITIES_READ,
  SCOPES.CAPABILITIES_WRITE,
  SCOPES.DOCUMENTS_READ,
  SCOPES.DOCUMENTS_WRITE,
  SCOPES.PAYMENT_METHODS_READ,
  SCOPES.PROFILE_ENRICHMENT_READ,
  SCOPES.PROFILE_READ,
  SCOPES.PROFILE_WRITE,
  SCOPES.REPRESENTATIVE_READ,
  SCOPES.REPRESENTATIVE_WRITE,
  SCOPES.TRANSFERS_READ,
  SCOPES.TRANSFERS_WRITE,
  SCOPES.WALLETS_READ,
  SCOPES.FED_READ,
  SCOPES.PING,
];

/**
 * OAuth2 token returned by `Moov.generateToken()`. Use `Token.token` in Moov.js
 * and client-side code to make calls to the Moov API.
 * @typedef Token
 *
 * @property {string} token - String token required by Moov API requests
 * @property {Date} expiresOn - Date and time when the token expires
 * @property {string} refreshToken - String used to refresh this token
 * @tag Authentication
 */

const gotDefaults = {
  prefixUrl: "https://api.moov.io",
};

/**
 * The Moov API client.
 * @tag Moov
 */
export class Moov {
  /**
   * @summary
   * Initializes a new instance of the Moov API client.
   *
   * @description
   * Get the information for the `credentials` parameter from the Moov
   * Dashboard.
   *
   * Moov uses the [Got](https://github.com/sindresorhus/got) HTTP client
   * library. If you need to access or customize the request-response pipeline,
   * then provide customized options or an instance in the `gotOptionsOrInstance` parameter.
   *
   * @param {object} credentials - API key credentials
   * @param {string} credentials.accountID - Facilitator account ID
   * @param {string} credentials.publicKey - Public key value from API key
   * @param {string} credentials.secretKey - Secret key value from API key
   * @param {string} credentials.domain - One of the domains from API key
   * @param {object} [gotOptionsOrInstance] - Customized Got options or instance. See [docs](https://github.com/sindresorhus/got).
   * 
   * @kind constructor
   * @tag Moov
   *
   * @example
   * const moov = new Moov({
   *   accountID: "...",
   *   publicKey: "...",
   *   secretKey: "...",
   *   domain: "...",
   * });
   */
  constructor(credentials, gotOptionsOrInstance) {
    check(credentials).or(Err.ApiKeyCredentials);
    checkString(credentials.accountID).or(Err.AccountID);
    checkString(credentials.publicKey).or(Err.PublicKey);
    checkString(credentials.secretKey).or(Err.SecretKey);
    checkUrl(credentials.domain).or(Err.DomainRequired);

    this.credentials = credentials;
    this.tokenCache = {};
    this.got = got.extend(
      {
        headers: {
          origin: this.credentials.domain,
        },
      },
      gotDefaults,
      gotOptionsOrInstance || {}
    );

    this._accounts = null;
    this._capabilities = null;
    this._transfers = null;
  }

  /**
   * @summary
   * Generates an OAuth token required by Moov API requests. For more on our authentication protocol, read our [quick start guide](/guides/quick-start/#create-an-access-token). 
   *
   * @param {SCOPES[]} scopes - One or more permissions to request
   * @param {string} [accountID] - Account on which to request permissions, default is faciliator account ID
   * @returns {Promise<Token>}
   * @tag Authentication
   *
   * @description
   * You only need call this function when generating tokens for [Moov.js](/moovjs) and
   * [Moov Drops](/moovjs/drops). The other functions in this library generate tokens for you
   * automatically.
   *
   * @example
   * const moov = new Moov(...);
   * const token = await moov.generateToken([
   *   SCOPES.ACCOUNTS_CREATE,
   *   SCOPES.PING
   * ]);
   */
  async generateToken(scopes, accountID) {
    checkArrayLength(scopes).or(Err.Scopes);

    if (!accountID) {
      accountID = this.credentials.accountID;
    }

    const renderedScopes = [];
    for (let scope of scopes) {
      checkString(scope).or(Err.Scopes);
      renderedScopes.push(scope.replace("{accountID}", accountID));
    }

    const result = await this.got({
      url: "oauth2/token",
      method: "POST",
      form: {
        grant_type: "client_credentials",
        client_id: this.credentials.publicKey,
        client_secret: this.credentials.secretKey,
        scope: renderedScopes.join(" "),
      },
    }).json();

    const expiresOn = new Date(new Date().getTime() + result.expires_in * 1000);

    return {
      token: result.access_token,
      expiresOn,
      refreshToken: result.refresh_token,
    };
  }

  /**
   * Pings the Moov servers to check for connectivity.
   * Read more about [/ping](/api/#tag/Ping).
   * @tag Authentication
   *
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.ping();
   *   // Ping succeeded
   * } catch (err) {
   *   // Ping failed
   * }
   */
  async ping() {
    const token = await this.getToken();

    await this.got({
      url: "ping",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
  }

  /**
   * Gets the Accounts API.
   * @returns {Accounts}
   * @tag Moov
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.accounts.create(...);
   * } catch (err) {
   *   // ...
   * }
   */
  get accounts() {
    if (!this._accounts) {
      this._accounts = new Accounts(this);
    }
    return this._accounts;
  }

  /**
   * Gets the Avatars API.
   * @returns {Avatars}
   * @tag Moov
   * 
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.avatars.get(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get avatars() {
    if (!this._avatars) {
      this._avatars = new Avatars(this);
    }
    return this._avatars;
  }

  /**
   * Gets the Bank Accounts API.
   * @returns {BankAccounts}
   * @tag Moov
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.bankAccounts.link(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get bankAccounts() {
    if (!this._bankAccounts) {
      this._bankAccounts = new BankAccounts(this);
    }
    return this._bankAccounts;
  }

  /**
   * Gets the Capabilities API.
   * @returns {Capabilities}
   * @tag Moov
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.capabilities.requestCapabilities(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get capabilities() {
    if (!this._capabilities) {
      this._capabilities = new Capabilities(this);
    }
    return this._capabilities;
  }

  /**
   * Gets the Cards API.
   * @returns {Cards}
   * @tag Moov
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.cards.list(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get cards() {
    if (!this._cards) {
      this._cards = new Cards(this);
    }
    return this._cards;
  }

  /**
   * Gets the Enriched Address API.
   * @returns {EnrichedAddresses}
   * @tag Moov
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.enrichedAddresses.get(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get enrichedAddresses() {
    if (!this._enrichedAddresses) {
      this._enrichedAddresses = new EnrichedAddresses(this);
    }
    return this._enrichedAddresses;
  }

  /**
   * Gets the Enriched Profile API.
   * @returns {EnrichedProfiles}
   * @tag Moov
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.enrichedProfiles.get(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get enrichedProfiles() {
    if (!this._enrichedProfiles) {
      this._enrichedProfiles = new EnrichedProfiles(this);
    }
    return this._enrichedProfiles;
  }

  /**
   * Gets the Payment Methods API.
   * @returns {PaymentMethods}
   * @tag Moov
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.paymentMethods.get(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get paymentMethods() {
    if (!this._paymentMethods) {
      this._paymentMethods = new PaymentMethods(this);
    }
    return this._paymentMethods;
  }

  /**
   * Gets the Institutions API.
   * @returns {Institutions}
   * @tag Moov
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.institutions.getACHInstitution(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get institutions() {
    if (!this._institutions) {
      this._institutions = new Institutions(this);
    }
    return this._institutions;
  }

  /**
   * Gets the Representatives API.
   * @returns {Representatives}
   * @tag Moov
   *
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.representatives.create(...);
   * } catch (err) {
   *   // ...
   * }
   */
   get representatives() {
    if (!this._representatives) {
      this._representatives = new Representatives(this);
    }
    return this._representatives;
  }
  
  /**
   * Gets the Transfers API.
   * @returns {Transfers}
   * @tag Moov
   *
   * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.transfers.create(...);
   * } catch (err) {
   *   // ...
   * }
   */
  get transfers() {
    if (!this._transfers) {
      this._transfers = new Transfers(this);
    }
    return this._transfers;
  }

  /**
   * Gets the Wallets API.
   * @returns {Wallets}
   * @tag Moov
   *
  * @example
   * const moov = new Moov(...);
   * try {
   *   await moov.wallets.get(...);
   * } catch (err) {
   *   // ...
   * }
   */
     get wallets() {
      if (!this._wallets) {
        this._wallets = new Wallets(this);
      }
      return this._wallets;
    }

  /**
   * Gets a cached token or creates a new one.
   * @param {string} accountID - Account identifier
   * @returns {Promise<Token>}
   * @private
   */
  async getToken(accountID) {
    if (!accountID) {
      accountID = this.credentials.accountID;
    }
    const now = new Date();
    if (
      !this.tokenCache[accountID] ||
      this.tokenCache[accountID].expiresOn <= now
    ) {
      this.tokenCache[accountID] = await this.generateToken(
        ALL_SCOPES,
        accountID
      );
    }

    return this.tokenCache[accountID];
  }

}