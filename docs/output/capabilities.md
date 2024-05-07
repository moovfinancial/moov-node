---
title: "Capabilities"
weight: 50
---
Capabilities determine what a Moov account can do. Each capability has specific information requirements, depending on risk and compliance standards associated with different account activities. For more context, read our [capabilities](/guides/accounts/capabilities) guide.


## RequestCapabilities


Request a capability to be added to an account.
The `CAPABILITIES_WRITE` scope enum is required when making a request from the browser.

```javascript
capabilities.requestCapabilities(accountID, capabilities)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilities |
| capabilities |  Array.<[CAPABILITIES](#capabilities)> | One or more capability to request |
{{</ table >}}



**Returns**

`Promise.<Array.<Capability>>`



## Get


Retrieve a capability of an account
The `CAPABILITIES_READ` scope enum is required when making a request from the browser.

```javascript
capabilities.get(accountID, capability)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilities |
| capability |  [CAPABILITIES](#capabilities) | Capability to retrieve |
{{</ table >}}



**Returns**

`Promise.<Capability>`



## List


List capabilities on an account
The `CAPABILITIES_READ` scope enum is required when making a request from the browser.

```javascript
capabilities.list(accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilities |
{{</ table >}}



**Returns**

`Promise.<Array.<Capability>>`



## Disable


Disable a capability of an account
The `CAPABILITIES_WRITE` scope enum is required when making a request from the browser.

```javascript
capabilities.disable(accountID, capability)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilities |
| capability |  [CAPABILITIES](#capabilities) | Capability to retrieve |
{{</ table >}}



**Returns**

`Promise.<void>`






## Types
### Capability

Describes a Moov capability associated with an account.

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| capability |  [CAPABILITIES](#capabilities) | Type of capability |
| accountID |  `string` | Account identifier |
| status |  [CAPABILITY_STATUS](#capability_status) | The status of the capability requested for an account |
| requirements |  Array.<[Requirement](#requirement)> | Represents individual and business data necessary to facilitate the enabling of a capability for an account |
| disabledReason |  `string` | If status is disabled, the reason this capability was disabled |
| createdOn |  `Date` | Date capability was created |
| updatedOn |  `Date` | Date capability was last updated |
| disabledOn |  `Date` | Optional date capability was disabled |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
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
```
    {{</ tab>}}{{</ tabs>}}




### Requirement

Represents individual and business data necessary to facilitate the enabling of a capability for an account.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | currentlyDue | Array.<[CAPABILITY_REQUIREMENT](#capability_requirement)>| List of required documents and data |
  | errors | Array.<[RequirementError](#requirementerror)>| List of missing requirements |



### RequirementError



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | requirement | Array.<[CAPABILITY_REQUIREMENT](#capability_requirement)>| The unique ID of the missing requirement |
  | errorCode | Array.<[REQUIREMENT_ERROR_CODE](#requirement_error_code)>| List of relevant error codes (for example, `invalid-value`) |




## Enums
### CAPABILITIES

Available capabilities

{{< table >}}
| Value | Description |
| ----- | ----------- |
| TRANSFERS | Account contains minimum requirements to participate in a transfer |
| SEND_FUNDS | Account can be source of a payout transfer |
| COLLECT_FUNDS | Account can be destination of an ACH debit transfer |
| WALLET | Account can top up balance or use as a source for another transfer |
| 1099 | Account has necessary information for 1099-NEC reporting. If requirement not met before $600 in payouts, transfers is disabled. |
{{</ table >}}

### CAPABILITY_STATUS



{{< table >}}
| Value | Description |
| ----- | ----------- |
| ENABLED | Capability is enabled and ready for use |
| DISABLED | Capability has been disabled |
| PENDING | Capability has been requested and is pending approval |
{{</ table >}}

### CAPABILITY_REQUIREMENT



{{< table >}}
| Value | Description |
| ----- | ----------- |
| ACCOUNT_TOS_ACCEPTANCE | Terms of service status |
| INDIVIDUAL_MOBILE | Individual account's mobile number |
| INDIVIDUAL_EMAIL | Individual account's email |
| INDIVIDUAL_EMAIL_OR_MOBILE | Individual account's email or mobile number |
| INDIVIDUAL_FIRSTNAME | Individual account holder's first name |
| INDIVIDUAL_LASTNAME | Individual account holder's last name |
| INDIVIDUAL_ADDRESS | Individual account's address |
| INDIVIDUAL_SSN_LAST4 | Individual account holder's last four of Social Security Number |
| INDIVIDUAL_SSN | Individual account holder's full Social Security Number |
| INDIVIDUAL_BIRTHDATE | Individual account holder's birth date |
| BUSINESS_LEGALNAME | Business's legal name |
| BUSINESS_DESCRIPTION_OR_WEBSITE | Business's description or website |
| BUSINESS_ENTITY_TYPE | Business's entity type |
| BUSINESS_DBA | Business's Doing Business As name |
| BUSINESS_EIN | Business's Employer Identification Number |
| BUSINESS_ADDRESS | Business's address |
| BUSINESS_PHONE | Business's phone number |
| BUSINESS_ADMINS | Business administrators |
| BUSINESS_CONTROLLERS | Business controllers |
| BUSINESS_OWNERS | Business owners |
| BUSINESS_CLASSIFICATION | Business classification |
| BUSINESS_INDUSTRY_CODE_MCC | Business's industry code or merchant category code |
| BANK_ACCOUNTS_NAME | Business's bank account name |
| BANK_ACCOUNTS_ROUTING_NUMBER | Business's bank account routing number |
| BANK_ACCOUNTS_ACCOUNT_NUMBER | Business's bank account number |
| REPRESENTATIVE_MOBILE | Business representative's mobile number |
| REPRESENTATIVE_EMAIL | Business representative's email |
| REPRESENTATIVE_FIRSTNAME | Business representative's first name |
| REPRESENTATIVE_LASTNAME | Business representative's last name |
| REPRESENTATIVE_ADDRESS | Business representative's address |
| REPRESENTATIVE_SSN_LAST4 | Business representative's last four of Social Security Number |
| REPRESENTATIVE_SSN | Business representative's full Social Security Number |
| REPRESENTATIVE_BIRTHDATE | Business representative's birth date |
| REPRESENTATIVE_JOB_TITLE | Business representative's job title |
| REPRESENTATIVE_IS_CONTROLLER | Business representative's controller status |
| REPRESENTATIVE_IS_OWNER | Business representative's owner status |
| REPRESENTATIVE_IS_OWNERSHIP | Business representative's ownership % |
| DOCUMENT | Documents for capability enablement |
{{</ table >}}

### REQUIREMENT_ERROR_CODE



{{< table >}}
| Value | Description |
| ----- | ----------- |
| INVALID_VALUE | Invalid value |
| FAILED_AUTOMATIC_VERIFICATION | Automatic verification failed |
| FAILED_OTHER | Other failure reason |
| INVALID_ADDRESS | Invalid address |
| ADDRESS_RESTRICTED | Address restricted |
| TAX_ID_MISMATCH | Tax ID mismatch |
| DOCUMENT_ID_MISMATCH | Document ID mismatch |
| DOCUMENT_DATE_OF_BIRTH_MISMATCH | Date of birth mismatch |
| DOCUMENT_NAME_MISMATCH | Name mismatch |
| DOCUMENT_ADDRESS_MISMATCH | Address mismatch |
| DOCUMENT_NUMBER_MISMATCH | Number mismatch |
| DOCUMENT_INCOMPLETE | Incomplete document |
| DOCUMENT_FAILED_RISK | Failed risk assessment |
| DOCUMENT_ILLEGIBLE | Illegible document |
| DOCUMENT_UNSUPPORTED | Unsupported document type |
| DOCUMENT_NOT_UPLOADED | Document did not upload |
| DOCUMENT_CORRUPT | Corrupt document |
| DOCUMENT_EXPIRED | Expired document |
{{</ table >}}

