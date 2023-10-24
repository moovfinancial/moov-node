import { check, checkString } from "./helpers/checks.js";
import { Err } from "./helpers/errors.js";

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
};

/**
 * @enum
 * @tag Capabilities
 */
export const CAPABILITY_STATUS = {
  /**
   * Capability is enabled and ready for use
   * @tag Capabilities
   */
  ENABLED: "enabled",
  /**
   * Capability has been disabled
   * @tag Capabilities
   */
  DISABLED: "disabled",
  /**
   * Capability has been requested and is pending approval
   * @tag Capabilities
   */
  PENDING: "pending",
};

/**
 * @enum
 * @tag Capabilities
 */
export const CAPABILITY_REQUIREMENT = {
  /**
   * Terms of service status
   * @tag Capabilities
   */
  ACCOUNT_TOS_ACCEPTANCE: "account.tos-acceptance",
  /**
   * Individual account's mobile number
   * @tag Capabilities
   */
  INDIVIDUAL_MOBILE: "individual.mobile",
  /**
   * Individual account's email
   * @tag Capabilities
   */
  INDIVIDUAL_EMAIL: "individual.email",
  /**
   * Individual account's email or mobile number
   * @tag Capabilities
   */
  INDIVIDUAL_EMAIL_OR_MOBILE: "individual.email-or-mobile",
  /**
   * Individual account holder's first name
   * @tag Capabilities
   */
  INDIVIDUAL_FIRSTNAME: "individual.firstname",
  /**
   * Individual account holder's last name
   * @tag Capabilities
   */
  INDIVIDUAL_LASTNAME: "individual.lastname",
  /**
   * Individual account's address
   * @tag Capabilities
   */
  INDIVIDUAL_ADDRESS: "individual.address",
  /**
   * Individual account holder's last four of Social Security Number
   * @tag Capabilities
   */
  INDIVIDUAL_SSN_LAST4: "individual.ssn-last4",
  /**
   * Individual account holder's full Social Security Number
   * @tag Capabilities
   */
  INDIVIDUAL_SSN: "individual.ssn",
  /**
   * Individual account holder's birth date
   * @tag Capabilities
   */
  INDIVIDUAL_BIRTHDATE: "individual.birthdate",
  /**
   * Business's legal name
   * @tag Capabilities
   */
  BUSINESS_LEGALNAME: "business.legalname",
  /**
   * Business's description or website
   * @tag Capabilities
   */
  BUSINESS_DESCRIPTION_OR_WEBSITE: "business.description-or-website",
  /**
   * Business's entity type
   * @tag Capabilities
   */
  BUSINESS_ENTITY_TYPE: "business.entity-type",
  /**
   * Business's Doing Business As name
   * @tag Capabilities
   */
  BUSINESS_DBA: "business.dba",
  /**
   * Business's Employer Identification Number
   * @tag Capabilities
   */
  BUSINESS_EIN: "business.ein",
  /**
   * Business's address
   * @tag Capabilities
   */
  BUSINESS_ADDRESS: "business.address",
  /**
   * Business's phone number
   * @tag Capabilities
   */
  BUSINESS_PHONE: "business.phone",
  /**
   * Business administrators
   * @tag Capabilities
   */
  BUSINESS_ADMINS: "business.admins",
  /**
   * Business controllers
   * @tag Capabilities
   */
  BUSINESS_CONTROLLERS: "business.controllers",
  /**
   * Business owners
   * @tag Capabilities
   */
  BUSINESS_OWNERS: "business.owners",
  /**
   * Business classification
   * @tag Capabilities
   */
  BUSINESS_CLASSIFICATION: "business.classification",
  /**
   * Business's industry code or merchant category code
   * @tag Capabilities
   */
  BUSINESS_INDUSTRY_CODE_MCC: "business.industry-code-mcc",
  /**
   * Business's bank account name
   * @tag Capabilities
   */
  BANK_ACCOUNTS_NAME: "bank-accounts.name",
  /**
   * Business's bank account routing number
   * @tag Capabilities
   */
  BANK_ACCOUNTS_ROUTING_NUMBER: "bank-accounts.routing-number",
  /**
   * Business's bank account number
   * @tag Capabilities
   */
  BANK_ACCOUNTS_ACCOUNT_NUMBER: "bank-accounts.account-number",
  /**
   * Business representative's mobile number
   * @tag Capabilities
   */
  REPRESENTATIVE_MOBILE: "representative.{rep-uuid}.mobile",
  /**
   * Business representative's email
   * @tag Capabilities
   */
  REPRESENTATIVE_EMAIL: "representative.{rep-uuid}.email",
  /**
   * Business representative's first name
   * @tag Capabilities
   */
  REPRESENTATIVE_FIRSTNAME: "representative.{rep-uuid}.firstname",
  /**
   * Business representative's last name
   * @tag Capabilities
   */
  REPRESENTATIVE_LASTNAME: "representative.{rep-uuid}.lastname",
  /**
   * Business representative's address
   * @tag Capabilities
   */
  REPRESENTATIVE_ADDRESS: "representative.{rep-uuid}.address",
  /**
   * Business representative's last four of Social Security Number
   * @tag Capabilities
   */
  REPRESENTATIVE_SSN_LAST4: "representative.{rep-uuid}.ssn-last4",
  /**
   * Business representative's full Social Security Number
   * @tag Capabilities
   */
  REPRESENTATIVE_SSN: "representative.{rep-uuid}.ssn",
  /**
   * Business representative's birth date
   * @tag Capabilities
   */
  REPRESENTATIVE_BIRTHDATE: "representative.{rep-uuid}.birthdate",
  /**
   * Business representative's job title
   * @tag Capabilities
   */
  REPRESENTATIVE_JOB_TITLE: "representative.{rep-uuid}.job-title",
  /**
   * Business representative's controller status
   * @tag Capabilities
   */
  REPRESENTATIVE_IS_CONTROLLER: "representative.{rep-uuid}.is-controller",
  /**
   * Business representative's owner status
   * @tag Capabilities
   */
  REPRESENTATIVE_IS_OWNER: "representative.{rep-uuid}.is-owner",
  /**
   * Business representative's ownership %
   * @tag Capabilities
   */
  REPRESENTATIVE_IS_OWNERSHIP: "representative.{rep-uuid}.ownership",
  /**
   * Documents for capability enablement
   * @tag Capabilities
   */
  DOCUMENT: "document.{doc-uuid}",
};

