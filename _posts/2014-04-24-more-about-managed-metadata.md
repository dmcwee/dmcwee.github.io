---
layout: post
title: More About Managed Metadata
date: 2014-04-24 12:52:47.000000000 -04:00





categories:
- SharePoint 2010
tags: []


  

  
  
  
  
  
permalink: "/2014/04/24/more-about-managed-metadata/"
---
I recently had more fun with setting Managed Metadata values in SharePoint 2010.&nbsp; This time as part of an event receiver during the Item Adding, Item Updating, and Item Updated events.&nbsp; (There are interesting event ordering challenges which lead to using all of these events, but that is not the focus of this blog.)&nbsp; The challenge I faced was copying values from a Document Set down to documents that were being created/uploaded to the list.&nbsp; Normally, using Shared Properties would negate this but because we wanted use to edit the Managed Metadata Values in the Document Information Panel we could not use shared values because the Document Set would immediately overwrite any changes made to the document.&nbsp; Instead we created an Event Receiver to manually handle the updates from the Document to the Document Set, and from the Document Set to the child documents.

The issue arose that copying the Document Set values to the Document didn't work.&nbsp; In the logging we could see our Set function get called and return success, but the values never seemed to stick.&nbsp; I was using code I've [previously blogged about](http://davidmcwee.com/2014/03/31/setting-managed-metadata/ "Setting Managed Metadata"):

> SPField mmdField = spListItem.Fields.GetFieldByInternalName("MyMMDField");  
> string validMMDString&nbsp; = mmdField.GetValidatedString(spListItem["MyMMDField"]);  
> newSpListItem["MyMMDField"] = validMMDString;

Since logging was unable to provide enough information I began testing using PowerShell.&nbsp; Which looked something like:

> $field = $listItem.Fields.GetFieldByInternalName("MyMMDField")  
> $validString = $field.GetValidatedString($listItem["MyMMDField"])  
> $newListItem["MyMMDField"] = $validString  
> $newListItem["MyMMDField"].ToString()  
> \>\> ouput the same as the $validString  
> $newListItem.Update()  
> $newListItem["MyMMDField"].ToString()  
> \>\> [Empty]

Interesting, before the `Update()` my value is there but after I loose the value.&nbsp; After looking around a bit I ran across this[blog](http://blogs.msdn.com/b/sridhara/archive/2010/07/09/update-taxonomy-field-values-in-a-list-item-through-sharepoint-web-services.aspx "Update taxonomy field values in a list item through SharePoint web services"), and although it was about using the web services it provides a key piece of information: Managed Metadata Fields have a Lookup Field AND a Note field.&nbsp; I began exploring the various fields, again through PowerShell, and was able to identify the Note field associated with my Managed Metadata Column.&nbsp; This value looks almost identical to what is in the Managed Metadata Field but does not include the WSSID.

Example:

> Taxonomy Field:  
> 123;#My Term|00000000-0000-0000-0000-000000000000;#124;#My Other Term|00000000-0000-0000-0000-000000000001
> 
> Note Field:  
> My Term|00000000-0000-0000-0000-000000000000;My Other Term|00000000-0000-0000-0000-000000000001

At first it appeared at the Managed Metadata Note Column's Internal name was the Managed Metadata Column's Column GUID with the '-'s removed.&nbsp; That worked great for 2 of my 3 fields, but one field didn't use that same pattern.&nbsp; Using PowerShell I printed the Managed Metadata Field Definition to the&nbsp;console and discovered a key property: `TextField`.&nbsp; This field is a GUID that stores the ([MSDN Article Here](http://msdn.microsoft.com/en-us/library/microsoft.sharepoint.taxonomy.taxonomyfield.textfield(v=office.14).aspx "TaxonomyField TextField Property")) Note Field's GUID and allows you to get the Manage Metadata's associated Note field.

Finally, once I began setting both the Managed Metadata Field AND the Note field all of my Managed Metadata values would successfully populate.

Final Code  
_ **Note:** I did not include checks to ensure cast of the field to Taxonomy Field was successful and I'm also assuming that spListItem and newSPListItem share the same columns._

> SPField mmdField = spListItem.Fields.GetFieldByInternalName("MyMMDField");  
> TaxonomyField taxField = mmdField as TaxonomyField;
> 
> string validMMDString&nbsp; = mmdField.GetValidatedString(spListItem["MyMMDField"]);  
> string mmdNoteString = spListItem[taxField.TextField].ToString();
> 
> newSpListItem["MyMMDField"] = validMMDString;  
> newSpListItem[taxField.TextField] = mmdNoteString;  
> newSpListItem.Update();

