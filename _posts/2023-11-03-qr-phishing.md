---
title: QR Phishing
image: /assets/images/2023/11/qr_phishing.jpg
banner: /assets/images/2023/11/qr_phishing.jpg
categories:
- MDO
- Security
tags:
- Defender for Endpoint
- MDE
- Microsoft
---
Earlier this year some news outlets began to report about increased Phishing that utilized QR codes. This had been discussed as a new threat vector when the COVID pandemic moved restaurants, cafes, and other locations to replace physical menus with digital menus that could be easily accessed from a QR code sticker on your table. Recently, around August/September, more new stories, reports, and industry data have indicated that QR Phishing is becoming more prevalent.
<!--more-->

## Beauty in Chaos

The simple act of replacing a URL, either the raw text in the message to a user or as the underlying `a href=...` value, with a QR code causes 5 issues for Phishing detection and training.

### No Links to Validate or Wrap

Most Phishing/Spam detection solutions have link identification, test, and wrap capability. These find links in emails, chats, documents, etc. and simulate a click to see if the site is potentially malicious as well as wrapping the link so that when a user clicks it an additional check, as well as tracking, can be performed. When the link is replaced with a QR Image the text-based parsing, testing, and wrapping solutions are simply bypassed.

> **NOTE:** Yes the URL still exists in the QR code, but many current malicious link detection capabilities are based on finding a string of text that is the link thus the bypass.

### Protection requires Image Recognition

A QR Code is data that is encoded into an image, so protection tools must perform image analysis/recognition. This means your email gateway needs to do image processing, as well as your office applications, messaging applications, and elsewhere. If you think about the volume of data coming into just your email gateway it may be capable of performing the computation cycles to check every image to determine if it is a QR code, if so to decode the QR code, then perform the URL checks. In addition, because it is data there could be lots and lots of extra data added to the QR code to drive up these computation 'costs'.

### Simple to create and modify

When writing this blog I ran a simple search and came across [QR.io](https://qr.io) which allowed me to create the below QR code for free in virtually no time. [Bit.ly](https://bit.ly), the URL shortening service, which has been used in the past to mask malicious links also provides a free service to generate QR codes. A simple modification of a meaningless query string parameter, and poof...new QR code.

#### davidmcwee.com QR Code

<img src='/assets/images/2023/11/davidmcwee_blog_qr.png' style="max-height: 250px;">

#### davidmcwee.com?parameter1=junk

<img src='/assets/images/2023/11/davidmcwee_blog_qr2.png' style="max-height: 250px;">

### Not human readable

For a long time, we have trained users to look at the URL or hover over the link to see if it looks suspicious. However, a QR Code to a human looks like a square with a bunch of filled in & empty dots. Without the user decoding and accessing the embedded URL they will have no way to see if it looks suspicious until it is potentially too late rendering years of "look at the link" training obsolete.

> **Note:** [Bit.ly](https://bit.ly), mentioned above, has been a similar challenge due to its URL shortening ability but the QR Code hides the obvious malicious link from the user. Also, I do realize that many QR scanners display the link to the user, and here again bit.ly could be used/abused, but how often do we really expect users to read beyond the "Open link" option?

### Mostly Mobile

Personally, when presented with a QR code my solution is to open my cell phone's camera and scan it, and I imagine this is true for most people. However, this means that QR Phishing frequently occurs from a mobile device, which from an Endpoint Monitoring solution is often the least monitored/protected device an end user has. Worse, these devices are where most of us have banking information, credit card data, corporate data, and lots of other sensitive information.

## Fighting Back

Clearly work is needed on QR Phishing detections, and most of the personal & enterprise providers of email services are working on addressing this. In a later post in this series, I plan to show how organizations can start using Microsoft Defender for Office Attack Simulator to create QR Phishing campaigns, and as it evolves later I'll add how to implement QR protections in your Enterprise.
