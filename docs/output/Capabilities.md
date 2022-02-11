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

| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilites |
| capabilities |  Array.<[CAPABILITIES](#capabilities)> | One or more capability to request |



**Returns**

`Promise.<Array.<Capability>>`



## Get


Retrieve a capability of an account

```javascript
capabilities.get(accountID, capability)
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilites |
| capability |  [CAPABILITIES](#capabilities) | Capability to retrieve |



**Returns**

`Promise.<Capability>`



## List


List capabilities on an account

```javascript
capabilities.list(accountID)
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilites |



**Returns**

`Promise.<Array.<Capability>>`



## Disable


Disable a capability of an account

```javascript
capabilities.disable(accountID, capability)
```

**Parameters**

| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request capabilites |
| capability |  [CAPABILITIES](#capabilities) | Capability to retrieve |



**Returns**

`Promise.<Capability>`






## Types
### Capability

Describes a Moov capability associated with an account.

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| capability |  [CAPABILITIES](#capabilities) | Type of capability |
| accountID |  `string` | Account identifier |
| status |  [CAPABILITY_STATUS](#capability_status) | The status of the capability requested for an account |
| requirements |  Array.<[Requirement](#requirement)> | Represents individual and business data necessary to facilitate the enabling of a capability for an account |
| disabledReason |  `string` | If status is disabled, the reason this capability was disabled |
| createdOn |  `string` | Date capability was created |
| updatedOn |  `string` | Date capability was last updated |
| disabledOn |  `string` | Optional date capability was disabled |
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
  | currentlyDue | `account.tos-acceptance`,  `individual.mobile`,  `individual.email`,  `individual.email-or-mobile`,  `individual.firstname`,  `individual.lastname`,  `individual.address`,  `individual.ssn-last4`,  `individual.ssn`,  `individual.birthdate`,  `business.legalname`,  `business.description-or-website`,  `business.entity-type`,  `business.dba`,  `business.ein`,  `business.address`,  `business.phone`,  `business.admins`,  `business.controllers`,  `business.owners`,  `business.classification`,  `business.industry-code-mcc`,  `bank-accounts.name`,  `bank-accounts.routing-number`,  `bank-accounts.account-number`,  `representative.{rep-uuid}.mobile`,  `representative.{rep-uuid}.email`,  `representative.{rep-uuid}.firstname`,  `representative.{rep-uuid}.lastname`,  `representative.{rep-uuid}.address`,  `representative.{rep-uuid}.ssn-last4`,  `representative.{rep-uuid}.ssn`,  `representative.{rep-uuid}.birthdate`,  `representative.{rep-uuid}.job-title`,  `representative.{rep-uuid}.is-controller`,  `representative.{rep-uuid}.is-owner`,  `representative.{rep-uuid}.ownership`,  `document.{doc-uuid}`|  |
  | errors | Array.<[RequirementError](#requirementerror)>|  |



### RequirementError



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | requirement | `account.tos-acceptance`,  `individual.mobile`,  `individual.email`,  `individual.email-or-mobile`,  `individual.firstname`,  `individual.lastname`,  `individual.address`,  `individual.ssn-last4`,  `individual.ssn`,  `individual.birthdate`,  `business.legalname`,  `business.description-or-website`,  `business.entity-type`,  `business.dba`,  `business.ein`,  `business.address`,  `business.phone`,  `business.admins`,  `business.controllers`,  `business.owners`,  `business.classification`,  `business.industry-code-mcc`,  `bank-accounts.name`,  `bank-accounts.routing-number`,  `bank-accounts.account-number`,  `representative.{rep-uuid}.mobile`,  `representative.{rep-uuid}.email`,  `representative.{rep-uuid}.firstname`,  `representative.{rep-uuid}.lastname`,  `representative.{rep-uuid}.address`,  `representative.{rep-uuid}.ssn-last4`,  `representative.{rep-uuid}.ssn`,  `representative.{rep-uuid}.birthdate`,  `representative.{rep-uuid}.job-title`,  `representative.{rep-uuid}.is-controller`,  `representative.{rep-uuid}.is-owner`,  `representative.{rep-uuid}.ownership`,  `document.{doc-uuid}`|  |
  | errorCode | `invalid-value`,  `failed-automatic-verification`,  `failed-other`,  `invalid-address`,  `address-restricted`,  `tax-id-mismatch`,  `document-id-mismatch`,  `document-date-of-birth-mismatch`,  `document-name-mismatch`,  `document-address.mismatch`,  `document-number-mismatch`,  `document-incomplete`,  `document-failed-risk`,  `document-illegible`,  `document-unsupported`,  `document-not-uploaded`,  `document-corrupt`,  `document-expired`|  |




## Enums
### CAPABILITIES

Available capabilities

| Value | Description |
| ----- | ----------- |
| TRANSFERS | Account contains minimum requirements to participate in a transfer |
| SEND_FUNDS | Account can be source of a payout transfer |
| COLLECT_FUNDS | Account can be destination of an ACH debit transfer |
| WALLET | Account can top up balance or use as a source for another transfer |
| 1099 | Account has necessary information for 1099-NEC reporting. If requirement not met before $600 in payouts, transfers is disabled. |

### CAPABILITY_STATUS



| Value | Description |
| ----- | ----------- |
| ENABLED | Capability is enabled and ready for use. |
| DISABLED | Capability has been disabled. |
| PENDING | Capability has been requested and is pending approval. |

