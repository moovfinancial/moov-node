---
title: "Node SDK"
weight: 10
---

## Overview

This Node SDK provides access to Moov's API from applications written in server-side JavaScript. Use this library to reduce the lines of code needed interact with our platform, saving time and allowing you to move money faster.

## Installation
You can download and install the Node SDK from npm.
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

Read more on [accounts](accounts) in the Moov Node SDK.

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


### Avatars

```javascript
moov.avatars
```

Read more on [avatars](avatars) in the Moov Node SDK.

Gets the Avatars API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.avatars.get(...);
} catch (err) {
  // ...
}
```


### BankAccounts

```javascript
moov.bankAccounts
```

Read more on [bankAccounts](bankAccounts) in the Moov Node SDK.

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

Read more on [capabilities](capabilities) in the Moov Node SDK.

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


### Cards

```javascript
moov.cards
```

Read more on [cards](cards) in the Moov Node SDK.

Gets the Cards API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.cards.list(...);
} catch (err) {
  // ...
}
```


### EnrichedAddresses

```javascript
moov.enrichedAddresses
```

Read more on [enrichedAddresses](enrichedAddresses) in the Moov Node SDK.

Gets the Enriched Address API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.enrichedAddresses.get(...);
} catch (err) {
  // ...
}
```


### EnrichedProfiles

```javascript
moov.enrichedProfiles
```

Read more on [enrichedProfiles](enrichedProfiles) in the Moov Node SDK.

Gets the Enriched Profile API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.enrichedProfiles.get(...);
} catch (err) {
  // ...
}
```


### PaymentMethods

```javascript
moov.paymentMethods
```

Read more on [paymentMethods](paymentMethods) in the Moov Node SDK.

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


### Institutions

```javascript
moov.institutions
```

Read more on [institutions](institutions) in the Moov Node SDK.

Gets the Institutions API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.institutions.getACHInstitution(...);
} catch (err) {
  // ...
}
```


### Representatives

```javascript
moov.representatives
```

Read more on [representatives](representatives) in the Moov Node SDK.

Gets the Representatives API.

 

**Examples**

```javascript
const moov = new Moov(...);
try {
  await moov.representatives.create(...);
} catch (err) {
  // ...
}
```


### Transfers

```javascript
moov.transfers
```

Read more on [transfers](transfers) in the Moov Node SDK.

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

Read more on [wallets](wallets) in the Moov Node SDK.

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







