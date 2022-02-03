---
layout: post
title: IDV Solutions 3.01 and KMZ
date: 2008-09-05 10:48:35.000000000 -04:00





categories:
- GeoSpatial
tags:
- IDV
- IDV Solutions

  


  
  
  
  
  
permalink: "/2008/09/05/idv-solutions-3-01-and-kmz/"
---
IDV solutions has released its latest Visual Fusion Suite and Visual Fusion Experience solutions for SharePoint. Along with the 2.0 capabilities of GeoEncoding items in a list IDV has now enhanced their ability to draw data feeds from KML files as well as providing KML output of SharePoint list items. I have installed this latest version to a site currently used to track events in the Georgia conflict, if you would like to see it in action click [here](https://georgia.harmonieweb.org/).

The driving force to provide this latest version for the Georgia conflict site was to allow for the use of KML files. Of course, like many things as soon as you provide one capability the users will always want more, and so we go from KML to KMZ.

A little about KMZ

I am no expert on KMZ, in fact I have not even done extensive research on the layout/organization of KMZ files, yet. However I understand that a KMZ file is simply a compressed version of a KML file, at its simplest. KMZs however can also include additional documents, images, etc and provide a single file that can be distributed with lots of other "items" wrapped up inside.

Almost immediately after installing IDV's 3.01 and enabling the KML capabilities we received our first request for a KMZ file to be displayed. IDV does not support this out of the box so we initially just extracted the KML file inside the KMZ and added it to the map. When a user would click on a point the description would not show the images that were described in the KML. As I looked at the paths that were referenced they all referenced a path like "./files/xxxxxx".

Now that we knew the path the solution is very simple, create a picture library in the same site as the imagery and mapping and name the picture library "files". You will notice by using the "files" name the path to the picture library will be "./files". Next unzip the KMZ file and upload all the pictures to the picture library. Now what we see is this

[![idv img]({{ site.baseurl }}/assets/images/2008/09/y1pNlpDdX25GZVj-fO17IqkeaDrptYDbSL3ArQiOXLJJ_5tXPWOyWd2tjlKdbV8t0BbNPNnl7bmyt4)](http://byfiles.storage.live.com/y1pNlpDdX25GZVj-fO17IqkeaDrptYDbSL3ArQiOXLJJ_5tXPWOyWd2tjlKdbV8t0BbNPNnl7bmyt4)

Home - Georgia Imagery Site

[https://georgia.harmonieweb.org/imagery30/default.aspx](https://georgia.harmonieweb.org/imagery30/default.aspx)

Screen clipping taken: 9/5/2008, 10:37 AM

| |
| [![]({{ site.baseurl }}/assets/images/2008/09/y1pT_WdSZyMRkVjU6LBmTMw3j90XckNOH31P2-ffXlJd3ugBmcIB3EPxKPC-mfqlJnT9l3JKOa_k2g)](http://byfiles.storage.live.com/y1pT_WdSZyMRkVjU6LBmTMw3sSPKvHKptX8Efa8tMJWBbPgmHM22dbdHUdEjx7uuM7px09hkWGUr9U) |

