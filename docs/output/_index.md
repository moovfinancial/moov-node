---
title: "Node SDK"
weight: 10
---

## Installation
You can download and install the node SDK from npm
```
npm i @moovio@node
```

Then import it into your project. 
```javascript
import { Moov } from "@moovio/node";
```

## Moov


Initializes a new instance of the Moov API client.

```javascript
new Moov(credentials, gotOptionsOrInstance)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| credentials |  `object` | API key credentials |
| credentials.accountID |  `string` | Facilitator account ID |
| credentials.publicKey |  `string` | Public key value from API key |
| credentials.secretKey |  `string` | Secret key value from API key |
| credentials.domain |  `string` | One of the domains from API key |
| gotOptionsOrInstance |  `object` | Customized Got options or instance. See [docs](https://github.com/sindresorhus/got). |
{{</ table >}}




Get the information for the `credentials` parameter from the Moov
Dashboard.

Moov uses the [Got](https://github.com/sindresorhus/got) HTTP client
library. If you need to access or customize the request-response pipeline,
then provide customized options or an instance in the `gotOptionsOrInstance` parameter.

**Examples**

```javascript
const moov = new Moov({
  accountID: "...",
  publicKey: "...",
  secretKey: "...",
  domain: "...",
});
```




### Accounts

```javascript
moov.accounts
```

More on [accounts](accounts).

Gets the Accounts API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.accounts.create(...);
} catch (err) {
  // ...
}
```


### BankAccounts

```javascript
moov.bankAccounts
```

More on [bankAccounts](bankAccounts).

Gets the Bank Accounts API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.bankAccounts.link(...);
} catch (err) {
  // ...
}
```


### Capabilities

```javascript
moov.capabilities
```

More on [capabilities](capabilities).

Gets the Capabilities API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.capabilities.requestCapabilities(...);
} catch (err) {
  // ...
}
```


### PaymentMethods

```javascript
moov.paymentMethods
```

More on [paymentMethods](paymentMethods).

Gets the Payment Methods API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.paymentMethods.get(...);
} catch (err) {
  // ...
}
```


### Transfers

```javascript
moov.transfers
```

More on [transfers](transfers).

Gets the Transfers API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.transfers.create(...);
} catch (err) {
  // ...
}
```


### Wallets

```javascript
moov.wallets
```

More on [wallets](wallets).

Gets the Wallets API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.wallets.get(...);
} catch (err) {
  // ...
}
```







