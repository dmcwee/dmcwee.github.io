---
layout: post
title: Custom Save Button for Web Enabled Form
date: 2009-05-14 11:09:00.000000000 -04:00





categories:
- InfoPath 2007
tags: []

  


  
  
  
  
  
permalink: "/2009/05/14/custom-save-button-for-web-enabled-form/"
---
I recently found the need to submit and save Infopath 2007 browser enabled form data. The submit is very straight forward when using browser enabled forms, but the ability to save the form is not so straight forward or so you might think. After thinking for a little while on how to work around the save capability I found a very simple process to allow users to Submit and Save InfoPath Browser enabled forms back to the SharePoint Library without any custom code.

Designing the Form

- Begin by creating an InfoPath 2007 form with a button and some text box control(s).[![clip_image001]({{ site.baseurl }}/images/2009/05/clip_image0015b35d.png "clip\_image001")]({{ site.baseurl }}/images/2009/05/clip_image0015b35d.png)
- Add an additional Data Source called submitFormName[![clip_image002]({{ site.baseurl }}/images/2009/05/clip_image0025b35d.png "clip\_image002")]({{ site.baseurl }}/images/2009/05/clip_image0025b35d.png)

Add a Data Connection

Create the Data Source Connection that will allow the form to be submitted to the SharePoint site using the following steps.

&nbsp;

- Click on the Manage Data Connections… and then click the Add button[![clip_image003]({{ site.baseurl }}/images/2009/05/clip_image0035b35d.png "clip\_image003")]({{ site.baseurl }}/images/2009/05/clip_image0035b35d.png)
- Select Create a new connection to: and Submit Data then click Next \>[![clip_image004]({{ site.baseurl }}/images/2009/05/clip_image0045b35d.png "clip\_image004")]({{ site.baseurl }}/images/2009/05/clip_image0045b35d.png)
- On the next screen Select a destination for submitting your data choose the To a document library on a SharePoint site then choose next[![clip_image005]({{ site.baseurl }}/images/2009/05/clip_image0055b35d.png "clip\_image005")]({{ site.baseurl }}/images/2009/05/clip_image0055b35d.png)
- Now provide a URL to the document library you want to submit your data to. In the next to the file name textbox click on the fx button. Click on the Insert Field or Group… button and select the submitFormName field.[![clip_image006]({{ site.baseurl }}/images/2009/05/clip_image0065b35d.png "clip\_image006")]({{ site.baseurl }}/images/2009/05/clip_image0065b35d.png)
- Click the OK button on the Select a Field or Group window and on the Insert Formula Window. On the data connection wizard check the Allow overwrite if file exists option. Click Next \>.[![clip_image007]({{ site.baseurl }}/images/2009/05/clip_image0075b35d.png "clip\_image007")]({{ site.baseurl }}/images/2009/05/clip_image0075b35d.png)
- You can now provide a custom name for your data connection then click Next \>.
- Click Close on the Data Connections windowAdd the actions to the Custom Button
- Double Click on the button control added to the InfoPath form[![clip_image008]({{ site.baseurl }}/images/2009/05/clip_image0085b35d.png "clip\_image008")]({{ site.baseurl }}/images/2009/05/clip_image0085b35d.png)

Select Rules and Custom Code for the Action and provide a label and control ID, if desired, of your choice.

Click on the Rules… button and then click on the Add button in the Rules Window.

[![clip_image009]({{ site.baseurl }}/images/2009/05/clip_image0095b35d.png "clip\_image009")]({{ site.baseurl }}/images/2009/05/clip_image0095b35d.png)

Screen clipping taken: 4/29/2009, 4:59 PM

Name this rule Set File Name and click on the Set Condition… button. For the Condition check if the submitFormName is blank. Click the OK button.

[![clip_image010]({{ site.baseurl }}/images/2009/05/clip_image0105b35d.png "clip\_image010")]({{ site.baseurl }}/images/2009/05/clip_image0105b35d.png)

Click the Add Action… button. For the action select Set a field's value, for the Field select submitFormName, for the Value use, using the fx builder use the expression concat("Account Request - ", now()) then click OK.

[![clip_image011]({{ site.baseurl }}/images/2009/05/clip_image0115b35d.png "clip\_image011")]({{ site.baseurl }}/images/2009/05/clip_image0115b35d.png)

Click OK on the Rule Window. Now click on the Add… button again on the Rules window. Name this rule Submit Form and do not specify a condition. Add an action to Submit using a data connection and select the Data connection created in the last section.

[![clip_image012]({{ site.baseurl }}/images/2009/05/clip_image0125b35d.png "clip\_image012")]({{ site.baseurl }}/images/2009/05/clip_image0125b35d.png)

Click the OK button on the Action and Rule windows.

Click the Add… button on the Rule Window. Name this rule Close Form and do not specify a condition. Add an action to close the form.

[![clip_image013]({{ site.baseurl }}/images/2009/05/clip_image0135b35d.png "clip\_image013")]({{ site.baseurl }}/images/2009/05/clip_image0135b35d.png)

Click Ok on all of the windows until you are back to the InfoPath form designer.

Now publish your form to the SharePoint site library that was specified in the Data Connection section. Once the form is published go to that library and choose Settings-\>Form Library Settings

[![clip_image014]({{ site.baseurl }}/images/2009/05/clip_image0145b35d.png "clip\_image014")]({{ site.baseurl }}/images/2009/05/clip_image0145b35d.png)

Under the General Settings choose Advanced settings

[![clip_image015]({{ site.baseurl }}/images/2009/05/clip_image0155b35d.png"clip\_image015")]({{ site.baseurl }}/images/2009/05/clip_image0155b35d.png)

In Advanced Settings under the Browser-enabled Documents choose Display as a Web page and then click OK

[![clip_image016]({{ site.baseurl }}/images/2009/05/clip_image0165b35d.png "clip\_image016")]({{ site.baseurl }}/images/2009/05/clip_image0165b35d.png)

This will force the InfoPath form to be opened using Form Services.

Now complete a form and submit it. Then click on the form, change a value and submit again. You should see your changes applied after you submit.

