---
layout: post
title: Client Side Rendering of Form Fields
date: 2014-11-14 00:40:56.000000000 -05:00
categories:
- Microsoft
- SharePoint
tags:
- SharePoint 2013
permalink: "/2014/11/14/client-side-rendering-of-form-fields/"
---
I've been working on a site migration from SharePoint 2010 to SharePoint 2013 and a lot of what we did in 2010 was to customize forms the user interacts with. One of the requirements we had was to ensure a Project Name and Project Alias field did not contain the same information. In SharePoint 2010 this had been done by adding some JavaScript to the page, grabbing each control by HTML Element ID, and then comparing their values. When we migrated these fields all got new HTML Element IDs so our validation logic was broken.
<!--more-->

Obviously, we could go and update the JavaScript to use the new IDs, but if we migrated to another environment or performed and upgrade in the future we would probably have an issue again. Instead SharePoint 2013 added Client Side Rendering which allows us to control the form's renderingusing JavaScript which would should allow our solution to be more portable and enable the field validation.

I have written a couple of other blogs about the Client Side[Renderingof aView](http://davidmcwee.com/2014/01/28/sharepoint-contacts-on-a-map-with-client-side-rendering/ "SharePoint Contacts on a Map with Client Side Rendering")and[Rendering ofSpecific Field(s)](http://davidmcwee.com/2014/02/12/more-customizations-with-client-side-rendering/ "More customizations with Client Side Rendering"). While those were useful I found I was still missing a lot of information about how we could add the validation, what was needed to make sure values provided in the form were saved,and how to make the controls interact.

Before we begin a word of caution: Once a Field Template is provided the template must provide the UI Controls for the user to interact with, a method to retrieve the value specified by the user, a method of displaying the previously specified value, and any validation INCLUDING if the field is required or not. The example below will include elements of all of this, but your implementation may differ based on your scenario.

First, remember that we need to write good JavaScript that does not pollute the global JS space, so remember to wrap everything in your self executing function.

> (function() {  
> //overrideContext code below  
> })();

Second, we are going to specify an override on the Edit Form for our specific fields, you may also want to do this on a new form but in our case the Project Alias was not available on the new form so we didn't worry about it there. Remember once we provide the override for the Field we are fully responsible for the type of input(s)/controls the user will have to interact, retrieving the value for SharePoint, and performing any 'Required' field validation along with any other custom validation we may want. In order to provide the override in the proper format we must create our OverrideContext object with the proper properties.

> var overrideCtx = {};  
> overrideCtx.Templates = {};
> 
> overrideCtx.Templates.Fields = {  
> 'ProjectAlias' : {  
> EditForm: function(currentCtx) {  
> }  
> },  
> 'ProjectName': {  
> EditForm: function(currentCtx) {  
> }  
> }  
> };
> 
> SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);

At this point we have now specified that we want to overridethe ProjectAlias and ProjectNamefields when the Edit Form is rendered. However, since we have not returned any HTML formatted controls from either function if we placed all this in a JavaScript file and added it as the JS Link on the Edit form what would actually happen is the ProjectAlias and ProjectNameinput control wouldn't exist.

Focusing on the ProjectAlias Field we can add the following to return an HTML TextBox for the user to make use of.

> var ctx = SPClientTemplates.Utility.GetFormContextForCurrentField(ctxCurrent);  
> var controlId = ctx.fieldName+ "\_davidmcwee\_control";
> 
> //Get Field Value, Value Validation, and Validation Error handling code will all get added here
> 
> return String.format('\<input type="text" id="{0}" name="{0}" /\>', controlId);

Now we have a simple text box that will render because the function provided to EditForm is expected to return HTML that can be directly embedded in the page for rendering. Also we are controlling the ID and Name attributes of our HTML Element so our validation later will be much easier. While we have the control being rendered, if you actually try to provide a value nothing will get saved because we haven't specified how to get the value from the control. So before we return our HTML string we need to register our "getter" method so SharePoint knows how to get the value for our overridden field.

> ctx.registerGetValueCallback(ctx.fieldName, function() {  
> return $get(controlId).value;  
> });

_$get is a SharePoint provided function which return the HTML DOM object and issimilar to the jQuery $("#" + controlId). I've used only the SharePoint functionality here to prevent confusion with other JS libraries._

**Important thing to note:**  The first argument to the register function is the Field's Name, if you use any other value your function will still get called, but the value you return will not get applied to the field it should be associated with. I originally used the controlId as the first argument but found the values were never saved, it took a lot of searching and trial and error to finally realize the issue.

Now that we can retrieve and save our control's value we can implement validation. In order to provide validation we need to create a Validator object that implementsthe Validate(...) function.

> //Added the Field Validator just below the declaration of overrideCtx.Templates = {};  
> fieldValidator = function() {  
> fieldValidator.prototype.Validate = function(value) {  
> var isError = false;  
> var errorMessage = "";
> 
> if($get("ProjectAlias\_davidmcwee\_control").value == $get("ProjectName\_davidmcwee\_control").value)  
> {  
> isError = true;  
> errorMessage = ("ProjectName and Project Alias are not allowed to be the same.");  
> }
> 
> return new SPClientForms.ClientValidation.ValidationResult(isError, errorMessage);  
> };  
> };

In the above code you can see we did hard code the HTML IDs, while this was done in our dev code we did move to saving each of the Control IDs as properties so they could be retrieved later and the code would be more generic. However, the idea is that we will get the two controls value's and compare them, if they match we will set isError to true and provide a message back to the user.

Now we need to add our Validator to the Form's list of Validators in association with our field and we also need to handle a validation error.

> var validators = new SPClientForms.ClientValidation.ValidatorSet();  
> validators.RegisterValidator(new fieldValidator());  
> ctx.registerClientValidator(ctx.fieldName, validators);

These lines handle creating a validator set, so you can have multiple validators on a single field, adding the validator we created above to the set and registering the validator with the field.

> ctx.registerValidationErrorCallback(ctx.fieldName, function(errorResult) {  
> SPFormControl\_AppendValidationErrorMessage(controlId, errorResult);  
> });

These lines handle the Validation Callback, but this function is not always called. This function is invoked when the input fails validation or if the previous attempt to save failed validation. The nice thing is that all we really need to do, in this case, is pass along the results as well as the HTML Element ID to the SPFormControl\_AppendValidationErrorMessage function. You could consider adding other logic here to clear, update, or add suggestions to the user for possible "good" values if validation fails. The errorResult object provided two properties errorMessage which is the message you specified, and validationError which is the Boolean value you specified in your Validation object.

Once all of this is added, you now have a functioning form override with field dependencies. Here is the entire [JavaScript file in PDF format](http://dmcwee.files.wordpress.com/2014/11/displaytemplatejs.pdf)for you to view.

