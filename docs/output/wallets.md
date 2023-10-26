---
title: "Wallets"
weight: 100
---

Every Moov account automatically comes with a Moov wallet, which serves as a funding source as you accumulate funds. 
At this time, wallets can't be manually created, deleted or modified. They are read-only and are automatically created when a Moov account is associated with an application. For more context, read our [wallets](/guides/wallet/) guide.


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



## GetTransaction


Get the details of a wallet transaction.

```javascript
wallets.getTransaction(accountID, walletID, transactionID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | UUID v4 |
| walletID |  `string` | UUID v4 |
| transactionID |  `string` | UUID v4 |
{{</ table >}}



**Returns**

`Promise.<WalletTransaction>`



## ListTransactions


List the transactions in a wallet.

```javascript
wallets.listTransactions(accountID, walletID, criteria)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | UUID v4 |
| walletID |  `string` | UUID v4 |
| criteria |  [WalletTransactionListCriteria](#wallettransactionlistcriteria) | Filtering criteria to limit the results returned. |
{{</ table >}}



**Returns**

`Promise.<Array.<Wallet>>`






## Types
### Wallet

Describes a Moov Wallet

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| walletID |  `string` | UUID v4 |
| availableBalance |  [Amount](#amount) | Balance based on all completed transactions against the wallet. |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "walletID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
  "availableBalance": {
    "currency": "USD",
    "value": 1204 // $12.04
  }
}
```
    {{</ tab>}}{{</ tabs>}}




### WalletTransaction



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | walletID | `string`| UUID v4 |
  | transactionID | `string`| UUID v4 |
  | transactionType | [WALLET_TRANSACTION_TYPE](#wallet_transaction_type)| wallet transaction type. |
  | sourceType | [WALLET_TRANSACTION_SOURCE_TYPE](#wallet_transaction_source_type)| where the transaction originated. |
  | sourceID | `string`| ID of the source Moov object to which this transaction is related. |
  | status | [WALLET_TRANSACTION_STATUS](#wallet_transaction_status)| wallet transaction status. |
  | memo | `string`| Detailed description of the transaction. |
  | createdOn | `string`| Date transaction was created. |
  | completedOn | `string`| Date transaction was completed. |
  | currency | `string`| 3-letter ISO 4217 currency code. |
  | grossAmount | `integer`| The total transaction amount. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99. |
  | fee | `integer`| Total fees paid for the transaction. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99. |
  | netAmount | `integer`| Net amount is the gross amount less fees paid, and the amount that affects the wallet's balance. The amount is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99. |
  | availableBalance | `integer`| The wallet's total available balance after recording a completed transaction. The value is in the smallest unit of the specified currency. In USD this is cents, so $12.04 is 1204 and $0.99 would be 99. |



### WalletTransactionListCriteria



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | transactionType | [WALLET_TRANSACTION_TYPE](#wallet_transaction_type)| Only return transactions of this type. |
  | sourceType | [WALLET_TRANSACTION_SOURCE_TYPE](#wallet_transaction_source_type)| Only return transactions of this source type. |
  | sourceID | `string`| Only return transactions that were part of this transfer ID. |
  | status | [WALLET_TRANSACTION_STATUS](#wallet_transaction_status)| Only return transactions in this state. |
  | createdStartDateTime | `string`| Only return transactions created on or after this datetime. |
  | createdEndDateTime | `string`| Only return transactions created before this datetime. |
  | completedStartDateTime | `string`| Only return transactions completed on or after this datetime. |
  | completedEndDateTime | `string`| Only return transactions completed before this datetime. |
  | count | `number`| Maximum number of transactions to return in results |
  | skip | `number`| Number of transactions to skip before collection results |




## Enums
### WALLET_TRANSACTION_TYPE



{{< table >}}
| Value | Description |
| ----- | ----------- |
| ACH_REVERSAL | When an ach payment is returned, funds are either returned or taken from the wallet balance. |
| CARD_PAYMENT | A payment that was made from a card. |
| CASH_OUT | Transfer of funds out of a wallet to the account’s bank. |
| DISPUTE | When a customer disputes a charge, the disputed amount is debited from the wallet. |
| DISPUTE_REVERSAL | If a dispute is won by a merchant, funds will be credited back to their wallet. |
| FACILITATOR_FEE | Fee earned on a transfer. |
| ISSUING_REFUND | A refund on a purchase from a Moov issued card. |
| ISSUING_TRANSACTION | An authorized purchase from a Moov issued card. |
| ISSUING_TRANSACTION_ADJUSTMENT | If an authorized purchase is captured for more or less than the original authorization amount, an adjustment will be made to reflect the difference. |
| ISSUING_AUTH_RELEASE | Any funds that were not captured from an authorized purchase from a Moov issued card will be released. |
| PAYMENT | An ACH payment from a bank to the account’s wallet. |
| PAYOUT | A payment from a wallet to another accounts bank. |
| REFUND | When a refund is initiated, the requested refund amount is debited from the wallet. |
| REFUND_FAILURE | To account for refund failures, a credit will be made back into the wallet. |
| TOP_UP | Transfer of funds into a wallet from the account’s bank. |
| WALLET_TRANSFER | Funds that move between Moov wallets. |
{{</ table >}}

### WALLET_TRANSACTION_SOURCE_TYPE



{{< table >}}
| Value | Description |
| ----- | ----------- |
| TRANSFER | Transaction was part of a transfer. |
| DISPUTE | Transaction was part of a dispute. |
| ISSUING_TRANSACTION | Transaction was part of an issuing transaction. |
{{</ table >}}

### WALLET_TRANSACTION_STATUS



{{< table >}}
| Value | Description |
| ----- | ----------- |
| PENDING | Transaction has not completed. |
| COMPLETED | Transaction has completed. |
| FAILED | Transaction failed. |
{{</ table >}}

