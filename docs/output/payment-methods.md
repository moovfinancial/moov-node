---
title: "Payment methods"
weight: 80
---
Payments methods represent all of the ways an account can move funds to another Moov account. Payment methods are generated programmatically when a card or bank account is added or the status is updated. For example, `ach-debit-fund` will be added as a payment method once the bank account is verified. For more context, read our guide on [payment methods](/guides/money-movement/payment-methods/).


## Get


Get the specified payment method associated with a Moov account.

```javascript
paymentmethods.get(accountID, paymentMethodID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request bank account |
| paymentMethodID |  `string` | ID of the payment method to retrieve |
{{</ table >}}



**Returns**

`Promise.<PaymentMethod>`



## List


Retrieve all of the payment methods associated with a Moov account.

```javascript
paymentmethods.list(accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request bank account |
{{</ table >}}



**Returns**

`Promise.<Array.<PaymentMethod>>`






## Types
### WalletPaymentType

Wallet Payment Type

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | walletID | `string`| Wallet identifier |



### PaymentMethod

Describes a Payment Method.

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| paymentMethodID |  `string` | Payment Method identifier |
| paymentMethodType |  [PAYMENT_METHODS_TYPE](#payment_methods_type) | Fingerprint of Bank Account |
| wallet |  [WalletPaymentType](#walletpaymenttype) | Optional wallet object when payment method type is 'moov-wallet'. |
| bankAccount |  [BankAccount](#bankaccount) | Optional bank account object when payment method type is one of 'ach-debit-fund', 'ach-debit-collect', ach-credit-standard', or 'ach-credit-same-day'. |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "paymentMethodID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "paymentMethodType": "ach-debit-fund",
  "bankAccount": {
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
}
```
    {{</ tab>}}{{</ tabs>}}





## Enums
### PAYMENT_METHODS_TYPE



{{< table >}}
| Value | Description |
| ----- | ----------- |
| MOOV_WALLET | Moov Wallet Payment Type |
| ACH_DEBIT_FUND | ACH Debt Fund Payment Type |
| ACH_DEBIT_COLLECT | ACH Debt Collect Payment Type |
| ACH_CREDIT_STANDARD | ACH Credit Standard Payment Type |
| ACH_CREDIT_SAME_DAY | ACH Credit Same Day Payment Type |
| CARD | Card Payment Type |
{{</ table >}}

