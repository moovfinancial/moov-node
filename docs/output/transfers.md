---
title: "Transfers"
weight: 90
---

A transfer is the movement of money between Moov accounts, from source to destination. Provided you have linked a bank account which has been verified, you can initiate a transfer to another Moov account. For more context, read our [guide on transfers](/guides/money-movement).


## Create


Creates a transfer to move money from a source to a destination.

```javascript
transfers.create(transfer)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transfer |  [TransferCreate](#transfercreate) | Subset of the Transfer object |
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
| criteria |  [TransferListCriteria](#transferlistcriteria) |  |
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
| transferID |  `string` |  |
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
| transferID |  `string` |  |
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
transfers.refund(transferID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| transferID |  `string` |  |
{{</ table >}}



**Returns**

`Promise.<TransferResponse>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const { transferID } = moov.transfers.refund("...");
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
| transferID |  `string` |  |
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
| transferID |  `string` |  |
| refundID |  `string` |  |
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
### PaymentMethodAccount

High-level account information associated with a payment method.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | accountID | `string`|  |
  | email | `string`|  |
  | displayName | `string`|  |



### BankAccount



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | bankAccountID | `string`|  |
  | fingerprint | `string`|  |
  | status | `new`,  `verified`,  `verificationFailed`,  `pending`,  `errored`|  |
  | holderName | `string`|  |
  | holderType | `individual`,  `business`|  |
  | bankName | `string`|  |
  | bankAccountType | `checking`,  `savings`,  `unknown`|  |
  | routingNumber | `string`|  |
  | lastFourAccountNumber | `string`|  |



### Wallet



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | walletID | `string`|  |



### CardExpiration



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | month | `string`| Two-character month |
  | year | `string`| Two-character year |



### CardVerification

The results of submitting cardholder data to a card network for verification.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | cvv | `noMatch`,  `match`,  `notChecked`,  `unavailable`|  |
  | addressLine1 | `noMatch`,  `match`,  `notChecked`,  `unavailable`|  |
  | postalCode | `noMatch`,  `match`,  `notChecked`,  `unavailable`|  |



### Card



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | cardID | `string`|  |
  | fingerprint | `string`|  |
  | brand | `American Express`,  `Discover`,  `MasterCard`,  `Visa`|  |
  | cardType | `debit`,  `credit`,  `prepaid`,  `unknown`|  |
  | lastFourCardNumber | `string`|  |
  | bin | `string`|  |
  | expiration | [CardExpiration](#cardexpiration)|  |
  | holderName | `string`|  |
  | billingAddress | [Address](#address)|  |
  | cardVerification | [CardVerification](#cardverification)|  |



### ACHCode

Models the reason for an ACH return or correction.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | code | `string`|  |
  | reason | `string`|  |
  | description | `string`|  |



### ACHDetails



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  |  | `initiated`,  `originated`,  `corrected`,  `returned`,  `completed`|  |
  | traceNumber | `string`|  |
  | return | [ACHCode](#achcode)|  |
  | correction | [ACHCode](#achcode)|  |



### PaymentMethod



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | paymentMethodID | `string`|  |
  | paymentMethodType | `moov-wallet`,  `ach-debit-fund`,  `ach-debit-collect`,  `ach-credit-standard`,  `ach-credit-same-day`,  `rtp-credit`,  `card-payment`|  |
  | account | [PaymentMethodAccount](#paymentmethodaccount)|  |
  | bankAccount | [BankAccount](#bankaccount)|  |
  | wallet | [Wallet](#wallet)|  |
  | card | [Card](#card)|  |
  | achDetails | [ACHDetails](#achdetails)|  |
  | cardDetails | `CardDetails`|  |



### Amount



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | value | `number`| Integer quantity in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99. |
  | currency | `string`| Three-letter ISO 4217 currency code |



### Refund



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | refundID | `string`|  |
  | createdOn | `string`|  |
  | updatedOn | `string`|  |
  | status | `created`,  `pending`,  `completed`,  `failed`|  |
  | amount | [Amount](#amount)|  |



### Transfer



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | transferID | `string`|  |
  | createdAt | `string`|  |
  | status | `created`,  `pending`,  `completed`,  `failed`,  `reversed`|  |
  | source | [PaymentMethod](#paymentmethod)|  |
  | destination | [PaymentMethod](#paymentmethod)|  |
  | amount | [Amount](#amount)|  |
  | description | `string`|  |
  | metadata | `object`| Arbitrary key-value pairs |
  | refundedAmount | [Amount](#amount)|  |
  | refunds | Array.<[Refund](#refund)>|  |
  | facilitatorFee | `object`|  |
  | moovFee | `number`| Integer quantity of Moov fee in USD, so $0.11 would be 11 |



### TransferCreate



**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| source |  [PaymentMethod](#paymentmethod) |  |
| destination |  [PaymentMethod](#paymentmethod) |  |
| amount |  [Amount](#amount) |  |
| facilitatorFee |  `object` |  |
| description |  `string` |  |
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
| transferID |  `string` |  |
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
  | source | `object`|  |
  | source.accountID | `string`|  |
  | source.paymentMethodID | `string`|  |
  | destination | `object`|  |
  | destination.accountID | `string`|  |
  | destination.paymentMethodID | `string`|  |
  | amount | [Amount](#amount)|  |



### TransferOptions



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | paymentMethodID | `string`|  |
  | paymentMethodType | `moov-wallet`,  `ach-debit-fund`,  `ach-debit-collect`,  `ach-credit-standard`,  `ach-credit-same-day`,  `rtp-credit`,  `card-payment`|  |
  | wallet | [Wallet](#wallet)| Populated when `paymentMethodType` is "moov-wallet" |
  | bankAccount | [BankAccount](#bankaccount)| Populated when `paymentMethodType` is one of the ACH or FTP variations |
  | card | [Card](#card)| Populated when `paymentMethodType` is "card-payment" |



### AvailableTransferOptions



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | sourceOptions | Array.<[TransferOptions](#transferoptions)>|  |
  | destinationOptions | Array.<[TransferOptions](#transferoptions)>|  |



### Refund



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | refundID | `string`|  |
  | createdOn | `string`|  |
  | updatedOn | `string`|  |
  | status | `created`,  `pending`,  `completed`,  `failed`|  |
  | amount | [Amount](#amount)|  |





