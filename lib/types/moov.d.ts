/**
 * Available scopes to request on OAuth tokens.
 */
export type SCOPES = any;
export namespace SCOPES {
    const ACCOUNTS_CREATE: string;
    const BANK_ACCOUNTS_READ: string;
    const BANK_ACCOUNTS_WRITE: string;
    const CARDS_READ: string;
    const CARDS_WRITE: string;
    const CAPABILITIES_READ: string;
    const CAPABILITIES_WRITE: string;
    const DOCUMENTS_READ: string;
    const DOCUMENTS_WRITE: string;
    const PAYMENT_METHODS_READ: string;
    const PROFILE_ENRICHMENT_READ: string;
    const PROFILE_READ: string;
    const PROFILE_WRITE: string;
    const REPRESENTATIVE_READ: string;
    const REPRESENTATIVE_WRITE: string;
    const TRANSFERS_READ: string;
    const TRANSFERS_WRITE: string;
    const WALLETS_READ: string;
    const FED_READ: string;
    const PING: string;
}
/**
 * For internal use only. Do not generate OAuth tokens for Moov.js and Moov
 * Drops that contain more permissions than are necessary.
 * @private
 */
export const ALL_SCOPES: string[];
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
    constructor(credentials: {
        accountID: string;
        publicKey: string;
        secretKey: string;
        domain: string;
    }, gotOptionsOrInstance?: object);
    credentials: {
        accountID: string;
        publicKey: string;
        secretKey: string;
        domain: string;
    };
    tokenCache: {};
    got: import("got").Got;
    _accounts: Accounts;
    _capabilities: Capabilities;
    _transfers: Transfers;
    /**
     * @summary
     * Generates an OAuth token required by Moov API requests.
     *
     * @param {SCOPES[]} scopes - One or more permissions to request
     * @param {string} [accountID] - Account on which to request permissions, default is faciliator account ID
     * @returns {Promise<Token>}
     * @tag Authentication
     *
     * @description
     * You only need call this function when generating tokens for Moov.js and
     * Moov Drops. The other functions in this library generate tokens for you
     * automatically.
     *
     * @example
     * const moov = new Moov(...);
     * const token = await moov.generateToken([
     *   SCOPES.ACCOUNTS_CREATE,
     *   SCOPES.PING
     * ]);
     */
    generateToken(scopes: SCOPES[], accountID?: string): Promise<Token>;
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
    ping(): Promise<void>;
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
    get accounts(): Accounts;
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
    get avatars(): Avatars;
    _avatars: Avatars;
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
    get bankAccounts(): BankAccounts;
    _bankAccounts: BankAccounts;
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
    get capabilities(): Capabilities;
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
    get paymentMethods(): PaymentMethods;
    _paymentMethods: PaymentMethods;
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
    get transfers(): Transfers;
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
    get wallets(): Wallets;
    _wallets: Wallets;
    /**
     * Gets a cached token or creates a new one.
     * @param {string} accountID - Account identifier
     * @returns {Promise<Token>}
     * @private
     */
    private getToken;
}
/**
 * OAuth2 token returned by `Moov.generateToken()`. Use `Token.token` in Moov.js
 * and client-side code to make calls to the Moov API.
 */
export type Token = {
    /**
     * - String token required by Moov API requests
     */
    token: string;
    /**
     * - Date and time when the token expires
     */
    expiresOn: Date;
    /**
     * - String used to refresh this token
     */
    refreshToken: string;
};
import { Accounts } from "./accounts.js";
import { Capabilities } from "./capabilities.js";
import { Transfers } from "./transfers.js";
import { Avatars } from "./avatars.js";
import { BankAccounts } from "./bankAccounts.js";
import { PaymentMethods } from "./paymentMethods.js";
import { Wallets } from "./wallets.js";
//# sourceMappingURL=moov.d.ts.map