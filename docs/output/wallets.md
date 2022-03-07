---
title: "Wallets"
weight: 100
---


## Get


Get information on a specific Moov wallet (e.g., the available balance).

```javascript
wallets.get(accountID, walletID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request wallet |
| walletID |  `string` | The ID for the wallet associated with an account |
{{</ table >}}



**Returns**

`Promise.<Wallet>`



## List


List the wallets associated with a Moov account.

```javascript
wallets.list(accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to request wallets |
{{</ table >}}



**Returns**

`Promise.<Array.<Wallet>>`






## Types
### WalletBalance

Describes a Moov Wallet Balance

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | currency | `string`| A 3-letter ISO 4217 currency code |
  | value | `number`| Quantity in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99. |



### Wallet

Describes a Moov Wallet

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| walletID |  `string` | Payment Method identifier |
| availableBalance |  [WalletBalance](#walletbalance) | A representation of money containing an integer value and it's currency. |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "walletID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "availableBalance": {
    "currency": "USD",
    "value": 1204
  }
}
```
    {{</ tab>}}{{</ tabs>}}






