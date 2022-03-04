---
title: "BankAccounts"
weight: 0
---


## Link


Link a bank account to a Moov account

```javascript
bankaccounts.link(accountID, bankAccount, plaidToken, mxAuthorizationCode)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to add the bank account |
| bankAccount |  [BankAccountAdd](#bankaccountadd) | Optional bank account details |
| plaidToken |  `string` | Optional Plaid processor token |
| mxAuthorizationCode |  `string` | Optional Plaid processor authorization code |
{{</ table >}}



**Returns**

`Promise.<BankAccount>`



## Get


Retrieve bank account details (i.e. routing number or account type) associated with a specific Moov account.

```javascript
bankaccounts.get(accountID, bankAccountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request bank account |
| bankAccountID |  `string` | ID of the bank account to retrieve |
{{</ table >}}



**Returns**

`Promise.<BankAccount>`



## List


List all the bank accounts associated with a particular Moov account.

```javascript
bankaccounts.list(accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request bank account |
{{</ table >}}



**Returns**

`Promise.<Array.<BankAccount>>`



## Disable


Discontinue using a specified bank account linked to a Moov account.

```javascript
bankaccounts.disable(accountID, bankAccountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request bank account |
| bankAccountID |  `string` | ID of the bank account to disable |
{{</ table >}}



**Returns**

`Promise`



## InitMicroDeposits


Discontinue using a specified bank account linked to a Moov account.

```javascript
bankaccounts.initMicroDeposits(accountID, bankAccountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request bank account |
| bankAccountID |  `string` | ID of the bank account to disable |
{{</ table >}}



**Returns**

`Promise`



## InitMicroDeposits


Complete the micro-deposit validation process by passing the amounts of the two transfers.

```javascript
bankaccounts.initMicroDeposits(accountID, bankAccountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request bank account |
| bankAccountID |  `string` | ID of the bank account to disable |
{{</ table >}}



**Returns**

`Promise`






## Types
### BankAccount

Describes a Moov capability associated with an account.

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| bankAccountID |  `string` | Bank Account identifier |
| fingerprint |  `string` | Fingerprint of Bank Account |
| status |  [BANK_ACCOUNT_STATUS](#bank_account_status) | The bank account status |
| holderName |  `string` | Name of the bank account holder |
| holderType |  [BANK_ACCOUNT_HOLDER_TYPE](#bank_account_holder_type) | The type of holder on a funding source |
| bankName |  `string` | Name of the bank |
| bankAccountType |  [BANK_ACCOUNT_TYPE](#bank_account_type) | The bank account type |
| routingNumber |  `string` | Bank account routing number |
| lastFourAccountNumber |  `string` | Last four digits of the bank account number |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "bankAccountID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "fingerprint": "9948962d92a1ce40c9f918cd9ece3a22bde62fb325a2f1fe2e833969de672ba3",
  "status": "new",
  "holderName": "Jules Jackson",
  "holderType": "individual",
  "bankName": "Chase Bank",
  "bankAccountType": "checking",
  "routingNumber": "string",
  "lastFourAccountNumber": "7000"
}
```
    {{</ tab>}}{{</ tabs>}}




### BankAccountAdd

Describes a Bank Account to be added.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | holderName | `string`| Name of the bank account holder |
  | holderType | [BANK_ACCOUNT_HOLDER_TYPE](#bank_account_holder_type)| The type of holder on a funding source |
  | routingNumber | `string`| Bank account routing number |
  | accountNumber | `string`| The bank account number |
  | bankAccountType | [BANK_ACCOUNT_TYPE](#bank_account_type)| The bank account type |




## Enums
### BANK_ACCOUNT_STATUS



{{< table >}}
| Value | Description |
| ----- | ----------- |
| NEW | Bank Account is created and waiting on verification. |
| VERIFIED | Bank Account is verified and ready for use. |
| VERIFICATION_FAILED | Bank Account verfiication failed. |
| PENDING | Bank Account is pending approval. |
| ERRORED | Bank Account is in an errored state. |
{{</ table >}}

### BANK_ACCOUNT_HOLDER_TYPE



{{< table >}}
| Value | Description |
| ----- | ----------- |
| INDIVIDUAL | Bank Account holder is a type of individual. |
| BUSINESS | Bank Account holder is a type of individual. |
{{</ table >}}

### BANK_ACCOUNT_TYPE



{{< table >}}
| Value | Description |
| ----- | ----------- |
| CHECKING | Bank Account is a type of checking. |
| SAVINGS | Bank Account is a type of savings. |
| UNKNOWN | Bank Account is a type of unknown. |
{{</ table >}}

