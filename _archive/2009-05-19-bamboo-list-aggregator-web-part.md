---
layout: post
title: Bamboo List Aggregator Web Part
categories:
- SharePoint
tags: []
---
A customer I support has the Bamboo List Aggregator web part which allows you to consolidate multiple lists into a single view and display on a site, very helpful in SharePoint!&nbsp; The customer had added one to a page and wanted to be able to set a default “Sort By” and default “Group By” value.&nbsp; He assumed, as did I went I first looked at this issue, that there would be some very simple option to select a default “Sort By” and “Group By” value, but there wasn’t.&nbsp; So looking at the web part on the page understanding that Bamboo has simple provided a nice GUI to the Content Query Web Part I knew there was some way to make this work.&nbsp; So here is how:

Set the Default Sort By Value

1. Select the “Sort By” value you want to be your default.
2. Once the page refreshes open the source and search for the value you selected, in this case “Site Path”.&nbsp; This value will appear multiple times so make sure you find the location in the HTML with the correct Sort By \<select\> tag and the \<option selected\> tag.&nbsp; From there copy the Value of the option tag.
3. Open the Parameters Editor for the Content Query Web Part and find:  
\<ParameterBinding Name="dvt\_sortfield" Location="Postback;Connection;CAMLVariable" /\>  
this should be near the top of the parameter edit text box
4. Add DefaultValue=”\<value from option tag in step 2\>” (in my example it was DefaultValue=”bsc\_SiteProperties”) and then save your changes.
5. Apply your changes to the web part and verify the field is now defaulted to your desired value.

Set the Default Group By Value

1. Follow the first two steps in the section above.&nbsp; Make sure to copy the value from the Group By \<select\> tag and the\<option selected\> tag’s Value.
2. Open the Parameters Editor for the Content Query Web Part and find:  
\<ParameterBinding Name="dvt\_groupfield" Location="Postback;Connection" /\>  
this should be near the bottom of the parameter edit text box
3. Add DefaultValue=”\<value from option tag\>” (in case this was "DefaultValue=”bscListName”) and then save your changes.
4. Apply your changes to the web part and verify the field is now defaulted to your desired value.

