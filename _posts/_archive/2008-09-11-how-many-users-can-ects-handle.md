---
layout: post
title: How many users can ECTS Handle?
categories:
- ECTS
tags: []
---
How many users can ECTS Handle?

&nbsp; &nbsp;

This has become a common question for a couple of my clients, to which I really don't have a good answer. However, with my clients we have found significant issues when attempting to use the User Manager web part in ECTS when we have 100+ users. In fact, recently the client has had to go to using the ECTS login so they can manage the users because the Active Directory times out before the page loads.

&nbsp; &nbsp;

Therefore my best answer right now is: Not many.

&nbsp; &nbsp;

While that is my current answer, that is not the final answer. I have recently been working on a series of web parts to replace the default ECTS web parts. The goal is to make fast loading and easy to use web parts, which means sacrificing some of the custom call backs in favor of just displaying the hidden capabilities when the page is loaded.

&nbsp; &nbsp;

If interested here are a couple of screen shot on how this looks.

&nbsp; &nbsp;

ECTS User Manager

&nbsp; &nbsp;

&nbsp;&nbsp;&nbsp; [![ECTS External User Manager]({{ site.baseurl }}/assets/images/2008/09/y1pf_ASq7d9EAYGa6Wr0dfWwhQndor_O_HBPR6SqEytwZzs4CdDRUuTAIKALhOlg53nwVr5UtX5ldg)](http://byfiles.storage.live.com/y1pf_ASq7d9EAYGa6Wr0dfWwhQndor_O_HBPR6SqEytwZzs4CdDRUuTAIKALhOlg53nwVr5UtX5ldg)

This web part actually shows all of the users in ADAM. When you click on the Take Action button on the far right this is what you get.

&nbsp;&nbsp;&nbsp; [![ECTS External User Take Action]({{ site.baseurl }}/assets/images/2008/09/y1pLWKlIPqBiXBjYvEZSms3uIEPdPket--wghkHDM1DTt8Z7TkSLxppRiPolvICtoKeBHMO0EVqvVg)](http://byfiles.storage.live.com/y1pLWKlIPqBiXBjYvEZSms3uIEPdPket--wghkHDM1DTt8Z7TkSLxppRiPolvICtoKeBHMO0EVqvVg)

&nbsp; &nbsp;

My ECTS Enhanced User Manager

&nbsp; &nbsp;

&nbsp;&nbsp;&nbsp; [![MY User Manager]({{ site.baseurl }}/assets/images/2008/09/y1pYcb6GOFn0ttV-k5QgEijv87qW07gEF0TdIMLr42k5Ly5B1WUo9WQ68by4LJPrHMzx0fIeUoN6ww)](http://byfiles.storage.live.com/y1pYcb6GOFn0ttV-k5QgEijv87qW07gEF0TdIMLr42k5Ly5B1WUo9WQ68by4LJPrHMzx0fIeUoN6ww)

This is actually two web parts, the a | b | c |… is a connection provider which controls what CNs are searched for. This could be adapted to have a more, or less, capable filtering mechanism. Notice that the Reset Password, Toggle Enabled State and Delete are all exposed immediately. This prevents us from having to recreate the list of ADAM users every time the web part is loaded, and with the filter web part we now are able to reduce our search result set to a more manageable size. I have dropped the Modify capability in the current version, in the future I will add another connectable web part that will allow for editing of the selected user.

&nbsp; &nbsp;

One difference in my version is that when a password is reset the user's who's password was reset receives an e-mail with the new password. I'm not sure if ECTS is supposed to do this as well, but from my experience, I have never received an e-mail when the password was reset other than that sent manually by the help desk personnel.

&nbsp; &nbsp;

My ECTS Enhanced User Approval

&nbsp;&nbsp;&nbsp; [![My User Approval Part]({{ site.baseurl }}/assets/images/2008/09/y1p36HZ_81AzRj22yt0aIjqpAWchjm6RPp9yWD4T8iZfo2lFEDhhhPemXfHZTrDuBFpFGs57YYf350)](http://byfiles.storage.live.com/y1p36HZ_81AzRj22yt0aIjqpAWchjm6RPp9yWD4T8iZfo2lFEDhhhPemXfHZTrDuBFpFGs57YYf350)

&nbsp; &nbsp;

Here you will notice that the Requestor has been dropped from the default ECTS User Approval Web Part (not pictured).

&nbsp; &nbsp;

One of the key changes I have made is to use the SPUtility.SendEmail(…) rather than the crazy database settings that ECTS has used. This provides several advantages, but most of all we can see if the send succeeded or failed. If it fails we can prompt the user to manually send information like passwords to the user proactively rather than waiting for the user to again request a password reset or, worse, leave and never come back. One of the biggest issues I have seen is that once an account gets approved the approval e-mail does not get sent to the user and they never receive a password. This then requires the site support team to use the User Manger, which can time out easily, to reset the password and e-mail it to the user.

&nbsp; &nbsp;

The other major advantage is you don't have to manage three different locations where the SMTP settings are kept, currently ECTS stores these in the web.config, the ECTS database, and they are stored in SharePoint's SMTP settings.

| |
| [![]({{ site.baseurl }}/assets/images/2008/09/y1ppOxJWC9I6-eNXuP9v4B-feQ0GCQnhM65zXHAC3Xwu8zcO-xxShYPGQ7-QvdRfiGE_Istgfo3iVk)](http://byfiles.storage.live.com/y1ppOxJWC9I6-eNXuP9v4B-fW-wUYniKSFdY3ljd5djC5-FlcOzvdESyD6vKirqUVNTwugZvE5f57E) | | [![]({{ site.baseurl }}/assets/images/2008/09/y1pp3W7wSQJxwwe4xyccIa8MY3qpoCSPTBh96xUGNFtC97O1xAqK-w8Os7-kwo1pCwbh9Y4NlZl3H0)](http://byfiles.storage.live.com/y1pp3W7wSQJxwwe4xyccIa8MfBwx_dt8GvcqyXVOUFN9Rl-oW90dUfXO1s1YoIWT6B90XC_83hjcWE) |
| |
| [![]({{ site.baseurl }}/assets/images/2008/09/y1pwc12ogp1zsgs3FTbinkyiE_t4nyoGQme9YKdL4FwirjjjQehzWG2Ku-PJP6Y3Appzq2cbp5oUYU)](http://byfiles.storage.live.com/y1pwc12ogp1zsgs3FTbinkyiK-zMepRL8wkxKMRBjphsWMDjZ5nFpMgKOH9QV8kE05683cSWSaxBYI) | | [![]({{ site.baseurl }}/assets/images/2008/09/y1pgt4IW6_zVf0HQc0p8PBZJ3OKK9-D3K0KmVv21mpuhQbCjLrukCuEiN6aK_lvSmSf8a2FF-iaHaU)](http://byfiles.storage.live.com/y1pgt4IW6_zVf0HQc0p8PBZJwROqst0hAn3VyG5V1oQ8cTPr7JGPJGwojhJn4l4LDe7YAPd0S4qvcY) |

