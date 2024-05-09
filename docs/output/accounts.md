---
title: "Accounts"
weight: 30
---
Accounts represent a legal entity (either a business or an individual) in Moov. You can create an account for yourself or set up accounts for others. You can retrieve an account to get details on the business or individual account holder, such as an email address or employer identification number (EIN). For more context, read our guides on [Moov accounts](/guides/accounts).


## Create


Create a new connected account.
The `ACCOUNTS_CREATE` scope enum is required when making a request from the browser.

```javascript
accounts.create(account)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| account |  [AccountCreate](#accountcreate) | New account details |
{{</ table >}}



**Returns**

`Promise.<Account>`



## List


Retrieves details for the list of accounts.
The `ACCOUNTS_READ` scope enum is required when making a request from the browser.

```javascript
accounts.list(accountID, criteria)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account to query |
| criteria |  [AccountListCriteria](#accountlistcriteria) | Optional criteria to limit the list returned. |
{{</ table >}}



**Returns**

`Promise.<Array.<Account>>`



## Get


Retrieves details for the account with the specified ID.
The `PROFILE_READ` scope enum is required when making a request from the browser.

```javascript
accounts.get(connectedAccountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| connectedAccountID |  `string` | User account to query |
{{</ table >}}



**Returns**

`Promise.<Account>`



## Update


Updates an existing account. Requires a complete Account object.
The `PROFILE_WRITE` scope enum is required when making a request from the browser.

```javascript
accounts.update(account)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| account |  [Account](#account) | Account to update |
{{</ table >}}



**Returns**

`Promise.<Account>`



## Patch


Updates an existing account. Does not require a complete Account object,
but the `accountID` property is required.
The `PROFILE_WRITE` scope enum is required when making a request from the browser.

```javascript
accounts.patch(account)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| account |  [Account](#account) | Account to update |
{{</ table >}}



**Returns**

`Promise.<Account>`



## GetCountries


Retrieve the specified countries of operation for an account.
The `PROFILE_READ` scope enum is required when making a request from the browser.

```javascript
accounts.getCountries(accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account to query |
{{</ table >}}



**Returns**

`Promise.<Countries>`



## AssignCountries


Assign the countries of operation for an account. This endpoint will always overwrite the previously assigned values.
The `PROFILE_WRITE` scope enum is required when making a request from the browser.

```javascript
accounts.assignCountries(accountID, countries)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account to query |
| countries |  [Countries](#countries) | Countries to add to the account |
{{</ table >}}



**Returns**

`Promise.<Countries>`






## Types
### Account

Describes a Moov account associated with an individual or a business.

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account identifier |
| accountType |  `individual`,  `business` | Type of entity represented by this account |
| displayName |  `string` | Name of individual or business |
| profile |  [Profile](#profile) | Details for individual or business |
| metadata |  `object` | Arbitrary key-value pairs |
| foreignID |  `string` | Optional identification or alias |
| customerSupport |  [CustomerSupport](#customersupport),  `null` | Displayed on credit card transactions (business only) |
| settings |  [AccountSettings](#accountsettings),  `null` | Account settings |
| createdOn |  `string` | Date account was created |
| updatedOn |  `string` | Date account was last updated |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "accountType": "business",
  "profile": {
    "business": {
      "legalBusinessName": "Whole Body Fitness LLC",
      "doingBusinessAs": "Whole Body Fitness",
      "businessType": "llc",
      "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apt 302",
        "city": "Boulder",
        "stateOrProvince": "CO",
        "postalCode": "80301",
        "country": "US"
      },
      "phone": {
        "number": "8185551212",
        "countryCode": "1"
      },
      "email": "amanda@classbooker.dev",
      "website": "www.wholebodyfitnessgym.com",
      "description": "Local fitness center paying out instructors",
      "taxID": {
        "ein": {
          "number": "123-45-6789"
        }
      },
      "industryCodes": {
        "naics": "713940",
        "sic": "7991",
        "mcc": "7997"
      }
    }
  },
  "metadata": {
    "property1": "string",
    "property2": "string"
  },
  "termsOfService": {
    "token": "kgT1uxoMAk7QKuyJcmQE8nqW_HjpyuXBabiXPi6T83fUQoxsyWYPcYzuHQTqrt7YRp4gCwyDQvb6U5REM9Pgl2EloCe35t-eiMAbUWGo3Kerxme6aqNcKrP_6-v0MTXViOEJ96IBxPFTvMV7EROI2dq3u4e-x4BbGSCedAX-ViAQND6hcreCDXwrO6sHuzh5Xi2IzSqZHxaovnWEboaxuZKRJkA3dsFID6fzitMpm2qrOh4"
  },
  "foreignID": "4528aba-b9a1-11eb-8529-0242ac13003",
  "customerSupport": {
    "phone": {
      "number": "8185551212",
      "countryCode": "1"
    },
    "email": "amanda@classbooker.dev",
    "address": {
      "addressLine1": "123 Main Street",
      "addressLine2": "Apt 302",
      "city": "Boulder",
      "stateOrProvince": "CO",
      "postalCode": "80301",
      "country": "US"
    },
    "website": "www.wholebodyfitnessgym.com"
  },
  "settings": {
    "cardPayment": {
      "statementDescriptor": "Whole Body Fitness"
    }
  }
}
```
    {{</ tab>}}{{</ tabs>}}




### AccountCreate



**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| accountType |  `individual`,  `business` | Type of entity represented by this account |
| profile |  [Profile](#profile) | Details for individual or business |
| metadata |  `object` | Arbitrary key-value pairs |
| termsOfService |  [TermsOfServiceToken](#termsofservicetoken),  `null` | An encrypted value used to record acceptance of Moov's Terms of Service |
| foreignID |  `string` | Optional identification or alias |
| customerSupport |  [CustomerSupport](#customersupport),  `null` | Displayed on credit card transactions (business only) |
| settings |  [AccountSettings](#accountsettings),  `null` | Account settings |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "mode": "production",
  "accountType": "business",
  "profile": {
    "individual": {
      "name": {
        "firstName": "Amanda",
        "middleName": "Amanda",
        "lastName": "Yang",
        "suffix": "Jr"
      },
      "phone": {
        "number": "8185551212",
        "countryCode": "1"
      },
      "email": "amanda@classbooker.dev",
      "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apt 302",
        "city": "Boulder",
        "stateOrProvince": "CO",
        "postalCode": "80301",
        "country": "US"
      },
      "birthDate": {
        "day": 9,
        "month": 11,
        "year": 1989
      },
      "governmentID": {
        "ssn": {
          "full": "123-45-6789",
          "lastFour": "6789"
        },
        "itin": {
          "full": "123-45-6789",
          "lastFour": "6789"
        }
      }
    },
    "business": {
      "legalBusinessName": "Whole Body Fitness LLC",
      "doingBusinessAs": "Whole Body Fitness",
      "businessType": "llc",
      "address": {
        "addressLine1": "123 Main Street",
        "addressLine2": "Apt 302",
        "city": "Boulder",
        "stateOrProvince": "CO",
        "postalCode": "80301",
        "country": "US"
      },
      "phone": {
        "number": "8185551212",
        "countryCode": "1"
      },
      "email": "amanda@classbooker.dev",
      "website": "www.wholebodyfitnessgym.com",
      "description": "Local fitness center paying out instructors",
      "taxID": {
        "ein": {
          "number": "123-45-6789"
        }
      },
      "industryCodes": {
        "naics": "713940",
        "sic": "7991",
        "mcc": "7997"
      }
    }
  },
  "metadata": {
    "property1": "string",
    "property2": "string"
  },
  "termsOfService": {
    "token": "kgT1uxoMAk7QKuyJcmQE8nqW_HjpyuXBabiXPi6T83fUQoxsyWYPcYzuHQTqrt7YRp4gCwyDQvb6U5REM9Pgl2EloCe35t-eiMAbUWGo3Kerxme6aqNcKrP_6-v0MTXViOEJ96IBxPFTvMV7EROI2dq3u4e-x4BbGSCedAX-ViAQND6hcreCDXwrO6sHuzh5Xi2IzSqZHxaovnWEboaxuZKRJkA3dsFID6fzitMpm2qrOh4"
  },
  "foreignID": "4528aba-b9a1-11eb-8529-0242ac13003",
  "customerSupport": {
    "phone": {
      "number": "8185551212",
      "countryCode": "1"
    },
    "email": "amanda@classbooker.dev",
    "address": {
      "addressLine1": "123 Main Street",
      "addressLine2": "Apt 302",
      "city": "Boulder",
      "stateOrProvince": "CO",
      "postalCode": "80301",
      "country": "US"
    },
    "website": "www.wholebodyfitnessgym.com"
  },
  "settings": {
    "cardPayment": {
      "statementDescriptor": "Whole Body Fitness"
    }
  }
}
```
    {{</ tab>}}{{</ tabs>}}




### TermsOfServiceToken

A token that can then be used to accept Moov's Terms of Service. Must be generated from a web browser. See the [Moovjs](/moovjs/accounts/accounts/#platform-terms-of-service-agreement) documentation for more details.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | token | `string`| An encrypted value used to record acceptance of Moov's Terms of Service |



### Name

A person's name.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | firstName | `string`| A person's first name |
  | middleName | `string`| A person's middle name |
  | lastName | `string`| A person's last name |
  | suffix | `string`| A person's suffix |



### Profile

Profile for a Moov acocunt. May be business or individual.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | business | [BusinessProfile](#businessprofile)| A business account |
  | individual | [IndividualProfile](#individualprofile)| An individual account |



### BusinessProfile

Describes a business account.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | legalBusinessName | `string`| Business's legal name |
  | doingBusinessAs | `string`| Business's trade name (if different than the legal name) |
  | businessType | `soleProprietorship`,  `unincorporatedAssociation`,  `trust`,  `publicCorporation`,  `privateCorporation`,  `privateCorporation`,  `llc`,  `partnership`,  `unincorporatedNonProfit`,  `incorporatedNonProfit`| The legal registered type of the business |
  | address | [Address](#address)| Business's address |
  | phone | [Phone](#phone)| Business's phone number |
  | email | `string`| Business's email |
  | website | `string`| Business's website |
  | description | `string`| Description of the business |
  | taxIDProvided | `boolean`| `true` if business's tax ID has been provided |
  | representatives | Array.<[Representative](#representative)>|  |
  | ownersProvided | `boolean`| `true` if business owner(s) have been provided |
  | industryCodes | [IndustryCodes](#industrycodes)| Business's industry code (for example, `mcc`) |



### IndividualProfile

Describes the individual associated with a non-business account.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | name | [Name](#name)| Individual's name |
  | phone | [Phone](#phone)| Individual's phone number |
  | email | `string`| Individual's email address |
  | address | [Address](#address)| Individual's address |
  | birthDateProvided | `boolean`| `true` if individual's birth date has been provided |
  | governmentIDProvided | `boolean`| `true` if individual's government-issued ID has been provided |



### Phone



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | number | `string`| Phone number |
  | countryCode | `string`| 1 digit country code |



### IndustryCodes

Standard industry codes for businesses.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | naics | `string`| North American Industry Classification System |
  | sic | `string`| Standard Industry Classification |
  | mcc | `string`| Merchant Category Codes |



### Representative

Describes an individual who represents a business account.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | name | [Name](#name)| Representative's first and last name |
  | phone | [Phone](#phone)| Representative's phone number |
  | email | `string`| Representative's email address |
  | address | [Address](#address)| Representative's address |
  | birthDateProvided | `boolean`| `true` if individual's birth date has been provided |
  | governmentIDProvided | `boolean`| `true` if individual's government-issued ID has been provided |
  | responsibilities | Array.<[Responsibility](#responsibility)>|  |
  | createdOn | `string`| Date representative was recorded |
  | updatedOn | `string`| Date representative was last updated |
  | disabledOn | `string`| Date representative was removed from business |



### Responsibility

Describes the responsibilities associated with a business representative.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | isController | `boolean`| `true` if representative  has significant management responsibilities |
  | isOwner | `boolean`| `true` if representative owns ≥25% of the business |
  | ownershipPercentage | `number`| % of business representative owns (required if `isOwner` is `true`) |
  | jobTitle | `string`| Job title of representative (for example, CEO) |



### CustomerSupport

Describes customer support contact information for a business account.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | phone | [Phone](#phone)| Customer support phone number |
  | email | `string`| Customer support email |
  | address | [Address](#address)| Customer support address |
  | website | `string`| Customer support website |



### AccountSettings



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | cardPayment | [CardPaymentSettings](#cardpaymentsettings)| Card payment settings (business only) |



### CardPaymentSettings



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | statementDescriptor | `string`| Description to display on credit card transactions |



### Countries



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | countries | `Array.<string>`| Countries of operation for an account |



### AccountListCriteria



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | name | [Name](#name)| If provided, this query will attempt to find matches (including partial) against the following Account and Profile fields: Account `displayName`, Individual Profile `firstName`, `middleName`, `lastName`, and `suffix`, and Business Profile `legalBusinessName`, and `doingBusinessAs` |
  | email | `string`| Filter connected accounts by email address. It is not necessary to provided the full email address as partial matches will also be returned. |
  | type | `individual`,  `business`| Filter connected accounts by AccountType. If the `type` parameter is used in combination with name, only the corresponding type's `name` fields will be searched. For example, if `type=business` and `name=moov`, the search will attempt to find matches against the display name and Business Profile name fields (`legalBusinessName`, and `doingBusinessAs`). |
  | foreignID | `string`| Serves as an optional alias from a foreign/external system which can be used to reference this resource |
  | count | `number`| Optional parameter to limit the number of results in the query |
  | skip | `number`| The number of items to offset before starting to collect the result set |



### Address



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | addressLine1 | `string`| Street address |
  | addressLine2 | `string`| Unit number |
  | city | `string`| 25 characters or less |
  | stateOrProvince | `string`| 2 characters |
  | postalCode | `string`| 5 characters |
  | country | `string`| 2 characters |





