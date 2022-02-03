---
layout: post
title: Silverlight RSS Reader
date: 2009-01-23 16:47:02.000000000 -05:00





categories:
- Silverlight
tags: []

  


  
  
  
  
  
permalink: "/2009/01/23/silverlight-rss-reader/"
---
After following [Scott Gu's 8 part blog on Silverlight](http://weblogs.asp.net/scottgu/pages/silverlight-2-end-to-end-tutorial-building-a-digg-search-client.aspx) and using it to get a feed from[Digg](http://www.digg.com) I decided to try out my own Silverlight project. Since I use Twitter, not nearly enough, I thought it would be fun to have a little application that can read the twitter feed and display it in SharePoint.

**Silverlight Application**

Using Visual Studio 2008 (SP1) with Silverlight 2 installed I created a new Silverlight application.

I named the Application SilverlightTwitter because I want this to read a Twitter feed and allowed it to create the SilverlightTwitter.Web Web Application for testing purposes, and to help with the HTML I would need. When done I had a solution that looked like this.

Next I added a class that could handle an \<item\> tag in an RSS feed.

Next I began working on my Silverlight UI. First I removed the Height and Width attributes from the UserControl because I want the control to resize automatically. Next I added a StackPanel to my Silverlight page with a Vertical orientation (items added will be stacked on top of each other). Inside the Vertical StackPanel I added another StackPanel with a Horizontal orientation and a ListBox. Inside the Horizontal StackPanel I added a button that would allow me to refresh the RSS feed that would be displayed in the ListBox.

I added the DisplayMemberPath="Title" statement to the ListBox so that when I added my Collection of Item objects (shown above) the ListBox would use the Title attribute to display the information.

Next I added a Click event handler to the button so we could manually request a refresh of the RSS feed.

Now the UI is complete and it is time to provide action for the UI. Turning my attention to the Page.xaml.cs file I implemented the btnRefreshFeed\_Click function. I decided that I wanted my control, when loaded to capture the feed and then later the refresh button could recapture the feed, so implementing the click handler just involved calling another function MakeRequest. I also added the call to MakeRequest to the object's constructor.

Next I used the WebClient object to perform my request to twitter to retrieve my data feed. I should also be clear, when I say "my datafeed" I really mean the public datafeed that Twitter provides. I decided to use this because it is anonymously accessible and would speed up the development time.\*\*Special note\*\* Silverlight, like Flash limits cross domain requests, which means going from my domain to another domain is usually prohibited. In the case of Twitter cross domain access IS BLOCKED, so inorder to make this work you must have a proxy that does allow cross domain requests. Thanks to work I've done with IDV I happened to have a proxy already accessible to get me around this issue.

Finally, I implemented the Async Callback Handler which would be responsible for parsing the XML and creating the Collection of Item objects. Like Scott Gu, and because I really like Linq, I used Linq to help speed this process.

Now the Silverlight application is done, you can run and test the application using the SilverlightTwitter.Web testing application.

**Silverlight to MOSS**

I built the Silverlight application in about an hour, this next part took me WAY TOO LONG so hopefully I'll save you a lot of time.

Using StsDev2008 I created a new WebPart Project. I added the project to my existing Silverlight Solution so I now had a project like this.

My solution has a LAYOUTS folder, which I manually added after the project was created. I also added a SilverlightWP folder under the LAYOUTS as well. Next I updated the Build Event in Silverlight Twitter so that the xap file would be copied from that project to the SilverlightWP Layouts location. Next I built the SilverlightTwitter project to cause the xap file to be generated and copied, once copied to the Layouts folder I included it in the SilverlightWP project. Next I removed the CustomWebPart2.cs, CustomWebPart2.webpart files from the project as well as updating the feature.xml and webparts.xml files. Next I renamed the CustomWebPart1.cs to SilverlightWebPart.cs as well as renaming its associated webpart file. Again I updated the feature.xml and WebParts.xml files so they referenced the correct webpart file. Finally I updated the class name in the SilverlightWebPart.webpart file to reflect the correct class name.

Finally I removed the CreateChildControl function from the SilverlightWebPart.cs and replaced it with the RenderContents function. The reason for this is so that I could control exactly what was rendered in the control.

I commented out the code for the onerror event because I am not including ANY javascript files or functions in this solution, they aren't needed! Now that this is done I performed a BuildDeploy on the SilverlightWP project which packaged everything up and deployed it to my local SharePoint instance. Because my development machine is a Windows 2003 R2 server I had to add the .xap and .xaml mime types to my IIS instance. To do that you can right click on your IIS instance, select Properties, choose the HTTP Header and click on the MIME Types… button. You can then add the .xap and .xaml as show below.

Finally I activated my solution in the Site feature and created a new Web Part Page. On the Web Part Page I added the SilverlightWP WebPart to the page and…nothing showed up. What I discovered, thanks to [this blog](http://sharethelearning.blogspot.com/2008/11/silverlight-in-content-editor-web-part.html) was the I needed to set a fixed size for my WebPart. Once the fixed size was in place, it worked.

