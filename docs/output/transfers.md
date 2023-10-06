---
title: "Transfers"
weight: 90
---

A transfer is the movement of money between Moov accounts, from source to destination. Provided you have linked a bank account which has been verified, you can initiate a transfer to another Moov account. For more context, read our [guide on transfers](/guides/money-movement).


## Create


Creates a transfer to move money from a source to a destination.

```javascript
transfers.create(transfer, idempotencyKey)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transfer |  [TransferCreate](#transfercreate) | Subset of the Transfer object |
| idempotencyKey |  `string` | Optional UUID to prevent duplicate transfers |
{{</ table >}}



**Returns**

`Promise.<TransferResponse>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const transfer = {
    source: { paymentMethodID: "..." },
    destination: { paymentMethodID: "..." },
    amount: {
      value: 3215, // $32.15
      currency: "USD"
    },
    facilitatorFee: {
      value: 8, // $0.8
      currency: "USD"
    },
    description: "Yoga class"
  };
  const { transferID } = moov.transfers.create(transfer);
} catch (err) {
  // ...
}
```


## List


Lists transfers that match the given criteria.

```javascript
transfers.list(criteria)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| criteria |  [TransferListCriteria](#transferlistcriteria) | Optional properties by which to query and filter a transfer list |
{{</ table >}}



**Returns**

`Promise.<Array.<Transfer>>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const criteria = {
    accountIDs: ["...", "...", ...],
    status: "pending",
    startDateTime: new Date("1/1/2022").toISOString(), // inclusive
    endDateTime: new Date("2/1/2022").toISOString(), // exclusive
    count: 15,
    skip: 15, // start on page 2
  };
  const results = await moov.transfers.list(criteria);
} catch (err) {
  // ...
}
```


## Get


Gets the details of a transfer.

```javascript
transfers.get(transferID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transferID |  `string` | Transfer identifier |
{{</ table >}}



**Returns**

`Promise.<Transfer>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const transfer = await moov.transfers.get("...");
} catch (err) {
  // ...
}
```


## UpdateMetadata


Update the metadata on a transfer.

```javascript
transfers.updateMetadata(transferID, metadata)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transferID |  `string` | Transfer identifier |
| metadata |  `object` | Arbitrary key-value pairs |
{{</ table >}}



**Returns**

`Promise.<Transfer>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const transfer = await moov.transfers.updateMetadata(
    "...",
    { key: "value" }
  );
} catch (err) {
  // ...
}
```


## GetTransferOptions


Gets the available payment options for a transfer.

```javascript
transfers.getTransferOptions(transferOptionsCriteria)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transferOptionsCriteria |  [TransferOptionsCriteria](#transferoptionscriteria) | Criteria for available payment options |
{{</ table >}}



**Returns**

`Promise.<AvailableTransferOptions>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const options = moov.transfers.getTransferOptions({
    source: {
      accountID: "...",
      paymentMethodID: "..."
    },
    destination: {
      accountID: "...",
      paymentMethodID: "..."
    },
    amount: {
      value: 43350, // $433.50
      currency: "USD"
    }
  });
} catch (err) {
  // ...
}
```


## Refund


Initiate a refund for a card transfer.

```javascript
transfers.refund(transferID, idempotencyKey)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transferID |  `string` | Transfer identifier |
| idempotencyKey |  `string` | Optional UUID to prevent duplicate refunds |
{{</ table >}}



**Returns**

`Promise.<TransferResponse>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const { transferID } = moov.transfers.refund(
   "...",
   { amount: 200 } // omit if creating a refund for the full amount
 );
} catch (err) {
  // ...
}
```


## ListRefunds


List refunds for a card transfer.

