---
categories:
- AAD
- AngularJS
- Azure
- Identity
- MDE
- MDI
- Microsoft
- Security
- SharePoint
---
{% for cat in page.categories %}
## {{ cat }}
{% assign catPosts = site.posts | where:"categories",cat | sort: "date" %}
{% for post in catPosts %}
[{{ post.title }}]({{ post.url }}) - {{ post.date | date: "%a %b %d, %y" }}
{% endfor %}
{% endfor %}