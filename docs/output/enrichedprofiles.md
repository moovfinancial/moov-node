---
title: "EnrichedProfiles"
weight: 0
---


## Get


Gets enriched profile data.

```javascript
enrichedprofiles.get(email)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| email |  `string` | Email address associated with the profile. |
{{</ table >}}



**Returns**

`Promise.<EnrichedProfile>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const enrichedProfile = moov.enrichedProfiles.get("employee@business.com");
} catch (err) {
  // ..
}
```





## Types
### EnrichedProfile



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | individual | [EnrichedIndividualProfile](#enrichedindividualprofile)| Describes a person |
  | business | [EnrichedBusinessProfile](#enrichedbusinessprofile)| Describes a company |



### EnrichedBusinessProfile



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | legalBusinessName | `string`|  |
  | address | [EnrichedProfileAddress](#enrichedprofileaddress)|  |
  | email | `string`|  |
  | phone | [EnrichedProfilePhone](#enrichedprofilephone)|  |
  | industryCodes | [EnrichedProfileIndustry](#enrichedprofileindustry)| Describes industry specific identifiers |
  | website | `string`|  |



### EnrichedIndividualProfile



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | name | [EnrichedProfileName](#enrichedprofilename)|  |
  | email | `string`|  |
  | address | [EnrichedProfileAddress](#enrichedprofileaddress)|  |



### EnrichedProfileAddress



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | addressLine1 | `string`|  |
  | addressLine2 | `string`|  |
  | city | `string`|  |
  | stateOrProvince | `string`|  |
  | postalCode | `string`|  |
  | country | `country`|  |



### EnrichedProfileIndustry



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | naics | `string`|  |
  | sic | `string`|  |



### EnrichedProfileName



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | firstName | `string`|  |
  | middleName | `string`|  |
  | lastName | `string`|  |
  | suffix | `string`|  |



### EnrichedProfilePhone



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | number | `string`|  |
  | countryCode | `string`|  |





