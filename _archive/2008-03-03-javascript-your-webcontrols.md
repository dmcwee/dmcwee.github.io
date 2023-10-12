---
layout: post
title: JavaScript your WebControls
categories:
- SharePoint
tags: []
---
I recently ran into an issue recently where I needed to get javascript access to controls that were created programatically to my WebControl/WebPart.&nbsp; I passed the control's ID to the javascript function, which was rendered as the page was rendered, but was still not able to get access to the control.&nbsp; When I looked at the HTML rendering of the page I found that the ID of the control, when I requested it from within my C# code was not the same as what the webpart rendered in the HTML.&nbsp; 

&nbsp;

Because&nbsp;the webpart&nbsp;class implents&nbsp;the INamingContainer interface all of its controls are added to the page with IDs that include namespacing&nbsp;from the INamingContainer interface.&nbsp;&nbsp;This can be a major pain to get around, but there is a very simple resolution.&nbsp; 

&nbsp;

By adding:

&nbsp;

<font color="#0000ff">myControl.Attributes.Add("ID", myControl.ClientID);</font>

<font color="#0000ff"></font>&nbsp;

I was able to override the INamingContainer's ID attribute and use the ClientID I was expecting.

