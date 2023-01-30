---
title: cat testing
# layout: post
categories:
- AAD
- Active Directory
- AngularJS
- Azure
- Beta
- ECTS
- Identity
- InfoPath 2007
- MDE
- MDI
- Microsoft
- Security
- SharePoint 2007
- SharePoint 2010
- SharePoint
- Silverlight
- Visual Studio
- VSX
---
{% for cat in page.categories %}
## {{ cat }}
{% assign catPosts = site.posts | where:"categories",cat | sort: "date" %}
{% for post in catPosts %}
[{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%a %b %d, %y" }}
{% endfor %}
{% endfor %}