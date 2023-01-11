---
layout: post
title: A WCF "WHAT THE..."
date: 2010-02-08 16:35:43.000000000 -05:00
categories:
- Microsoft
tags: []
permalink: "/2010/02/08/a-wcf-what-the/"
---
I’ve been working with WCF and SharePoint 2007 and ran across an issue. The scenario is an Account Registration process which allows the user to request access to “protected” sites within a portal. This solution blends some jQuery and WCF using the JSON format for request and response messages. The issue I ran into was when a user requested access to a/several sites I needed to pass the Site ID to the WCF service as part of the user request object.
<!--more-->

User Request Object

[DataContract]  
[KnownType("GetKnownTypes")]  
public class UserDetails  
{  
[DataMember] public string UserName;  
[DataMember] public string Provider;  
[DataMember] public string FirstName;  
[DataMember] public string LastName;  
[DataMember] public string Email;  
[DataMember] public string Organization;  
[DataMember] public string Title;  
[DataMember] public string Department;  
[DataMember] public string Position;  
[DataMember] public string WorkAddress1;  
[DataMember] public string WorkAddress2;  
[DataMember] public string City;  
[DataMember] public string State;  
[DataMember] public string Zip;  
[DataMember] public string Phone;

 [DataMember] public string Country;

 [DataMember] public string CountryCode;

 [DataMember] public IUserDataExtension ExtendedInformation;

 private static Type[] GetKnownTypes()  
{  
return KnownTypesProvider.GetKnownTypes();  
}

}

Ok, so the first thing you might notice is the KnownTypes, but for now lets just agree that it works and I’ll talk about it in a later blog. Now you do notice I have a IUserDataExtension object in the User Details, and that is what we will talk about here, or at least an item in it.

Here is the implemenation of the IUserDataExtension:

[DataContract]  
public class ExtendedUserDetails : IUserDataExtension  
{  
public ExtendedUserDetails()  
{  
Worksites = new List\<string\>();  
}

 [DataMember] public List\<string\> Worksites;

 [DataMember] public string Justification;  
}

So the key piece here is the Worksites List. Notice I am capturing the values as string, but in reality they are Guids that I retrieve from SharePoint using a different web service. I chose to use strings because Guid has a constructor that takes a string object and I figured this would let me handle the casting and exceptions if something when wrong.

At this point I began testing and everything worked, as long as I did not pass any worksite IDs to my service. As soon as I would include a worksite ID I would end up with a 400 error code and a web page that said “The server encountered an error processing the request. See server logs for more details”, but of course the server logs had nothing about the error in them. Attaching a debugger never did any good because my WCF functions were never reached, so somewhere earlier in the call stack an exception was being thrown.

I began experimenting, and just on a whim decided, “Well, javascript doesn’t know about ASP.NET Guid objects, it just sees them as string, but what if I set the List type to Guid?” So I changed the class as follows.

[DataContract]  
public class ExtendedUserDetails : IUserDataExtension  
{  
public ExtendedUserDetails()  
{  
Worksites = new List\<Guid\>();  
}

 [DataMember] public List\<Guid\> Worksites;

 [DataMember] public string Justification;  
}

Once I compiled and upgraded my solution, TA DA! So the lesson of this story is that you CAN’T pass Guids as string to a WCF service. My belief is that during the parsing of this object the format matches that of a Guid so WCF casts the object to string, but when it tries to find an object with List\<Guid\> container that fails and an exception is thrown, hopefully some of my contacts at Microsoft will be able to shed some light on this for me.