```javascript
transfers.listRefunds(transferID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transferID |  `string` | Transfer identifier |
{{</ table >}}



**Returns**

`Promise.<Array.<Refund>>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const refunds = moov.transfers.listRefunds("...");
} catch (err) {
  // ...
}
```


## GetRefund


Get details of a specific refund.

```javascript
transfers.getRefund(transferID, refundID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transferID |  `string` | Transfer identifier |
| refundID |  `string` | Refund identifier |
{{</ table >}}



**Returns**

`Promise.<Refund>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const refund = moov.transfers.getRefund("...");
} catch (err) {
  // ...
}
```





## Types
### CardDetails



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | dynamicDescriptor | `string`| An optional override of the default card statement descriptor for a single transfer |
  | transactionSource | `first-recurring`,  `recurring`,  `unscheduled`,  `null`| Enum: [first-recurring recurring unscheduled] Describes how the card transaction was initiated |



### PaymentMethodAccount

High-level account information associated with a payment method.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | accountID | `string`| Payment method identifier |
  | email | `string`| Email associated with the payment method |
  | displayName | `string`| Display name associated with the payment method |



### BankAccount



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | bankAccountID | `string`| Bank Account identifier |
  | fingerprint | `string`| Fingerprint of the bank account |
  | status | `new`,  `verified`,  `verificationFailed`,  `pending`,  `errored`| Bank account status |
  | holderName | `string`| Name of the account holder |
  | holderType | `individual`,  `business`| Type of holder on a funding source |
  | bankName | `string`| Name of the bank |
  | bankAccountType | `checking`,  `savings`,  `unknown`|  |
  | routingNumber | `string`| Bank account routing number |
  | lastFourAccountNumber | `string`| Last four digits of the bank account number |



### Wallet



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | walletID | `string`| Wallet identifier |



### CardExpiration



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | month | `string`| 2 characters |
  | year | `string`| 2 characters |



### CardVerification

The results of submitting cardholder data to a card network for verification.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | cvv | `noMatch`,  `match`,  `notChecked`,  `unavailable`| Card Verification Value |
  | addressLine1 | `noMatch`,  `match`,  `notChecked`,  `unavailable`| Street address |
  | postalCode | `noMatch`,  `match`,  `notChecked`,  `unavailable`| 5 characters |



### Card



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | cardID | `string`| Card identifier |
  | fingerprint | `string`| Fingerprint of the card |
  | brand | `American Express`,  `Discover`,  `MasterCard`,  `Visa`| Card brand |
  | cardType | `debit`,  `credit`,  `prepaid`,  `unknown`| Card type |
  | lastFourCardNumber | `string`| Last four digits of the card number |
  | bin | `string`| Bank Identification Number |
  | expiration | [CardExpiration](#cardexpiration)| The card's expiration date |
  | holderName | `string`| The cardholder's name |
  | billingAddress | [Address](#address)| The billing address associated with the card |
  | cardVerification | [CardVerification](#cardverification)| The results of submitting cardholder data to a card network for verification |



### ACHCode

Models the reason for an ACH return or correction.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | code | `string`| Ach return code (for example, R01) |
  | reason | `string`| The network's reason for the return or correction (for example, insufficient funds) |
  | description | `string`| Explanation of the return code and reason |



### ACHDetails



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | status | `initiated`,  `originated`,  `corrected`,  `returned`,  `completed`| - |
  | traceNumber | `string`| Tracking number that can be used by payment recipient to trace the payment with their external financial institution |
  | return | [ACHCode](#achcode)| ACH return information per Nacha specification |
  | correction | [ACHCode](#achcode)| ACH notification of change information per Nacha specification |



### PaymentMethod



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | paymentMethodID | `string`| Payment method identifier |
  | paymentMethodType | `moov-wallet`,  `ach-debit-fund`,  `ach-debit-collect`,  `ach-credit-standard`,  `ach-credit-same-day`,  `rtp-credit`,  `card-payment`| Allowed payment method types |
  | account | [PaymentMethodAccount](#paymentmethodaccount)| - |
  | bankAccount | [BankAccount](#bankaccount)| Optional bank account object when payment method type is one of `ach-debit-fund`, `ach-debit-collect`, `ach-credit-standard`, or `ach-credit-same-day` |
  | card | [Card](#card)| Optional card object when payment method type is one of `card-payment` or `apple-pay` |
  | wallet | [Wallet](#wallet)| Optional wallet object when payment method type is `moov-wallet` |
  | achDetails | [ACHDetails](#achdetails)| Information about ACH transfers and status details |
  | cardDetails | [CardDetails](#carddetails)| Statement descriptor and recurring flag for card payments |



### Amount



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | value | `number`| Integer quantity in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99. |
  | currency | `string`| 3 letter ISO 4217 currency code |



### Refund



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | refundID | `string`| Refund identifier |
  | createdOn | `string`| Date-time the refund was created on |
  | updatedOn | `string`| Date-time the refund was updated on |
  | status | `created`,  `pending`,  `completed`,  `failed`| Refund status |
  | amount | [Amount](#amount)| Refund amount |



### Transfer



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | transferID | `string`| Transfer identifier |
  | createdAt | `string`| Deprecated (now createdOn) |
  | createdOn | `string`| Date-time the transfer was created on |
  | status | `created`,  `pending`,  `completed`,  `failed`,  `reversed`| Transfer status |
  | source | [PaymentMethod](#paymentmethod)| `paymentMethodID` or `transferID` |
  | destination | [PaymentMethod](#paymentmethod)| `paymentMethodID` |
  | amount | [Amount](#amount)| Transfer amount |
  | description | `string`| Transfer description (128 characters max) |
  | metadata | `object`| Arbitrary key-value pairs |
  | refundedAmount | [Amount](#amount)| The total refunded amount |
  | refunds | Array.<[Refund](#refund)>| Array of refunds associated with the transfer |
  | facilitatorFee | `object`| Total or markup fee |
  | moovFee | `number`| Integer quantity of Moov fee in USD, so $0.11 would be 11 |



### TransferCreate



**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| source |  [PaymentMethod](#paymentmethod) | `paymentMethodID` or `transferID` |
| destination |  [PaymentMethod](#paymentmethod) | `paymentMethodID` |
| amount |  [Amount](#amount) | Transfer amount represented by an integer value and its currency |
| facilitatorFee |  `object` | Total or markup fee |
| description |  `string` | Transfer description (128 characters max) |
| metadata |  `object` | Arbitrary key-value pairs |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "source": {
    "transferID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
    "paymentMethodID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
    "cardDetails": {}
  },
  "destination": {
    "paymentMethodID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43"
  },
  "amount": {
    "currency": "USD",
    "value": 1204
  },
  "facilitatorFee": {
    "total": 0,
    "markup": 0
  },
  "description": "Pay Instructor for May 15 Class",
  "metadata": {
    "property1": "string",
    "property2": "string"
  }
}
```
    {{</ tab>}}{{</ tabs>}}




### TransferResponse



**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| transferID |  `string` | Transfer identifier |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "transferID": "e23de6dd-5168-4e1d-894d-807fa691dc80"
}
```
    {{</ tab>}}{{</ tabs>}}




### TransferListCriteria



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | accountIDs | `Array.<string>`| Optional list of account IDs to filter sources and destinations |
  | status | `string`| Optional transfer status by which to filter the transfers |
  | startDateTime | `string`| Optional date-time which inclusively filters all transfers created after this starting date-time |
  | endDateTime | `string`| Optional date-time which exclusively filters all transfers created before this date-time |
  | count | `number`| Optional parameter to limit the number of results in the query |
  | skip | `number`| Optional number of items to offset before starting to collect the result set |



### TransferOptionsCriteria

Criteria for finding available payment types for a transfer.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | source | `object`| `accountID` or `paymentMethodID` |
  | source.accountID | `string`| `accountID` associated with the transfer source |
  | source.paymentMethodID | `string`| `paymentMethodID` associated with the transfer source |
  | destination | `object`| `accountID` or `paymentMethodID` |
  | destination.accountID | `string`| `accountID` associated with the transfer destination |
  | destination.paymentMethodID | `string`| `paymentMethodID` associated with the transfer destination |
  | amount | [Amount](#amount)| Transfer amount represented by an integer value and its currency |



### TransferOptions



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | paymentMethodID | `string`| `paymentMethodID` associated with a transfer |
  | paymentMethodType | `moov-wallet`,  `ach-debit-fund`,  `ach-debit-collect`,  `ach-credit-standard`,  `ach-credit-same-day`,  `rtp-credit`,  `card-payment`|  |
  | wallet | [Wallet](#wallet)| Populated when `paymentMethodType` is `moov-wallet` |
  | bankAccount | [BankAccount](#bankaccount)| Populated when `paymentMethodType` is one of the ACH or FTP variations |
  | card | [Card](#card)| Populated when `paymentMethodType` is `card-payment` |



### AvailableTransferOptions



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | sourceOptions | Array.<[TransferOptions](#transferoptions)>| Array of available payment methods for the source of a transfer |
  | destinationOptions | Array.<[TransferOptions](#transferoptions)>| Array of available payment methods for the destination of a transfer |



### Refund



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | refundID | `string`| Refund identifier |
  | createdOn | `string`| Date-time the refund was created on |
  | updatedOn | `string`| Date-time the refund was updated on |
  | status | `created`,  `pending`,  `completed`,  `failed`| Refund status |
  | amount | [Amount](#amount)| Refund amount |





