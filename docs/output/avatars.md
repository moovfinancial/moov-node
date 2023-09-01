---
title: "Avatars"
weight: 130
---
You can retrieve an account's profile image. This is especially useful if you'd like to use the profile image for a corresponding account in your own product.


## Get


Gets a binary represention of an avatar.

```javascript
avatars.get(uniqueId)
```

**Parameters**
{{< table >}}
| Name | Type | Description |
| ---- | ---- | ----------- |
| uniqueId |  `string` | Any unique ID associated with an account such as AccountID, RepresentativeID, Routing Number, or User ID |
{{</ table >}}



**Returns**

`Promise.<Blob>`



**Examples**

```javascript
const moov = new Moov(...);
try {
  const avatar = await moov.avatars.get("...");
} catch (err) {
  // ...
}
```








