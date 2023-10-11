---
title: "Enrichment"
weight: 120
---

Access different enrichment data such as address suggestions or profile data. Our profile enrichment service is offered in collaboration with Clearbit.


## Get


Gets enriched address suggestions.

```javascript
enrichedaddresses.get(criteria)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| criteria |  [EnrichedAddressGetCriteria](#enrichedaddressgetcriteria) | Criteria for available search parameters |
{{</ table >}}



**Returns**

`Promise.<Array.<EnrichedAddress>>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const suggestedAddresses = moov.enrichedAddresses.get({
    search: "123 Fake St",
    includeCities: "Springfield"
    // ...
  });
} catch (err) {
  // ...
}
```




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
### EnrichedAddress



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | addressLine1 | `string`| Street address |
  | addressLine2 | `string`| Unit number |
  | city | `string`| 25 characters or less |
  | stateOrProvince | `string`| 2 characters |
  | postalCode | `string`| 5 characters |
  | entries | `number`| The number of addresses matching the search criteria |



### EnrichedAddressGetCriteria



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | search | `string`| Partial or complete address to search |
  | maxResults | `number`| Optional Maximum number of results to return |
  | includeCities | `string`| Optional - Limits results to a list of given cities (example, "chicago;honolulu;portland") |
  | includeStates | `string`| Optional - Limits results to a list of given states (example, "illinois;hawaii;oregon") |
  | includeZipcodes | `string`| Optional - Limits results to a list of given ZIP codes (example, "60412;96818;97209") |
  | excludeStates | `string`| Optional - Exclude list of states from results. No include parameters may be used with this parameter. Example: "AZ;WA;SC" |
  | preferCities | `string`| Optional-  Display results with the listed cities at the top (example, "denver;aurora;omaha") |
  | preferStates | `string`| Optional - Display results with the listed states at the top (example, "CO;MN;WI") |
  | preferZipcodes | `string`| Optional - Display results with the listed ZIP codes at the top (example, "60412;96818;97209") |
  | preferRatio | `number`| Optional - Specifies the percentage of address suggestions that should be preferred and will appear at the top of the results |
  | preferGeolocation | `none`,  `city`| Optional - If omitted or set to city it uses the sender's IP address to determine location, then automatically adds the city and state to the preferCities value (example: "city"). This parameter takes precedence over other include or exclude parameters meaning that if it is not set to none you may see addresses from areas you do not wish to see. |
  | selected | `string`| Optional - Useful for narrowing results with `addressLine2` suggestions such as Apt. Denotes an apartment building with multiple residences (example, "Apt"). |
  | source | `all`,  `postal`| Optional - Include results from alternate data sources. Allowed values are `all` (non-postal addresses) or `postal` (postal addresses only). |



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
  | legalBusinessName | `string`| Business's legal name |
  | address | [EnrichedProfileAddress](#enrichedprofileaddress)| Business's address |
  | email | `string`| Business's email |
  | phone | [EnrichedProfilePhone](#enrichedprofilephone)| Business's phone |
  | industryCodes | [EnrichedProfileIndustry](#enrichedprofileindustry)| Describes industry specific identifiers |
  | website | `string`| Business's website |



### EnrichedIndividualProfile



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | name | [EnrichedProfileName](#enrichedprofilename)| Individual's name |
  | email | `string`| Individual's email |
  | address | [EnrichedProfileAddress](#enrichedprofileaddress)| Individual's address |



### EnrichedProfileAddress



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | addressLine1 | `string`| Street address |
  | addressLine2 | `string`| Unit number |
  | city | `string`| 25 characters or less |
  | stateOrProvince | `string`| 2 characters |
  | postalCode | `string`| 5 characters |
  | country | `string`| 2 characters |



### EnrichedProfileIndustry



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | naics | `string`| North American Industry Classification System |
  | sic | `string`| Standard Industrial Classification |



### EnrichedProfileName



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | firstName | `string`| First name |
  | middleName | `string`| Middle name |
  | lastName | `string`| Last name |
  | suffix | `string`| Suffix |



### EnrichedProfilePhone



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | number | `string`| Phone number |
  | countryCode | `string`| Country code |





