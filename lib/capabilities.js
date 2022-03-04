
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
 * @enum
 * @tag Capabilities
 */
export const CAPABILITY_REQUIREMENT = {
  /**
   * @tag Capabilities
   */
  ACCOUNT_TOS_ACCEPTANCE: "account.tos-acceptance",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_MOBILE: "individual.mobile",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_EMAIL: "individual.email",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_EMAIL_OR_MOBILE: "individual.email-or-mobile",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_FIRSTNAME: "individual.firstname",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_LASTNAME: "individual.lastname",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_ADDRESS: "individual.address",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_SSN_LAST4: "individual.ssn-last4",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_SSN: "individual.ssn",
  /**
   * @tag Capabilities
   */
  INDIVIDUAL_BIRTHDATE: "individual.birthdate",
  /**
   * @tag Capabilities
   */
  BUSINESS_LEGALNAME: "business.legalname",
  /**
   * @tag Capabilities
   */
  BUSINESS_DESCRIPTION_OR_WEBSITE: "business.description-or-website",
  /**
   * @tag Capabilities
   */
  BUSINESS_ENTITY_TYPE: "business.entity-type",
  /**
   * @tag Capabilities
   */
  BUSINESS_DBA: "business.dba",
  /**
   * @tag Capabilities
   */
  BUSINESS_EIN: "business.ein",
  /**
   * @tag Capabilities
   */
  BUSINESS_ADDRESS: "business.address",
  /**
   * @tag Capabilities
   */
  BUSINESS_PHONE: "business.phone",
  /**
   * @tag Capabilities
   */
  BUSINESS_ADMINS: "business.admins",
  /**
   * @tag Capabilities
   */
  BUSINESS_CONTROLLERS: "business.controllers",
  /**
   * @tag Capabilities
   */
  BUSINESS_OWNERS: "business.owners",
  /**
   * @tag Capabilities
   */
  BUSINESS_CLASSIFICATION: "business.classification",
  /**
   * @tag Capabilities
   */
  BUSINESS_INDUSTRY_CODE_MCC: "business.industry-code-mcc",
  /**
   * @tag Capabilities
   */
  BANK_ACCOUNTS_NAME: "bank-accounts.name",
  /**
   * @tag Capabilities
   */
  BANK_ACCOUNTS_ROUTING_NUMBER: "bank-accounts.routing-number",
  /**
   * @tag Capabilities
   */
  BANK_ACCOUNTS_ACCOUNT_NUMBER: "bank-accounts.account-number",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_MOBILE: "representative.{rep-uuid}.mobile",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_EMAIL: "representative.{rep-uuid}.email",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_FIRSTNAME: "representative.{rep-uuid}.firstname",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_LASTNAME: "representative.{rep-uuid}.lastname",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_ADDRESS: "representative.{rep-uuid}.address",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_SSN_LAST4: "representative.{rep-uuid}.ssn-last4",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_SSN: "representative.{rep-uuid}.ssn",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_BIRTHDATE: "representative.{rep-uuid}.birthdate",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_JOB_TITLE: "representative.{rep-uuid}.job-title",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_IS_CONTROLLER: "representative.{rep-uuid}.is-controller",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_IS_OWNER: "representative.{rep-uuid}.is-owner",
  /**
   * @tag Capabilities
   */
  REPRESENTATIVE_IS_OWNERSHIP: "representative.{rep-uuid}.ownership",
  /**
   * @tag Capabilities
   */
  DOCUMENT: "document.{doc-uuid}"
}

/**
 * @enum
 * @tag Capabilities
 */
export const REQUIREMENT_ERROR_CODE = {
  /**
   * @tag Capabilities
   */
  INVALID_VALUE: "invalid-value",
  /**
   * @tag Capabilities
   */
  FAILED_AUTOMATIC_VERIFICATION: "failed-automatic-verification",
  /**
   * @tag Capabilities
   */
  FAILED_OTHER: "failed-other",
  /**
   * @tag Capabilities
   */
  INVALID_ADDRESS: "invalid-address",
  /**
   * @tag Capabilities
   */
  ADDRESS_RESTRICTED: "address-restricted",
  /**
   * @tag Capabilities
   */
  TAX_ID_MISMATCH: "tax-id-mismatch",
  /**
   * @tag Capabilities
   */
  DOCUMENT_ID_MISMATCH: "document-id-mismatch",
  /**
   * @tag Capabilities
   */
  DOCUMENT_DATE_OF_BIRTH_MISMATCH: "document-date-of-birth-mismatch",
  /**
   * @tag Capabilities
   */
  DOCUMENT_NAME_MISMATCH: "document-name-mismatch",
  /**
   * @tag Capabilities
   */
  DOCUMENT_ADDRESS_MISMATCH: "document-address.mismatch",
  /**
   * @tag Capabilities
   */
  DOCUMENT_NUMBER_MISMATCH: "document-number-mismatch",
  /**
   * @tag Capabilities
   */
  DOCUMENT_INCOMPLETE: "document-incomplete",
  /**
   * @tag Capabilities
   */
  DOCUMENT_FAILED_RISK: "document-failed-risk",
  /**
   * @tag Capabilities
   */
  DOCUMENT_ILLEGIBLE: "document-illegible",
  /**
   * @tag Capabilities
   */
  DOCUMENT_UNSUPPORTED: "document-unsupported",
  /**
   * @tag Capabilities
   */
  DOCUMENT_NOT_UPLOADED: "document-not-uploaded",
  /**
   * @tag Capabilities
   */
  DOCUMENT_CORRUPT: "document-corrupt",
  /**
   * @tag Capabilities
   */
  DOCUMENT_EXPIRED: "document-expired"
}

/**
 * Describes a Moov capability associated with an account.
 * @typedef Capability
 * @property {CAPABILITIES} capability - Type of capability
 * @property {string} accountID - Account identifier
 * @property {CAPABILITY_STATUS} status - The status of the capability requested for an account
 * @property {Array.<Requirement>} requirements - Represents individual and business data necessary to facilitate the enabling of a capability for an account
 * @property {string} disabledReason - If status is disabled, the reason this capability was disabled
 * @property {Date} createdOn - Date capability was created
 * @property {Date} updatedOn - Date capability was last updated
 * @property {Date} disabledOn - Optional date capability was disabled
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
 * @property {Array.<CAPABILITY_REQUIREMENT>} currentlyDue
 * @property {Array.<RequirementError>} errors
 * @tag Capabilities
 */

/**
 * @typedef RequirementError
 * @property {Array.<CAPABILITY_REQUIREMENT>} requirement
 * @property {Array.<REQUIREMENT_ERROR_CODE>} errorCode
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
   * @returns {Promise<void>}
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