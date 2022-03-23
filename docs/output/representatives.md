---
title: "Representatives"
weight: 40
---


## Create


Create representative

```javascript
representatives.create(accountID, representative)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to add representative |
| representative |  [RepresentativeCreateUpdate](#representativecreateupdate) | Representative to add |
{{</ table >}}



**Returns**

`Promise.<Representative>`



## List


List representatives

```javascript
representatives.list(accountID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to add representative |
{{</ table >}}



**Returns**

`Promise.<Array.<Representative>>`



## Get


Retrieve a specific representative associated with a given Moov account.

```javascript
representatives.get(accountID, representativeID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to add representative |
| representativeID |  `string` | Identifier of representative to retrieve |
{{</ table >}}



**Returns**

`Promise.<Representative>`



## Delete


Deletes a business representative associated with a Moov account.

```javascript
representatives.delete(accountID, representativeID)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to add representative |
| representativeID |  `string` | Identifier of representative to retrieve |
{{</ table >}}



**Returns**

`Promise.<void>`



## Update


Update a specific representative.

```javascript
representatives.update(accountID, representativeID, representative)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| accountID |  `string` | Account on which to add representative |
| representativeID |  `string` | Identifier of representative to retrieve |
| representative |  [RepresentativeCreateUpdate](#representativecreateupdate) | Representative to add |
{{</ table >}}



**Returns**

`Promise.<Representative>`






## Types
### Representative

Describes an individual who represents the business.

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| representativeID |  `string` | Representative identifier |
| name |  [RepresentativeName](#representativename) | Name for an individual |
| phone |  [RepresentativePhone](#representativephone) | Phone for an individual |
| email |  `string` | Email Address.  string <email> <= 255 characters |
| address |  [RepresentativeAddress](#representativeaddress) | Address for an individual. |
| birthDateProvided |  `boolean` | Indicates whether this Representative's birth date has been provided |
| governmentIDProvided |  `boolean` | Indicates whether a government ID (SSN, ITIN, etc.) has been provided for this Representative |
| responsibilities |  [RepresentativeResponsibilities](#representativeresponsibilities) | Describes the job responsibilities of an individual |
| createdOn |  `Date` | Date Representative was created |
| updatedOn |  `Date` | Date Representative was last updated |
| disabledOn |  `Date` | Optional date Representative was disabled |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "representativeID": "ec7e1848-dc80-4ab0-8827-dd7fc0737b43",
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
  "birthDateProvided": false,
  "governmentIDProvided": false,
  "responsibilities": {
    "isController": false,
    "isOwner": true,
    "ownershipPercentage": 38,
    "jobTitle": "CEO"
  },
  "createdOn": "2019-08-24T14:15:22Z",
  "updatedOn": "2019-08-24T14:15:22Z",
  "disabledOn": "2019-08-24T14:15:22Z"
}
```
    {{</ tab>}}{{</ tabs>}}




### RepresentativeName

Representative name

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | firstName | `string`| Name this person was given. This is usually the same as first name.  string <= 64 characters |
  | middleName | `string`| Name this person was given. This is usually the same as middle name.  string <= 64 characters |
  | lastName | `string`| Family name of this person. This is usually the same as last name.  string <= 64 characters |
  | suffix | `string`| Suffix of a given name.  string <= 20 characters |



### RepresentativePhone

Representative phone

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | number | `string`| string <phone> <= 10 characters |
  | countryCode | `string`| string <= 1 characters |



### RepresentativeAddress



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | addressLine1 | `string`| string <= 32 characters |
  | addressLine2 | `string`| string <= 32 characters |
  | city | `string`| string <= 24 characters |
  | stateOrProvince | `string`| string <= 2 characters |
  | postalCode | `string`| string <= 5 characters |
  | country | `string`| string <= 2 characters |



### RepresentativeResponsibilities



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | isController | `boolean`| Indicates whether this individual has significant management responsibilities within the business |
  | isOwner | `boolean`| Indiciates whether this individual has an ownership stake of at least 25% in the business |
  | ownershipPercentage | `number`| The percentage of ownership this individual has in the business (required if `isOwner` is `true`) |
  | jobTitle | `string`| string <= 64 characters |



### RepresentativeCreateUpdate



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | name | [RepresentativeName](#representativename)| Name for an individual |
  | phone | [RepresentativePhone](#representativephone)| Phone for an individual |
  | email | `string`| Email Address.  string <email> <= 255 characters |
  | address | [RepresentativeAddress](#representativeaddress)| Address for an individual. |
  | birthDateProvided | `boolean`| Indicates whether this Representative's birth date has been provided |
  | governmentIDProvided | `boolean`| Indicates whether a government ID (SSN, ITIN, etc.) has been provided for this Representative |
  | responsibilities | [RepresentativeResponsibilities](#representativeresponsibilities)| Describes the job responsibilities of an individual |





