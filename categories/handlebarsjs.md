---
category: handlebars
---
{% assign catPosts = site.posts | where:"categories",page.category %}
{% for post in catPosts %}
  {%- include article.html post=post %}
{% endfor %}