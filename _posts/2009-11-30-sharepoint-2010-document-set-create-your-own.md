---
layout: post
title: SharePoint 2010 Document Set, Create Your Own
date: 2009-11-30 00:26:26.000000000 -05:00





categories:
- Microsoft
- SharePoint 2010
tags: []

  


  
  
  
  
  
permalink: "/2009/11/30/sharepoint-2010-document-set-create-your-own/"
---
In preparing for a demo I wanted to show just how easy and powerful Document Sets in SharePoint 2010 can be.&nbsp; Using the Public Beta I followed [Liam Cleary’s](http://www.helloitsliam.com/archive/2009/10/30/sharepoint-2010-user-experience-–-document-sets.aspx) steps to enable documents sets, but realized that an empty Document Set really doesn’t help show the power.&nbsp; I decided to dive in and see if I could create my own custom Document Set, and here are my successful steps.

### Getting Started

Before we go further the important thing to realize at this point is that Document Sets in SharePoint 2010 are a new Content Type for folders.&nbsp; That being said, like in MOSS/SharePoint 2007 Content Types can/should be extended to fit your needs.

### Build Your Document Set Content Type

Before following these steps make sure you have already enabled Document Sets in your Site Settings.&nbsp; For instructions refer to [Liam Cleary’s blog about the document sets](http://www.helloitsliam.com/archive/2009/10/30/sharepoint-2010-user-experience-–-document-sets.aspx).

1. Go to your **Site Settings**
2. Select **Site content types** from the _Galleries_ section  
[![Galleries-SiteContentType]({{ site.baseurl }}/assets/images/2009/11/galleries-sitecontenttype5b35d.png?w=300 "Galleries-SiteContentType")](http://dmcwee.files.wordpress.com/2009/11/galleries-sitecontenttype5b35d.png)
3. Select **Create** on the Site content type page
4. Provide a Name for the new Document Set Content Type.&nbsp; Select **Document Set Content Types** as the _Parent Content Type_ (if this is not available then you have not followed Liam’s blog successfully).&nbsp; Choose the _Group_, or create a new one, that you want this Content Type included in and click **OK**.  
[![NewContentType]({{ site.baseurl }}/assets/images/2009/11/newcontenttype5b35d.png?w=300 "NewContentType")](http://dmcwee.files.wordpress.com/2009/11/newcontenttype5b35d.png)

Your new Document Set Content Type should now have successfully created, but we really have not created anything different from the existing Document Set Content Type.&nbsp; Next, we will add several documents to this document set that we want to include when one of these are used.

1. Select **Document Set settings  
[![DocumentSetSettings]({{ site.baseurl }}/assets/images/2009/11/documentsetsettings5b25d.png?w=236 "DocumentSetSettings")](http://dmcwee.files.wordpress.com/2009/11/documentsetsettings5b25d.png)**  
2. In the _Allowed Content Types_ choose the types of Content you want to allow the Document Set to contain.&nbsp; (Any Content Types you want to create when the Document Set is created should be included in this list).
3. In the _Default Content_ Select the Content Type you want to include and a “Template”, if allowed, that should be generated.&nbsp; For multiple items click the _Add new default content …_ link as many time as necessary (or allowed).  
[![DocumentSetSettings-Advanced]({{ site.baseurl }}/assets/images/2009/11/documentsetsettings-advanced5b65d.png?w=300 "DocumentSetSettings-Advanced")](http://dmcwee.files.wordpress.com/2009/11/documentsetsettings-advanced5b65d.png)
4. Click **OK**

You probably noticed that there are several other settings on the page that you can enable/disable/use, but for the purpose of this blog I chose to ignore them.&nbsp; In future blogs I’ll go back and discuss what some of these options are and how they can be useful.

### Use Your Document Set

So at this point you have now created your custom Document Set Content Type and associated documents with it that should be created whenever this Content Type is used.&nbsp; Next we will actually make use of the new Document Set.

1. Go to the Document Library where you wish to use the Document Set (if you don’t have one yet then go ahead and create one now.
2. In the _Library Settings_ (available on the _Library Tools:Library ribbon_) choose the **Advanced Settings**.
3. In _Advanced Settings_ for the _Allow management of content types?_ choose **Yes** and click **OK  
[![DocumentLibraryManageContentType]({{ site.baseurl }}/assets/images/2009/11/documentlibrarymanagecontenttype5b45d.png?w=300 "DocumentLibraryManageContentType")](http://dmcwee.files.wordpress.com/2009/11/documentlibrarymanagecontenttype5b45d.png)**  
4. In the _Content Types section_ of the _Library Settings_ choose **Add from existing site content types**
5. From the _Select Content Types_ choose the name you used for your Document Set and Click **OK  
[![AddContentType]({{ site.baseurl }}/assets/images/2009/11/addcontenttype5b35d.png?w=300 "AddContentType")](http://dmcwee.files.wordpress.com/2009/11/addcontenttype5b35d.png)**  

At this point if you want you can also choose to change the ordering of Document/Document Set so that when a user clicks the “New” button they will end up with your Document Set rather than a standard document.

Finally, you can now create your new Document Set, and when the creation completes you should see your custom documents in the newly created Document Set.

[![NewDocumentSetInUse]({{ site.baseurl }}/assets/images/2009/11/newdocumentsetinuse5b35d.png?w=300 "NewDocumentSetInUse")](http://dmcwee.files.wordpress.com/2009/11/newdocumentsetinuse5b35d.png)

[![NewDocumentSetInUseResult]({{ site.baseurl }}/assets/images/2009/11/newdocumentsetinuseresult5b55d.png?w=300 "NewDocumentSetInUseResult")](http://dmcwee.files.wordpress.com/2009/11/newdocumentsetinuseresult5b55d.png)

