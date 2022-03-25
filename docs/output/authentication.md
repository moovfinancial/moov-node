---
title: "Authentication"
weight: 20
---


## GenerateToken


Generates an OAuth token required by Moov API requests. For more on our authentication protocol, read our [quick start guide](/guides/quick-start/#create-an-access-token).

```javascript
moov.generateToken(scopes, accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| scopes |  Array.<[SCOPES](#scopes)> | One or more permissions to request |
| accountID |  `string` | Account on which to request permissions, default is faciliator account ID |
{{</ table >}}



**Returns**

`Promise.<Token>`

You only need call this function when generating tokens for [Moov.js](/moovjs) and
[Moov Drops](/moovjs/drops). The other functions in this library generate tokens for you
automatically.

**Examples**

```javascript
const moov = new Moov(...);
const token = await moov.generateToken([
  SCOPES.ACCOUNTS_CREATE,
  SCOPES.PING
]);
```


## Ping


Pings the Moov servers to check for connectivity.
Read more about [/ping](/api/#tag/Ping).

```javascript
moov.ping()
```





**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.ping();
  // Ping succeeded
} catch (err) {
  // Ping failed
}
```



## Types
### Token

OAuth2 token returned by `Moov.generateToken()`. Use `Token.token` in Moov.js
and client-side code to make calls to the Moov API.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | token | `string`| String token required by Moov API requests |
  | expiresOn | `Date`| Date and time when the token expires |
  | refreshToken | `string`| String used to refresh this token |




## Enums
### SCOPES

Available scopes to request on OAuth tokens.

{{< table >}}
| Value | Description |
| ----- | ----------- |
| ACCOUNTS_CREATE | Allows a new Moov account to be created |
| ACCOUNTS_READ | Access to view Moov accounts |
| BANK_ACCOUNTS_READ | Access to view a linked bank account to a Moov account |
| BANK_ACCOUNTS_WRITE | Access to add a linked bank account to a Moov account |
| CARDS_READ | Access to view a linked card on a Moov account |
| CARDS_WRITE | Access add a linked card to a Moov account |
| CAPABILITIES_READ | Access to view capabilities, determining what actions the account can do |
| CAPABILITIES_WRITE | Access to request capabilities, determining what actions the account can do |
| DOCUMENTS_READ | Access to view documents (like I-9s, W-4s) associated with a Moov account |
| DOCUMENTS_WRITE | Access to upload documents (like I-9s, W-4s) associated with a Moov account |
| PAYMENT_METHODS_READ | Access to view payment methods for the account specified |
| PROFILE_ENRICHMENT_READ | Access to view a Moov account’s profile image |
| PROFILE_READ | Access to view details associated with a Moov account |
| PROFILE_WRITE | Access to edit details associated with a Moov account |
| REPRESENTATIVE_READ | Access to view details on business representatives for a Moov account |
| REPRESENTATIVE_WRITE | Access to add details on business representatives for a Moov account |
| TRANSFERS_READ | Access to view transfers |
| TRANSFERS_WRITE | Access to move money by creating transfers |
| WALLETS_READ | Access to view the balance on an account’s Moov wallet |
| FED_READ | Allows a developer to use the institutions lookup service to look up a bank name by routing number |
| PING | Ping Moov servers to test for connectivity |
{{</ table >}}

