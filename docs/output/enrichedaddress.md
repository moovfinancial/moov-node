---
title: "EnrichedAddress"
weight: 0
---


## Get


Gets enriched address suggestions.

```javascript
enrichedaddresses.get(criteria)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| criteria |  [EnrichedAddressGetCriteria](#enrichedaddressgetcriteria) | Criterial for available search parameters. |
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






