/**
 * Available capabilities
 */
export type CAPABILITIES = any;
/** @external Promise */
/**
 * Available capabilities
 * @enum
 * @tag Capabilities
 */
export const CAPABILITIES: {
    /**
     * Account contains minimum requirements to participate in a transfer
     * @tag Capabilities
     */
    TRANSFERS: string;
    /**
     * Account can be source of a payout transfer
     * @tag Capabilities
     */
    SEND_FUNDS: string;
    /**
     * Account can be destination of an ACH debit transfer
     * @tag Capabilities
     */
    COLLECT_FUNDS: string;
    /**
     * Account can top up balance or use as a source for another transfer
     * @tag Capabilities
     */
    WALLET: string;
    /**
     * Account has necessary information for 1099-NEC reporting. If requirement not met before $600 in payouts, transfers is disabled.
     * @tag Capabilities
     */
    1099: string;
};
export type CAPABILITY_STATUS = any;
export namespace CAPABILITY_STATUS {
    const ENABLED: string;
    const DISABLED: string;
    const PENDING: string;
}
export type CAPABILITY_REQUIREMENT = any;
export namespace CAPABILITY_REQUIREMENT {
    const ACCOUNT_TOS_ACCEPTANCE: string;
    const INDIVIDUAL_MOBILE: string;
    const INDIVIDUAL_EMAIL: string;
    const INDIVIDUAL_EMAIL_OR_MOBILE: string;
    const INDIVIDUAL_FIRSTNAME: string;
    const INDIVIDUAL_LASTNAME: string;
    const INDIVIDUAL_ADDRESS: string;
    const INDIVIDUAL_SSN_LAST4: string;
    const INDIVIDUAL_SSN: string;
    const INDIVIDUAL_BIRTHDATE: string;
    const BUSINESS_LEGALNAME: string;
    const BUSINESS_DESCRIPTION_OR_WEBSITE: string;
    const BUSINESS_ENTITY_TYPE: string;
    const BUSINESS_DBA: string;
    const BUSINESS_EIN: string;
    const BUSINESS_ADDRESS: string;
    const BUSINESS_PHONE: string;
    const BUSINESS_ADMINS: string;
    const BUSINESS_CONTROLLERS: string;
    const BUSINESS_OWNERS: string;
    const BUSINESS_CLASSIFICATION: string;
    const BUSINESS_INDUSTRY_CODE_MCC: string;
    const BANK_ACCOUNTS_NAME: string;
    const BANK_ACCOUNTS_ROUTING_NUMBER: string;
    const BANK_ACCOUNTS_ACCOUNT_NUMBER: string;
    const REPRESENTATIVE_MOBILE: string;
    const REPRESENTATIVE_EMAIL: string;
    const REPRESENTATIVE_FIRSTNAME: string;
    const REPRESENTATIVE_LASTNAME: string;
    const REPRESENTATIVE_ADDRESS: string;
    const REPRESENTATIVE_SSN_LAST4: string;
    const REPRESENTATIVE_SSN: string;
    const REPRESENTATIVE_BIRTHDATE: string;
    const REPRESENTATIVE_JOB_TITLE: string;
    const REPRESENTATIVE_IS_CONTROLLER: string;
    const REPRESENTATIVE_IS_OWNER: string;
    const REPRESENTATIVE_IS_OWNERSHIP: string;
    const DOCUMENT: string;
}
export type REQUIREMENT_ERROR_CODE = any;
export namespace REQUIREMENT_ERROR_CODE {
    const INVALID_VALUE: string;
    const FAILED_AUTOMATIC_VERIFICATION: string;
    const FAILED_OTHER: string;
    const INVALID_ADDRESS: string;
    const ADDRESS_RESTRICTED: string;
    const TAX_ID_MISMATCH: string;
    const DOCUMENT_ID_MISMATCH: string;
    const DOCUMENT_DATE_OF_BIRTH_MISMATCH: string;
    const DOCUMENT_NAME_MISMATCH: string;
    const DOCUMENT_ADDRESS_MISMATCH: string;
    const DOCUMENT_NUMBER_MISMATCH: string;
    const DOCUMENT_INCOMPLETE: string;
    const DOCUMENT_FAILED_RISK: string;
    const DOCUMENT_ILLEGIBLE: string;
    const DOCUMENT_UNSUPPORTED: string;
    const DOCUMENT_NOT_UPLOADED: string;
    const DOCUMENT_CORRUPT: string;
    const DOCUMENT_EXPIRED: string;
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
    constructor(moov: any);
    moov: any;
    /**
     * Request a capability to be added to an account
     *
     * @param {string} accountID - Account on which to request capabilites
     * @param {CAPABILITIES[]} capabilities - One or more capability to request
     * @returns {Promise<Capability[]>}
     *
     * @tag Capabilities
     */
    requestCapabilities(accountID: string, capabilities: CAPABILITIES[]): Promise<Capability[]>;
    /**
     * Retrieve a capability of an account
     *
     * @param {string} accountID - Account on which to request capabilites
     * @param {CAPABILITIES} capability - Capability to retrieve
     * @returns {Promise<Capability>}
     *
     * @tag Capabilities
     */
    get(accountID: string, capability: any): Promise<Capability>;
    /**
     * List capabilities on an account
     *
     * @param {string} accountID - Account on which to request capabilites
     * @returns {Promise<Capability[]>}
     *
     * @tag Capabilities
     */
    list(accountID: string): Promise<Capability[]>;
    /**
     * Disable a capability of an account
     *
     * @param {string} accountID - Account on which to request capabilites
     * @param {CAPABILITIES} capability - Capability to retrieve
     * @returns {Promise<Capability>}
     *
     * @tag Capabilities
     */
    disable(accountID: string, capability: any): Promise<Capability>;
}
/**
 * Describes a Moov capability associated with an account.
 */
export type Capability = {
    /**
     * - Type of capability
     */
    capability: any;
    /**
     * - Account identifier
     */
    accountID: string;
    /**
     * - The status of the capability requested for an account
     */
    status: any;
    /**
     * - Represents individual and business data necessary to facilitate the enabling of a capability for an account
     */
    requirements: Array<Requirement>;
    /**
     * - If status is disabled, the reason this capability was disabled
     */
    disabledReason: string;
    /**
     * - Date capability was created
     */
    createdOn: Date;
    /**
     * - Date capability was last updated
     */
    updatedOn: Date;
    /**
     * - Optional date capability was disabled
     */
    disabledOn: Date;
};
/**
 * Represents individual and business data necessary to facilitate the enabling of a capability for an account
 */
export type Requirement = {
    currentlyDue: Array<CAPABILITY_REQUIREMENT>;
    errors: Array<RequirementError>;
};
export type RequirementError = {
    requirement: Array<CAPABILITY_REQUIREMENT>;
    errorCode: Array<REQUIREMENT_ERROR_CODE>;
};
//# sourceMappingURL=capabilities.d.ts.map