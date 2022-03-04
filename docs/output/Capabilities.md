---
title: "Capabilities"
weight: 50
---


## RequestCapabilities


Request a capability to be added to an account

```javascript
capabilities.requestCapabilities(accountID, capabilities)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilites |
| capabilities |  Array.<[CAPABILITIES](#capabilities)> | One or more capability to request |
{{</ table >}}



**Returns**

`Promise.<Array.<Capability>>`



## Get


Retrieve a capability of an account

```javascript
capabilities.get(accountID, capability)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilites |
| capability |  [CAPABILITIES](#capabilities) | Capability to retrieve |
{{</ table >}}



**Returns**

`Promise.<Capability>`



## List


List capabilities on an account

```javascript
capabilities.list(accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilites |
{{</ table >}}



**Returns**

`Promise.<Array.<Capability>>`



## Disable


Disable a capability of an account

```javascript
capabilities.disable(accountID, capability)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilites |
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

Represents individual and business data necessary to facilitate the enabling of a capability for an account

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | currentlyDue | Array.<[CAPABILITY_REQUIREMENT](#capability_requirement)>|  |
  | errors | Array.<[RequirementError](#requirementerror)>|  |



### RequirementError



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | requirement | Array.<[CAPABILITY_REQUIREMENT](#capability_requirement)>|  |
  | errorCode | Array.<[REQUIREMENT_ERROR_CODE](#requirement_error_code)>|  |




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
| ENABLED | Capability is enabled and ready for use. |
| DISABLED | Capability has been disabled. |
| PENDING | Capability has been requested and is pending approval. |
{{</ table >}}

### CAPABILITY_REQUIREMENT



{{< table >}}
| Value | Description |
| ----- | ----------- |
| ACCOUNT_TOS_ACCEPTANCE |  |
| INDIVIDUAL_MOBILE |  |
| INDIVIDUAL_EMAIL |  |
| INDIVIDUAL_EMAIL_OR_MOBILE |  |
| INDIVIDUAL_FIRSTNAME |  |
| INDIVIDUAL_LASTNAME |  |
| INDIVIDUAL_ADDRESS |  |
| INDIVIDUAL_SSN_LAST4 |  |
| INDIVIDUAL_SSN |  |
| INDIVIDUAL_BIRTHDATE |  |
| BUSINESS_LEGALNAME |  |
| BUSINESS_DESCRIPTION_OR_WEBSITE |  |
| BUSINESS_ENTITY_TYPE |  |
| BUSINESS_DBA |  |
| BUSINESS_EIN |  |
| BUSINESS_ADDRESS |  |
| BUSINESS_PHONE |  |
| BUSINESS_ADMINS |  |
| BUSINESS_CONTROLLERS |  |
| BUSINESS_OWNERS |  |
| BUSINESS_CLASSIFICATION |  |
| BUSINESS_INDUSTRY_CODE_MCC |  |
| BANK_ACCOUNTS_NAME |  |
| BANK_ACCOUNTS_ROUTING_NUMBER |  |
| BANK_ACCOUNTS_ACCOUNT_NUMBER |  |
| REPRESENTATIVE_MOBILE |  |
| REPRESENTATIVE_EMAIL |  |
| REPRESENTATIVE_FIRSTNAME |  |
| REPRESENTATIVE_LASTNAME |  |
| REPRESENTATIVE_ADDRESS |  |
| REPRESENTATIVE_SSN_LAST4 |  |
| REPRESENTATIVE_SSN |  |
| REPRESENTATIVE_BIRTHDATE |  |
| REPRESENTATIVE_JOB_TITLE |  |
| REPRESENTATIVE_IS_CONTROLLER |  |
| REPRESENTATIVE_IS_OWNER |  |
| REPRESENTATIVE_IS_OWNERSHIP |  |
| DOCUMENT |  |
{{</ table >}}

### REQUIREMENT_ERROR_CODE



{{< table >}}
| Value | Description |
| ----- | ----------- |
| INVALID_VALUE |  |
| FAILED_AUTOMATIC_VERIFICATION |  |
| FAILED_OTHER |  |
| INVALID_ADDRESS |  |
| ADDRESS_RESTRICTED |  |
| TAX_ID_MISMATCH |  |
| DOCUMENT_ID_MISMATCH |  |
| DOCUMENT_DATE_OF_BIRTH_MISMATCH |  |
| DOCUMENT_NAME_MISMATCH |  |
| DOCUMENT_ADDRESS_MISMATCH |  |
| DOCUMENT_NUMBER_MISMATCH |  |
| DOCUMENT_INCOMPLETE |  |
| DOCUMENT_FAILED_RISK |  |
| DOCUMENT_ILLEGIBLE |  |
| DOCUMENT_UNSUPPORTED |  |
| DOCUMENT_NOT_UPLOADED |  |
| DOCUMENT_CORRUPT |  |
| DOCUMENT_EXPIRED |  |
{{</ table >}}

