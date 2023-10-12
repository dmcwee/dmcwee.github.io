---
layout: post
title: ECTS Post Installation Issue
---
So I have had the opportunity to go back and work on the ECTS enabled system I worked on earlier this year for DoD. Sadly in my preparation for creating a new site I began working in my ECTS Virtual Machine, but in my haste one day I removed the external USB HD the VM is located on and corrupted the entire VM. As it turns out this has been a nice refresher in installing ECTS and I have found some new issues to write about.

&nbsp;  
&nbsp;

Ok, so after installing ECTS on the system, which had a fresh installations of SQL Server Dev 2005, MOSS EE 2007, Visual Studio 2008, .NET Framework 3.5 I was able to install ECTS successfully without issue. Using my certificate authority installed on the VM I created the Cert for the ECTS ADAM communication and checked to ensure it was working. Finally, I extended my "internal" site so I would have an "external" forms authentication site. Next step was to check the "external" site to ensure it was configured correctly, and I was immediately redirected to the login page where I got the standard "Unknown Error" MOSS page.

&nbsp;  
&nbsp;

Since I had the generic error, I updated the web.config to allow the callstack to display and turned off the custom errors. I then accessed the login page again and had the following error:

&nbsp;

The resource object with key 'loginPageTitleInTitleArea' was not found. at System.Web.Compilation.ResourceExpressionBuilder.ParseExpression(String expression, Type propertyType, ExpressionBuilderContext context)

at System.Web.UI.BoundPropertyEntry.ParseExpression(ExpressionBuilderContext context)

at System.Web.UI.ControlBuilder.FillUpBoundPropertyEntry(BoundPropertyEntry entry, String name)

at System.Web.UI.ControlBuilder.AddBoundProperty(String filter, String name, String expressionPrefix, String expression, ExpressionBuilder expressionBuilder, Object parsedExpressionData, Boolean generated, String fieldName, String formatString, Boolean twoWayBound)

at System.Web.UI.ControlBuilder.PreprocessAttribute(String filter, String attribname, String attribvalue, Boolean mainDirectiveMode)

at System.Web.UI.ControlBuilder.PreprocessAttributes(ParsedAttributeCollection attribs)

at System.Web.UI.ControlBuilder.Init(TemplateParser parser, ControlBuilder parentBuilder, Type type, String tagName, String id, IDictionary attribs)

at System.Web.UI.ControlBuilder.CreateBuilderFromType(TemplateParser parser, ControlBuilder parentBuilder, Type type, String tagName, String id, IDictionary attribs, Int32 line, String sourceFileName)

at System.Web.UI.ControlBuilder.CreateChildBuilder(String filter, String tagName, IDictionary attribs, TemplateParser parser, ControlBuilder parentBuilder, String id, Int32 line, VirtualPath virtualPath, Type& childType, Boolean defaultProperty)

at System.Web.UI.TemplateParser.ProcessBeginTag(Match match, String inputText)

at System.Web.UI.TemplateParser.ParseStringInternal(String text, Encoding fileEncoding)

&nbsp;

Ok, so the first thing I noticed was the statement about a "resource object" which is a tell tail sign some .resx file did not get deployed.

&nbsp;  
&nbsp;

**RESX File's in your Solution**

RESX files (.resx) usually get deployed to your site's app\_globalresources folder, so if a resource object is missing then it's a good idea to look there to ensure your resx file was deployed.

&nbsp;  
&nbsp;

Next step was to determine what resx file was missing, so I went to the folder, typically you're My Documents folder, that has the ECTS installer (ECTSSetupWizard.hta). In that folder is also the ECTSSolution.wsp file, which is really just a renamed .cab file. So I copied the ECTSSolution.wsp to ECTSSolution.cab and then opened the cab, inside there are 3 resx files. I initially copied all three to the "internal" and "external" site app\_globalresources folders, however you should only have to copy the ExternalCollaboration.resx file to resolve the problem above.

&nbsp;  
&nbsp;

After copying the files to the app\_globalresource I refreshed the login page, and happly ever after it has worked.

&nbsp;

