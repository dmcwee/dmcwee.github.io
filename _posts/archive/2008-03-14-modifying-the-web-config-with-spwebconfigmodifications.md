---
layout: post
title: Modifying the web.config with SPWebConfigModifications
categories:
- SharePoint 2007
tags: []
---
A confusing aspect of using the SPWebConfigModifications is what should you use as the Name of your modification?

Here are my recommendations, I do not claim to have a complete or exact list, but this should help get you started.

1. If you are adding items that will have repeating xml node names , like section or add, then your name should be something like the following to prevent overwriting any previously added modifications.
  1. add[@name='name'] for \<add name="name" .../\>
  2. section[@name='name'] for \<section name="name" .../\>
  3. etc.
2. If you are adding custom xml nodes that will have child nodes then you should use the name of that node, this includes standard nodes located in the web.config file.
  1. membership for \<membership\>...\</membership\>
  2. etc.

If you need help, have haning web.config modifications etc, here is a link I found that provides a nice .aspx page that will allow you to remove those changes.&nbsp; Also available at the link is more information about doing the web.config changes using SPWebConfigModification objects.

[http://blog.thekid.me.uk/archive/2007/03/24/web-config-modification-manager-for-sharepoint.aspx](http://blog.thekid.me.uk/archive/2007/03/24/web-config-modification-manager-for-sharepoint.aspx)

If you fail to name your modification properly then you might find that the next modification actually overwrites what you just added.

* * *

Another question I run across often is how to change the attribute of a tag that already exists.&nbsp; It actually turns out that this is very simple.&nbsp; Using the membership section of a web.config I will show you.

\<system.web\>  
&nbsp; \<membership defaultProvider="AspNetActiveDirectoryMembershipProvider"\>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \<providers\>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \<clear /\>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \<add name="AspNetActiveDirectoryMembershipProvider" type="..." connectionStringName="..." ... /\>  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \</providers\>  
&nbsp; \</membership\>  
\</system.web\>

Lets say we have our own membership provider and you plan on referencing it using the name "MyCustomMembershipProvider" your SPWebConfigModification would look like the following.&nbsp; Rember you would have to also add a membership provider using a SPWebConfigModification and the naming described above.

SPWebConfigModification membershipProviderPrimary = new SPWebConfigModification("defaultProvider", "configuration/system.web/membership");  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; membershipProviderPrimary.Type = SPWebConfigModification.SPWebConfigModificationType.EnsureAttribute;  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; membershipProviderPrimary.Sequence = 0;  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; membershipProviderPrimary.Owner = GetType().ToString();  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; membershipProviderPrimary.Value = "MyCustomMembershipProvider";

Notice here set the name to the name of the xml attribute who's value we want to set.&nbsp; The XPath provided does not include the xml attribute, only the xml node which contains that attribute.&nbsp; Finally, we set the SPWebConfigModification's value to the desired value ("MyCustomMembershipProvider"). Once this change is commited you will see that the defaultProvider has been changed to "MyCustomMembershipProvider".

