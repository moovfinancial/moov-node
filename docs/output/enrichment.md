---
title: "Enrichment"
weight: 120
---

## Get

Gets enriched address suggestions.

```javascript
enrichedaddresses.get(criteria)
```

**Parameters**
{{< table >}}
| Name     | Type                                                      | Description                               |
|----------|-----------------------------------------------------------|-------------------------------------------|
| criteria | [EnrichedAddressGetCriteria](#enrichedaddressgetcriteria) | Criterial for available search parameters |
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
| Name  | Type     | Description                               |
|-------|----------|-------------------------------------------|
| email | `string` | Email address associated with the profile |
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

{{< table >}}
| Property        | Type     |
|-----------------|----------|
| addressLine1    | `string` |
| addressLine2    | `string` |
| city            | `string` |
| stateOrProvince | `string` |
| postalCode      | `string` |
| entries         | `number` |
{{</ table >}}

### EnrichedAddressGetCriteria

**Properties**

{{< table >}}
| Property          | Type            | Description                               |
|-------------------|-----------------|-------------------------------------------|
| search            | `string`        | Partial or complete address to search |
| maxResults        | `number`        | Optional Maximum number of results to return |
| includeCities     | `string`        | Optional Limits results to a list of given cities. Example: "chicago;honolulu;portland" |
| includeStates     | `string`        | Optional Limits results to a list of given states. Example: "illinois;hawaii;oregon" |
| includeZipcodes   | `string`        | Optional Limits results to a list of given ZIP codes. Example: "60412;96818;97209" |
| excludeStates     | `string`        | Optional Exclude list of states from results. No include parameters may be used with this parameter. Example: "AZ;WA;SC" |
| preferCities      | `string`        | Optional Display results with the listed cities at the top. Example: "denver;aurora;omaha" |
| preferStates      | `string`        | Optional Display results with the listed states at the top. Example: "CO;MN;WI" |
| preferZipcodes    | `string`        | Optional Display results with the listed ZIP codes at the top. Example: "60412;96818;97209" |
| preferRatio       | `number`        | Optional Specifies the percentage of address suggestions that should be preferred and will appear at the top of the results. |
| preferGeolocation | `none`, `city`  | Optional If omitted or set to city it uses the sender's IP address to determine location, then automatically adds the city and state to the preferCities value. This parameter takes precedence over other include or exclude parameters meaning that if it is not set to none you may see addresses from areas you do not wish to see. Example: "city" |
| selected          | `string`        | Optional Useful for narrowing results with addressLine2 suggestions such as Apt (denotes an apartment building with multiple residences). Example: "Apt" |
| source            | `all`, `postal` | Optional Include results from alternate data sources. Allowed values are -- all (non-postal addresses) or postal (postal addresses only). |
{{</ table >}}

### EnrichedProfile

**Properties**

{{< table >}}
| Property   | Type                                                    | Description         |
|------------|---------------------------------------------------------|---------------------|
| individual | [EnrichedIndividualProfile](#enrichedindividualprofile) | Describes a person  |
| business   | [EnrichedBusinessProfile](#enrichedbusinessprofile)     | Describes a company |
{{</ table >}}

### EnrichedBusinessProfile

**Properties**

{{< table >}}
| Property          | Type                                                | Description (if applicable)             |
|-------------------|-----------------------------------------------------|-----------------------------------------|
| legalBusinessName | `string`                                            |                                         |
| address           | [EnrichedProfileAddress](#enrichedprofileaddress)   |                                         |
| email             | `string`                                            |                                         |
| phone             | [EnrichedProfilePhone](#enrichedprofilephone)       |                                         |
| industryCodes     | [EnrichedProfileIndustry](#enrichedprofileindustry) | Describes industry specific identifiers |
| website           | `string`                                            |                                         |
{{</ table >}}

### EnrichedIndividualProfile

**Properties**

{{< table >}}
| Property | Type                                              |
|----------|---------------------------------------------------|
| name     | [EnrichedProfileName](#enrichedprofilename)       |
| email    | `string`                                          |
| address  | [EnrichedProfileAddress](#enrichedprofileaddress) |
{{</ table >}}

### EnrichedProfileAddress

**Properties**

{{< table >}}
| Property        | Type     |
|-----------------|----------|
| addressLine1    | `string` |
| addressLine2    | `string` |
| city            | `string` |
| stateOrProvince | `string` |
| postalCode      | `string` |
| country         | `string` |
{{</ table >}}

### EnrichedProfileIndustry

**Properties**

{{< table >}}
| Property | Type     |
|----------|----------|
| naics    | `string` |
| sic      | `string` |
{{</ table >}}

### EnrichedProfileName

**Properties**

{{< table >}}
| Property   | Type     |
|------------|----------|
| firstName  | `string` |
| middleName | `string` |
| lastName   | `string` |
| suffix     | `string` |
{{</ table >}}

### EnrichedProfilePhone

**Properties**

{{< table >}}
| Property    | Type     |
|-------------|----------|
| number      | `string` |
| countryCode | `string` |
{{</ table >}}
