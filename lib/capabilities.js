import { SCOPES } from "./moov.js";

/** @external Promise */

/**
 * Available capabilities
 * @enum
 * @tag Capabilities
 */
export const CAPABILITIES = {
  /**
   * Account contains minimum requirements to participate in a transfer
   * @tag Capabilities
   */
  TRANSFERS: "transfers",
  /**
   * Account can be source of a payout transfer
   * @tag Capabilities
   */
  SEND_FUNDS: "send-funds",
  /**
   * Account can be destination of an ACH debit transfer
   * @tag Capabilities
   */
  COLLECT_FUNDS: "collect-funds",
  /**
   * Account can top up balance or use as a source for another transfer
   * @tag Capabilities
   */
  WALLET: "wallet",
  /**
   * Account has necessary information for 1099-NEC reporting. If requirement not met before $600 in payouts, transfers is disabled.
   * @tag Capabilities
   */
  1099: "1099",
}

/**
 * @enum
 * @tag Capabilities
 */
export const CAPABILITY_STATUS = {
  /**
   * Capability is enabled and ready for use.
   * @tag Capabilities
   */
  ENABLED: "enabled",
  /**
   * Capability has been disabled.
   * @tag Capabilities
   */
  DISABLED: "disabled",
  /**
   * Capability has been requested and is pending approval.
   * @tag Capabilities
   */
  PENDING: "pending"
}

/**
 * Describes a Moov capability associated with an account.
 * @typedef Capability
 * @property {CAPABILITIES} capability - Type of capability
 * @property {string} accountID - Account identifier
 * @property {CAPABILITY_STATUS} status - The status of the capability requested for an account
 * @property {Array.<Requirement>} requirements - Represents individual and business data necessary to facilitate the enabling of a capability for an account
 * @property {string} disabledReason - If status is disabled, the reason this capability was disabled
 * @property {string} createdOn - Date capability was created
 * @property {string} updatedOn - Date capability was last updated
 * @property {string} disabledOn - Optional date capability was disabled
 * 
 * @example
 * {
  "capability": "transfers",
  "accountID": "3dfff852-927d-47e8-822c-2fffc57ff6b9",
  "status": "enabled",
  "requirements": {
    "currentlyDue": [
      "account.tos-acceptance"
    ],
    "errors": [
      {
        "requirement": "account.tos-acceptance",
        "errorCode": "invalid-value"
      }
    ]
  },
  "disabledReason": "string",
  "createdOn": "2019-08-24T14:15:22Z",
  "updatedOn": "2019-08-24T14:15:22Z",
  "disabledOn": "2019-08-24T14:15:22Z"
}
 * 
 * @tag Capabilities
 */

/**
 * Represents individual and business data necessary to facilitate the enabling of a capability for an account
 * @typedef Requirement
 * @property {"account.tos-acceptance"|"individual.mobile"|"individual.email"|"individual.email-or-mobile"|"individual.firstname"|"individual.lastname"|"individual.address"|"individual.ssn-last4"|"individual.ssn"|"individual.birthdate"|"business.legalname"|"business.description-or-website"|"business.entity-type"|"business.dba"|"business.ein"|"business.address"|"business.phone"|"business.admins"|"business.controllers"|"business.owners"|"business.classification"|"business.industry-code-mcc"|"bank-accounts.name"|"bank-accounts.routing-number"|"bank-accounts.account-number"|"representative.{rep-uuid}.mobile"|"representative.{rep-uuid}.email"|"representative.{rep-uuid}.firstname"|"representative.{rep-uuid}.lastname"|"representative.{rep-uuid}.address"|"representative.{rep-uuid}.ssn-last4"|"representative.{rep-uuid}.ssn"|"representative.{rep-uuid}.birthdate"|"representative.{rep-uuid}.job-title"|"representative.{rep-uuid}.is-controller"|"representative.{rep-uuid}.is-owner"|"representative.{rep-uuid}.ownership"|"document.{doc-uuid}"} currentlyDue
 * @property {Array.<RequirementError>} errors
 * @tag Capabilities
 */

/**
 * @typedef RequirementError
 * @property {"account.tos-acceptance"|"individual.mobile"|"individual.email"|"individual.email-or-mobile"|"individual.firstname"|"individual.lastname"|"individual.address"|"individual.ssn-last4"|"individual.ssn"|"individual.birthdate"|"business.legalname"|"business.description-or-website"|"business.entity-type"|"business.dba"|"business.ein"|"business.address"|"business.phone"|"business.admins"|"business.controllers"|"business.owners"|"business.classification"|"business.industry-code-mcc"|"bank-accounts.name"|"bank-accounts.routing-number"|"bank-accounts.account-number"|"representative.{rep-uuid}.mobile"|"representative.{rep-uuid}.email"|"representative.{rep-uuid}.firstname"|"representative.{rep-uuid}.lastname"|"representative.{rep-uuid}.address"|"representative.{rep-uuid}.ssn-last4"|"representative.{rep-uuid}.ssn"|"representative.{rep-uuid}.birthdate"|"representative.{rep-uuid}.job-title"|"representative.{rep-uuid}.is-controller"|"representative.{rep-uuid}.is-owner"|"representative.{rep-uuid}.ownership"|"document.{doc-uuid}"} requirement
 * @property {"invalid-value"|"failed-automatic-verification"|"failed-other"|"invalid-address"|"address-restricted"|"tax-id-mismatch"|"document-id-mismatch"|"document-date-of-birth-mismatch"|"document-name-mismatch"|"document-address.mismatch"|"document-number-mismatch"|"document-incomplete"|"document-failed-risk"|"document-illegible"|"document-unsupported"|"document-not-uploaded"|"document-corrupt"|"document-expired"}errorCode
 * 
 * @tag Capabilities
*/

/**
 * The Capabilities API
 * @tag Capabilities
 */
export class Capabilities {
  constructor(moov) {
    this.moov = moov;
  }

  /**
   * Request a capability to be added to an account
   * 
   * @param {string} accountID - Account on which to request capabilites
   * @param {CAPABILITIES[]} capabilities - One or more capability to request
   * @returns {Promise<Capability[]>}
   * 
   * @tag Capabilities
   */
   async requestCapabilities(accountID, capabilities) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/capabilities`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token.token}`,
          origin: this.moov.credentials.domain,
          referer: this.moov.credentials.domain,
          "x-account-id": this.moov.credentials.accountID,
        },
        json: {"capabilities": capabilities},
      })
      .json();

    return result;
  }

  /**
   * Retrieve a capability of an account
   * 
   * @param {string} accountID - Account on which to request capabilites
   * @param {CAPABILITIES} capability - Capability to retrieve 
   * @returns {Promise<Capability>}
   * 
   * @tag Capabilities
   */
   async get(accountID, capability) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/capabilities/${capability}`,
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
   * List capabilities on an account
   * 
   * @param {string} accountID - Account on which to request capabilites
   * @returns {Promise<Capability[]>}
   * 
   * @tag Capabilities
   */
   async list(accountID) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/capabilities`,
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
   * Disable a capability of an account
   * 
   * @param {string} accountID - Account on which to request capabilites
   * @param {CAPABILITIES} capability - Capability to retrieve 
   * @returns {Promise<Capability>}
   * 
   * @tag Capabilities
   */
   async disable(accountID, capability) {
    const token = await this.moov.getToken(accountID)

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/capabilities/${capability}`,
        method: "DELETE",
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