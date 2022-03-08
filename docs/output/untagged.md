---
title: "untagged"
weight: 0
---



## Types
### EnrichedAddress



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | addressLine1 | `string`|  |
  | addressLine2 | `string`|  |
  | city | `string`|  |
  | entries | `number`|  |
  | stateOrProvince | `string`|  |
  | postalCode | `string`|  |



### EnrichedAddressGetCriteria



**Properties**

| Property | Type | Description |
| ---- | ---- | ----------- |
  | search | `string`| Partial or complete address to search. |
  | maxResults | `number`| Optional Maximum number of results to return. |
  | includeCities | `string`| Optional Limits results to a list of given cities. Example: "chicago;honolulu;portland" |
  | includeStates | `string`| Optional Limits results to a list of given states. Example: "illinois;hawaii;oregon" |
  | includeZipcodes | `string`| Optional Limits results to a list of given zipcodes. Example: "60412;96818;97209" |
  | excludeStates | `string`| Optional Exclude list of states from results. No include pararmeters may be used with this parameter. Example: "AZ;WA;SC" |
  | preferCities | `string`| Optional Display results with the listed cities at the top. Example: "denver;aurora;omaha" |
  | preferStates | `string`| Optional Display results with the listed states at the top. Example: "CO;MN;WI" |
  | preferZipcodes | `string`| Optional Display results with the listed zipcodes at the top. Example: "60412;96818;97209" |
  | preferRatio | `number`| Optional Specifies the percentage of address suggestions that should be preferred and will appear at the top of the results. |
  | preferGeolocation | `none`,  `city`| Optional If omitted or set to city it uses the sender's IP address to determine location, then automatically adds the city and state to the preferCities value. This parameter takes precedence over other include or exclude parameters meaning that if it is not set to none you may see addresses from areas you do not wish to see. Example: "city" |
  | selected | `string`| Optional Useful for narrowing results with addressLine2 suggestions such as Apt (denotes an apartment building with multiple residences). Example: "Apt" |
  | source | `all`,  `postal`| Optional Include results from alternate data sources. Allowed values are -- all (non-postal addresses) or postal (postal addresses only). |





