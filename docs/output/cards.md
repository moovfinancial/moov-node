---
title: "Cards"
weight: 70
---


## Get


Retrieves details for the card with the specified ID.

```javascript
cards.get(accountID, cardID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account to query |
| cardID |  `string` | Card to query |
{{</ table >}}



**Returns**

`Promise.<Card>`



## List


Lists all the cards associated with a particular Moov account.

```javascript
cards.list(accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account to query |
{{</ table >}}



**Returns**

`Promise.<Array.<Card>>`



## Disable


Disables a card with the specified ID.

```javascript
cards.disable(accountID, cardID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account to query |
| cardID |  `string` | Card to query |
{{</ table >}}



**Returns**

`Promise.<void>`






## Types
### CardExpiration

Card account expiration date

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | month | `string`| 2 character month |
  | year | `string`| 2 character year |



### CardBillingAddress

Card billing address

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | addressLine1 | `string`| string <= 32 characters |
  | addressLine2 | `string`| string <= 32 characters |
  | city | `string`| string <= 24 characters |
  | stateOrProvince | `string`| string <= 2 characters |
  | postalCode | `string`| string <= 5 characters |
  | country | `string`| string <= 2 characters |



### CardVerficationStatuses

Card verification statuses

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | cvv | [CARD_VERIFICATION_STATUS](#card_verification_status)| Verification status of the CVV |
  | addressLine1 | [CARD_VERIFICATION_STATUS](#card_verification_status)| Verification status of addressLine1 |
  | postalCode | [CARD_VERIFICATION_STATUS](#card_verification_status)| Verification status of the postalCode |



### Card

Describes a Card account.

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| cardID |  `string` | Card account identifier |
| fingerprint |  `string` | string <= 100 characters that is a unique fingerprint of a card |
| brand |  [CARD_BRAND](#card_brand) | The card brand |
| cardType |  [CARD_TYPE](#card_type) | The type of the card |
| lastFourCardNumber |  `string` | Last four digits of the card |
| bin |  `string` | The BIN number of the card |
| expiration |  [CardExpiration](#cardexpiration) | The expiration info of the card |
| holderName |  `string` | The name of the card holder |
| billingAddress |  [CardBillingAddress](#cardbillingaddress) | The billing address of the card |
| cardVerfication |  [CardVerficationStatuses](#cardverficationstatuses) | The results of submitting cardholder data to a card network for verification |
| issuer |  `string` | The name of the issuer |
| issuerCountry |  `string` | The country of the issuer |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "cardID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "fingerprint": "9948962d92a1ce40c9f918cd9ece3a22bde62fb325a2f1fe2e833969de672ba3",
  "brand": "American Express",
  "cardType": "debit",
  "lastFourCardNumber": "1234",
  "bin": "123456",
  "expiration": {
    "month": "01",
    "year": "21"
  },
  "holderName": "Jules Jackson",
  "billingAddress": {
    "addressLine1": "123 Main Street",
    "addressLine2": "Apt 302",
    "city": "Boulder",
    "stateOrProvince": "CO",
    "postalCode": "80301",
    "country": "US"
  },
  "cardVerification": {
    "cvv": "match",
    "addressLine1": "match",
    "postalCode": "match"
  },
  "issuer": "GRINGOTTS BANK",
  "issuerCountry": "US"
}
```
    {{</ tab>}}{{</ tabs>}}





## Enums
### CARD_BRAND



{{< table >}}
| Value | Description |
| ----- | ----------- |
| AMEX | American Express |
| DISCOVER | Discover |
| MC | MasterCard |
| VISA | Visa |
{{</ table >}}

### CARD_TYPE



{{< table >}}
| Value | Description |
| ----- | ----------- |
| DEBIT | Debit card |
| CREDIT | Credit card |
| PREPAID | Prepaid card |
| UNKNOWN | Unknown type |
{{</ table >}}

### CARD_VERIFICATION_STATUS



{{< table >}}
| Value | Description |
| ----- | ----------- |
| NO_MATCH | No Match |
| MATCH | Match |
| NOT_CHECKED | Not Checked |
| UNAVAILABLE | Unavailable |
{{</ table >}}

