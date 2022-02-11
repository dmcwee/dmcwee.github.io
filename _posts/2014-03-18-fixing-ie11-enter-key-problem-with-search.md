---
layout: post
title: Fixing IE11 Enter Key Problem with Search
date: 2014-03-18 16:26:56.000000000 -04:00
categories:
- Microsoft
- SharePoint
tags:
- Firefox
- IE11
- UserAgent
- SharePoint 2010
permalink: "/2014/03/18/fixing-ie11-enter-key-problem-with-search/"
---
I was recently working for a client who began having issues with the Windows 8.1 baseline and their search center. If you are familiar with Windows 8.1 then you are aware that it comes with IE 11 which has a new User Agent string that can cause some issues with SharePoint (ref: [IE11 Broke SharePoint 2010](http://davidmcwee.com/2014/01/15/why-ie11-broke-sharepoint-2010/ "IE11 Broke SharePoint 2010")). My task was to figure out why when a user entered a search term/key word and hit enter the page simply refreshed.

I tried several ideas, including attaching to the form submit action, to no success so I began searching the web for any other possibilities I had not though of. Interestingly, I began running across several similar issues with Firefox from back in the SharePoint 2007days. After doing a little reading I began experimenting using IE11'sdeveloper tools and found it has a similar issue to Firefox from years ago. Here is the problem:

SharePoint's KeywordInput has a function that does the following check

> if(event1.which == 10 || event1.which == 13){ ...\<submit the form\>; return false; }

The problem is that IE 11, when the IE-8 Compatibility Meta Tag is present on the page, returns undefined for the event1.which and therefor our submit function is never called. Several people had this same issue with Firefox and there were lots of examples on how to resolve, but most required you hard coded the \<submit the form\> function name, which may or may not be consistent from site to site or even page to page.

I wanted something a bit more dynamic, and what I realized was if I grabbed the Submit function from the actual search button I could just call it directly. In addition, rather than adding another chained function to the keypress DOM event, which could be bypassed if the event was canceled, I wanted to override the current function with my own definition.

Here is the resulting code I have used which works in IE 11, Firefox 27.0.1, and Chrome 33.0.1750.154:

> function ensureReturn()  
> {  
> var jsFunction = $("input[name='InputKeywords']").attr("onkeypress");  
> var jsSplit = jsFunction.split(' ');  
> var funcName = jsSplit[jsSplit.length-1].split('(')[0];
> 
> jsFunction = $("a[title='Search']").attr("href");  
> jsSplit = jsFunction.split(':');  
> var submitFuncName = jsSplit[jsSplit.length-1];
> 
> var newFunc = funcName + " = function(event) { if(event.keyCode == 10 || event.keyCode == 13) { " + submitFuncName + "; try { event.cancelBubble = true; } catch(e){} return false; } };"  
> //newFunc should be something like:  
> //function SFBE88B03\_OSBEK(event1) { if(event1.keyCode == 10 || event1.keyCode == 13) { SFBE88B03\_Submit(); try { event1.cancelBubble = true; } catch(e){} return false; } }  
> eval(newFunc);  
> }  
> \_spBodyOnLoadFunctionNames.push("ensureReturn");

Once that was placed in a JavaScript file and included on the search and results pages the enter key began working again.

