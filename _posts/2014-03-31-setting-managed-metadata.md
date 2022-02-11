---
layout: post
title: Setting Managed Metadata
date: 2014-03-31 11:10:05.000000000 -04:00
categories:
- Microsoft
- SharePoint
tags:
- SharePoint 2010
permalink: "/2014/03/31/setting-managed-metadata/"
---
I recently had an issue trying to set the Managed Metadata field value on a new list item I was creating in C# code. In the control where the user could select the managed metadata value I was using the OTB Taxonomy Control which was properly bound to my Managed Metadata Field. From that I would then retrieve the 'Value' (Label|Guid)of the Term selected and call the TaxonomyFieldValue PopulateFromLabelGuidPair. This would successfully retrieve a TaxonomyFieldValue and I would this use this as follows:

> TaxonomyFieldValue mmdFieldValue = new TaxonomyFieldValue(string.Empty);  
> mmdFieldValue.PopulateFromLabelGuidPair(mmdFieldControl.value);  
> item[field.Id] = mmdFieldValue;

No exceptions were thrown, but when reviewing the list item the Managed Metadata Value was not present. I added the following lines to determine what value was actually in my `mmdFieldValue` variable being used to set the item's field:

> string validatedString = field.GetValidatedString(mmdFieldValue);  
> string validatedString2 = field.GetValidatedString(mmdFieldValue.ToString());  
> string justString = mmdFieldValue.ToString();

What I noticed was the `validatedString2` was usually an Empty string, while the `validatedString` was populated, but included a leading integer. The `justString` usually had a value of [Label]|[GUID], as expected.

With some experimenting what I found was the validatedString, no matter what value I selected for the field always had the SAME leading integer '0'. This was the key to resolving the issue, and what I found was the TaxonomyFieldValue object has three properties: Label, GUID, and WssID. The WssID was the key, it's value was also always 0 so I tried changing it to a -1 and suddenly all my Taxonomy Values worked.

Final Code:

> TaxonomyFieldValue mmdFieldValue = new TaxonomyFieldValue(string.Empty);  
> mmdFieldValue.PopulateFromLabelGuidPair(mmdFieldControl.value);  
> mmdFieldValue.WssId = -1;  
> item[field.Id] = mmdFieldValue;