/**
 * @enum
 * @tag Capabilities
 */
export const REQUIREMENT_ERROR_CODE = {
  /**
   * Invalid value
   * @tag Capabilities
   */
  INVALID_VALUE: "invalid-value",
  /**
   * Automatic verification failed
   * @tag Capabilities
   */
  FAILED_AUTOMATIC_VERIFICATION: "failed-automatic-verification",
  /**
   * Other failure reason
   * @tag Capabilities
   */
  FAILED_OTHER: "failed-other",
  /**
   * Invalid address
   * @tag Capabilities
   */
  INVALID_ADDRESS: "invalid-address",
  /**
   * Address restricted
   * @tag Capabilities
   */
  ADDRESS_RESTRICTED: "address-restricted",
  /**
   * Tax ID mismatch
   * @tag Capabilities
   */
  TAX_ID_MISMATCH: "tax-id-mismatch",
  /**
   * Document ID mismatch
   * @tag Capabilities
   */
  DOCUMENT_ID_MISMATCH: "document-id-mismatch",
  /**
   * Date of birth mismatch
   * @tag Capabilities
   */
  DOCUMENT_DATE_OF_BIRTH_MISMATCH: "document-date-of-birth-mismatch",
  /**
   * Name mismatch
   * @tag Capabilities
   */
  DOCUMENT_NAME_MISMATCH: "document-name-mismatch",
  /**
   * Address mismatch
   * @tag Capabilities
   */
  DOCUMENT_ADDRESS_MISMATCH: "document-address.mismatch",
  /**
   * Number mismatch
   * @tag Capabilities
   */
  DOCUMENT_NUMBER_MISMATCH: "document-number-mismatch",
  /**
   * Incomplete document
   * @tag Capabilities
   */
  DOCUMENT_INCOMPLETE: "document-incomplete",
  /**
   * Failed risk assessment
   * @tag Capabilities
   */
  DOCUMENT_FAILED_RISK: "document-failed-risk",
  /**
   * Illegible document
   * @tag Capabilities
   */
  DOCUMENT_ILLEGIBLE: "document-illegible",
  /**
   * Unsupported document type
   * @tag Capabilities
   */
  DOCUMENT_UNSUPPORTED: "document-unsupported",
  /**
   * Document did not upload
   * @tag Capabilities
   */
  DOCUMENT_NOT_UPLOADED: "document-not-uploaded",
  /**
   * Corrupt document
   * @tag Capabilities
   */
  DOCUMENT_CORRUPT: "document-corrupt",
  /**
   * Expired document
   * @tag Capabilities
   */
  DOCUMENT_EXPIRED: "document-expired",
};

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
 * Represents individual and business data necessary to facilitate the enabling of a capability for an account.
 * @typedef Requirement
 * @property {Array.<CAPABILITY_REQUIREMENT>} currentlyDue - List of required documents and data
 * @property {Array.<RequirementError>} errors - List of missing requirements
 * @tag Capabilities
 */

/**
 * @typedef RequirementError
 * @property {Array.<CAPABILITY_REQUIREMENT>} requirement - The unique ID of the missing requirement
 * @property {Array.<REQUIREMENT_ERROR_CODE>} errorCode - List of relevant error codes (for example, `invalid-value`)
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
   * Request a capability to be added to an account.
   *
   * @param {string} accountID - Account on which to request capabilities
   * @param {CAPABILITIES[]} capabilities - One or more capability to request
   * @returns {Promise<Capability[]>}
   *
   * @tag Capabilities
   */
  async requestCapabilities(accountID, capabilities) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    check(capabilities).or(Err.MISSING_CAPABILITIES);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/capabilities`,
        method: "POST",
        json: { capabilities: capabilities },
      })
      .json();

    return result;
  }

  /**
   * Retrieve a capability of an account
   *
   * @param {string} accountID - Account on which to request capabilities 
   * @param {CAPABILITIES} capability - Capability to retrieve
   * @returns {Promise<Capability>}
   *
   * @tag Capabilities
   */
  async get(accountID, capability) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(capability).or(Err.MISSING_CAPABILITY);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/capabilities/${capability}`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * List capabilities on an account
   *
   * @param {string} accountID - Account on which to request capabilities 
   * @returns {Promise<Capability[]>}
   *
   * @tag Capabilities
   */
  async list(accountID) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/capabilities`,
        method: "GET",
      })
      .json();

    return result;
  }

  /**
   * Disable a capability of an account
   *
   * @param {string} accountID - Account on which to request capabilities 
   * @param {CAPABILITIES} capability - Capability to retrieve
   * @returns {Promise<void>}
   *
   * @tag Capabilities
   */
  async disable(accountID, capability) {
    checkString(accountID).or(Err.MISSING_ACCOUNT_ID);
    checkString(capability).or(Err.MISSING_CAPABILITY);

    const result = await this.moov
      .got({
        url: `accounts/${accountID}/capabilities/${capability}`,
        method: "DELETE",
      })
      .json();

    return result;
  }
}
