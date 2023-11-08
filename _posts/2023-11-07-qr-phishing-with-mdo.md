---
title: QR Phishing with MDO
image: /assets/images/2023/11/qr_phishing.jpg
banner: /assets/images/2023/11/qr_phishing.jpg
featured: true
categories:
- MDO
- Security
tags:
- Defender for Endpoint
- MDE
- Microsoft
---
Previsouly, I wrote about QR Phishing and the many challenges it poses to current cyber awareness training, and defensive tools. As this is a growing trend it is important for companies to incorporate this type of phishing method into existing cyber training and awareness. Specifically, this post will detail how to use Microsoft Defender for Office to generate a QR Phishing campaign.
<!--more-->

## Similar Posts

While writing this post I was made aware of [another post](https://www.linkedin.com/pulse/performing-unofficial-qr-code-phishing-simulation-ast-cam-murray/) on the same topic by one of the Microsoft Defender for Office PMs. I would encourage you to check out Cam's post and the [QR code project he published](https://github.com/cammurray/qrasta/) if you are looking for ways to implement this in your organization.

## Custom Payload

Currently, QR Phishing payloads are not available in MDO but MDO does allow for custom payload creation so it is still possible but a little more complex.

### Don't waste time

1. You can't generate the QR Code before the campaign and put it in the payload, it must be dynamically generated.
1. The payload message accepts HTML, but will strip out Javascript which is really sad because this [Javascript QR Code generation library](https://github.com/davidshimjs/qrcodejs) is super easy to use.
1. There are several QR Code generation projects on GitHub, and [QRCoder](https://github.com/codebude/QRCoder) is what I used for the example below.

### MS Subscription Email

Rather than using one of the existing payloads I chose to use a legitimate subscription email I had and modify it. The benefit is that I could add and test the QR Code creation process in my browser without having to do a lot of iteration through Attack Sim. This ended up paying off because I did everything in the **Don't waste time** section, which consumed a lot of time. However, it is really up to you to decide how custom you want to go.

<img src="/assets/images/2023/11/subscription_email.png" style="width: 600px;" alt="subscription email">

This is the legitimate subscription email I used and I modified it to remove some of the account specific details, but still seem reasonable. 

<img alt="phishing email" src="/assets/images/2023/11/phishing_email.png" style="width: 600px;">

You can see the HTML version of this [here](/QR_Phishing) or download just the custom payload portion here.

### Dynamic QR Code Service

When the phishing simulation executes, along with using the phishing URL of your choice a string of dynamic data is also added, thus you cannot pre-create the QR Code. 

> **Note:** My initial intent was to use qrcode.js, but I discovered that the Attack Simulation Payload creation form removed `<script ...` tags and even trying to do things like `< script ...` to dodge the parsing failed.

I found [QRCoder](https://github.com/codebude/QRCoder) which is a .NET project that allows for dynamic creation of the QR Code. Pulling a few classes `AbstractQrCode`, `PngByteQrCode`, `QrCodeData`, and `QrCodeGenerator` were sufficient to build a basic web service that could accept the dynamic url and generate the QR code.



### Completed Payload

After pushing the service and creating the custom payload you are now ready to move forward with QR Phishing Simulation.

<img alt="Attack Sim Content Library Tenant Payload" src="/assets/images/2023/11/Attack_Sim_Content_Lib.png" style="width: 600px;">

## Attack Simulation

Next create an attack simulation using your custom payload.

<img alt="select custom payload" src="/assets/images/2023/11/attack_sim_select_payload.png" style="width: 600px;">

Because this uses Microsoft branding and subscription related phishing attack select a Microsoft Login page as the landing page as well.

<img alt="select microsoft login landing page" src="/assets/images/2023/11/Phishing_Landing_Page.png" style="width: 600px;">

Now complete and run your simulation.

## Result

Once the simulation runs the phishing email appears in the users inbox.

<img alt="attack sim phishing email" src="/assets/images/2023/11/phishing_email.png" style="width: 600px;">

Looks very believable and has just enough sense of urgency for the user to quickly scan and log in.

<img src="/assets/images/2023/11/phishing_login.jpg" style="height: 450px;" alt="phishing login screen">

Once the login is complete we see the page alerting the user about the sucessful phishing action.

<img alt="phishing fail" src="/assets/images/2023/11/successfully_phished.jpg" style="width: 600px">

Finally, the appropriate training email is sent to the user.

<img alt="phishing training assigned" src="/assets/images/2023/11/phishing_training_assigned.png" style="width: 600px;">


