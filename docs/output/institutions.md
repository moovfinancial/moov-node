---
title: "Institutions"
weight: 110
---
Lookup ACH and wire participating financial institutions. We recommend using this endpoint when an end-user enters a routing number to confirm their bank or credit union.


## GetACHInstitution


Get information on a financial institution for ACH

```javascript
institutions.getACHInstitution(criteria)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| criteria |  [ACHInstitutionSearchCriteria](#achinstitutionsearchcriteria) | Criteria for available search parameters. |
{{</ table >}}



**Returns**

`Promise.<InstitutionParticipants>`



## GetWireInstitution


Get information on a financial institution for WIRE

```javascript
institutions.getWireInstitution(criteria)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| criteria |  [ACHInstitutionSearchCriteria](#achinstitutionsearchcriteria) | Criteria for available search parameters. |
{{</ table >}}



**Returns**

`Promise.<InstitutionParticipants>`



## GetInstitution


Get information on a financial institution

```javascript
institutions.getInstitution(criteria, rail)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| criteria |  [ACHInstitutionSearchCriteria](#achinstitutionsearchcriteria) | Criteria for available search parameters. |
| rail |  `string` | The specific rail to check on, 'ach' or 'wire'. |
{{</ table >}}



**Returns**

`Promise.<InstitutionParticipants>`






## Types
### ACHInstitution

ACH Institution holds a FedACH dir routing record as defined by Fed ACH Format.

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| routingNumber |  `string` | Routing number for an ACH institution |
| officeCode |  `string` | Main/Head Office or Branch. O=main B=branch |
| servicingFRBNumber |  `string` | Servicing Fed's main office routing number |
| recordTypeCode |  `string` | RecordTypeCode The code indicating the ABA number to be used to route or send ACH items to the RDFI - 0 = Institution is a Federal Reserve Bank - 1 = Send items to customer routing number - 2 = Send items to customer using new routing number field |
| revised |  `string` | Revised Date of last revision: YYYYMMDD, or blank |
| newRoutingNumber |  `string` | Institution's new routing number resulting from a merger or renumber |
| customerName |  `string` |  |
| phoneNumber |  `string` |  |
| statusCode |  `string` | Code is based on the customers receiver code |
| viewCode |  `string` | ViewCode is current view |
| location |  [ACHInstitutionLocation](#achinstitutionlocation) | Location is the delivery address |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "routingNumber": "123456789",
  "officeCode": "0",
  "servicingFRBNumber": "123456789",
  "recordTypeCode": "1",
  "revised": "041921",
  "newRoutingNumber": "987654321",
  "customerName": "Main Street Bank",
  "phoneNumber": "123-456-7789",
  "statusCode": "1",
  "viewCode": "1",
  "location": {
    "address": "123 Main Street",
    "city": "Boulder",
    "state": "Colorado",
    "postalCode": "80301",
    "postalCodeExtension": "0000"
  }
}
```
    {{</ tab>}}{{</ tabs>}}




### ACHInstitutionLocation

ACH Institution Location object.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | address | `string`| Up to 32 characters |
  | city | `string`| Up to 24 characters |
  | state | `string`| Up to 24 characters |
  | postalCode | `string`| Up to 5 characters |
  | postalCodeExtension | `string`| Up to 4 characters |



### ACHInstitutionSearchCriteria

ACH Institution search criteria

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | name | `string`| Optional financial institution name to search |
  | routingNumber | `string`| Optional routing number for a financial institution to search |
  | count | `string`| Optional parameter to limit the amount of results in the query |
  | skip | `string`| Optional The number of items to offset before starting to collect the result set |



### WireInstitution

Wire Institution holds a FedWIRE dir routing record as defined by Fed WIRE Format

**Properties**


{{< tabs>}}
  {{< tab title="Details">}}
  {{< table >}}
| Property | Type | Description |
| ---- | ---- | ----------- |
| routingNumber |  `string` | Routing number for an Wire institution |
| telegraphicName |  `string` | The short name of financial institution |
| customerName |  `string` |  |
| location |  [WireInstitutionLocation](#wireinstitutionlocation) | Location is the delivery address |
| fundsTransferStatus |  `string` | Designates funds transfer status  - Y - Eligible  - N - Ineligible |
| fundsSettlementOnlyStatus |  `string` | Designates funds settlement only status  - S - Settlement-Only |
| bookEntrySecuritiesTransferStatus |  `string` | Designates book entry securities transfer status |
| date |  `string` | Date of last revision: YYYYMMDD, or blank |
{{</ table >}}
  {{< /tab>}}
{{< tab title="Example">}}
```javascript
{
  "routingNumber": "123456789",
  "telegraphicName": "MN STR BNK",
  "customerName": "Main Street Bank",
  "location": {
    "city": "Boulder",
    "state": "Colorado"
  },
  "fundsTransferStatus": "Y",
  "fundsSettlementOnlyStatus": " ",
  "bookEntrySecuritiesTransferStatus": "Y",
  "date": "20000222"
}
```
    {{</ tab>}}{{</ tabs>}}




### WireInstitutionLocation

Wire Institution Location object.

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | city | `string`| Up to 24 characters |
  | state | `string`| Up to 24 characters |



### InstitutionParticipants

ACH and Wire Institution participants

**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | achParticipants | Array.<[ACHInstitution](#achinstitution)>|  |
  | wireParticipants | Array.<[WireInstitution](#wireinstitution)>|  |





