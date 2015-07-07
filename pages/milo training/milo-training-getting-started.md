---
layout: page
title: 2015 Training Module 01
excerpt: Milo Training Module 01 - Getting Started.
permalink: /data/milo-training-gettingstarted/
---


### Contents <a name="top"></a>

1. <a href="#introduction">Introduction</a>
2. <a href="#logging">Logging in</a>
3. <a href="#steps">First steps and features</a>
4. <a href="#objects">Milo objects</a>
5. <a href="#views">Views</a>
6. <a href="#adding">Adding an object tab to your display</a>
7. <a href="#salesforce">Salesforce help and training</a>
8. <a href="#sum">Summary</a>


#### Introduction <a name="introduction"></a>

This training moduel can also be downloaded in PDF form. <a href="/files/Milo 2015 Training Handbook 01 Getting Started 0515.pdf" download target="_blank">Click here to download</a>

This module will allow you to access and start working on the new Milo system on Salesforce.

For the most part, Milo 2 uses the same data types (organisations, contacts, opportunities) as the original Milo system, so once you become accustomed to the new user interface, it should be fairly straightforward to navigate around the system as before.

If you just want to get the basics, module 00 – **Quick Start Guide**, will enable you to access the system and start exploring. If you would like more step by step guidance, just start working through the rest of the modules.


<a href="#top">Back to Top.</a>

#### Logging in <a name="logging"></a>

All Milo users require a named licence. If you do not have a licence, please contact your local milo lead to find out if one has already been assigned to you.

When you are set up on the system as a user, you will reveive an automated e-mail with details of how to log in and a URL. You must create your own password on first-time login. Don't worry - it is possible to reset passwords in the event you forget them. 

To access Milo, go to <a href="https://login.salesforce.com/">https://login.salesforce.com/</a> and enter your details.

![Log Screen](/images/milo training/00_log_screen.PNG)


<a href="#top">Back to Top.</a>

#### First steps and features <a name="steps"></a>


**The home screen**

On login, you will be taken to your home screen - this is where you can see an overview of recent activity, live tasks and events, and any dashboards you have set up. You will see that along the top left of the screen there are several tabs relating to different Milo entities (highlighted below): 

![Home Screen](/images/milo training/00_home_screen.PNG)


**Important features**

There are some helpful and time-saving features (numbered above) available for use throughout the system - it's important to be aware of them before you get started, as they **will** save you some time!


**1. Search**

![Search](/images/milo training/00_search.PNG)

One of the key differences in the new system is that there is now a global system-wide search. The search field is a bit like Googling within Milo – enter any organisation or contact name to find matching results and associations. If you want to use partial words, remember to add an asterisk [*] as a wildcard.


**2. Create new**

![Create New](/images/milo training/00_new.PNG)

Create new allows you to create a new organisation, contact, opportunity, event or task without going anywhere else in the system (though of course, you should always make sure a record for a new contact etc. doesn’t exist yet!).


**3. Recent items**

![Recent Items](/images/milo training/00_recent.PNG)

This list will be blank the first time you log in. but as you investigate the system and open more records, your recent history will appear here – very useful for clicking back into a record you were working on earlier in the day without having to search.


**4. Recycle bin**

![Recycle Bin](/images/milo training/00_bin.PNG)

Lastly, if you accidentally delete a record, fear not – there’s now a recycle bin so you can view and restore recently-deleted items if necessary.


<a href="#top">Back to Top.</a>

#### Milo Objects <a name="objects"></a>

You should recognise the standard Milo objects along the bar at the top of the screen from the old Milo system. You can choose which objects you want to appear on this bar – we’ll look at this at the end of this module.

![Objects](/images/milo training/01_objects1.PNG)

By clicking into each of these tabs, you will go to the home screen for each object. For example, if you click on Organisations, you will see a screen like this:

![Objects](/images/milo training/01_objects2.PNG)

Don’t worry if no organisations are showing first time. The home screen defaults to a view of the most recent records you accessed (and there won’t be any if this is your first login). As you start to use the system, it will remember the most recent records and show them to you when you click into the home screen of an object.

Although viewing recent organisations is often a very quick way of getting to the record you want, it is possible to set up different views to bring up the records you work with most often.


<a href="#top">Back to Top.</a>

#### Views <a name="views"></a>

Salesforce allows users to create their own customised views of records on the system, using the fields within each object to sort and filter for exactly the information you want. For example, you might want to:

* View a list of all organisations with an ML1 postcode
* View a list of individual members of the TSI
* View a list of all Volunteers between the ages of 18-25

A Salesforce view is like a very simple report which allows you to select the records you want to see. It’s very simple to create a view, and once you have saved a new view, you can use it every time you login.


**The view selector**

Click on the Organisations tab to see the home screen as above. Just below where it says ‘Organisations Home’, you’ll see a dropdown menu called ‘View’, which defaults to ‘All Organisations’:

![Views](/images/milo training/01_view1.PNG)

If you click on ‘Go!’ you will see that this really does return all organisations – all 40,000 of them. This isn’t particularly useful unless the organisation you are looking for is right at the start of the alphabet, so let’s try creating a more specific view.


**Creating a view**

Click on the Create New View link on the right hand side of the view selector. This takes you to the page that will allow you to select which criteria you want to use for your view.

![View edit window](/images/milo training/01_viewedit.PNG)

First, give it a name. *‘[Your name] test view’* will do fine.

*n.b.: note the red bar next to the ‘View Name’ field. This means this field is mandatory – you have to complete this one in order to save.*

Leave the Filter by Owner radio button set at ‘All Organisations’ for now. Ignore Filter by Additional Fields as well – we’ll come back to this.

Now, select the fields from the Organisation object you wish to display in your view. Simply scroll through all of the available fields in the box on the left hand side and add the ones you’re interested in to the box on the right hand side.

For this example, we’ve picked the organisation name and address details, plus charity status and number.

![View](/images/milo training/01_view3.PNG)

Finally go back to Specify Filter Criteria in Step 2. For this example, we want to view all organisations which are registered charities.

![Edit View](/images/milo training/01_view4.PNG)

To do this, select ‘Registered Charity Status’ from the Field dropdown, and ‘equals’ from the Operator dropdown. Then click on the magnifying glass next to ‘Value’ to see which options are available. In this case, it’s a simple True or False. Select True and click on insert selected.

You now have a very simple filter for your view: ‘Registered charity status equals true’

![Edit View](/images/milo training/01_view5.PNG)

This will still return thousand of records, so to limit the results a bit more, select ‘Organisation Name’ from the Field dropdown, ‘starts with’ from operator. This time, simply type in the word ‘Airdrie’:

![Edit View](/images/milo training/01_view6.PNG)

If you want to, you can add other filters, for example all charities within a particular postcode area, or all charities with names beginning with the letter Z. But for now we’ll keep it simple.

Now click on the Save button at the bottom of the screen and that’s it – you have created a view!

![Edit View](/images/milo training/01_view7.PNG)

Instead of thousands of results, you can now view the 20 organisations on the database which are registered charities and have names beginning with the word ‘Airdrie’.


<a href="#top">Back to Top.</a>

#### Adding an object tab to your display <a name="adding"></a>

Each user will want to access different parts of the system on a day-to-day basis, so it’s possible to change the object tabs on your local display.

As in the old Milo system, the default display shows the main Milo objects: Organisations, Contacts, Volunteering Opportunities and Volunteer Registrations (Interactions is no longer displayed by default as it is now possible to access these from individual organisation records).

![Objects](/images/milo training/01_adding1.PNG)

If you don’t work with volunteers, you probably don’t need to have the Volunteering Opportunities or Volunteer Registrations tabs on your display (especially if your permissions do not allow you to view volunteer records).

Similarly, if you work with reports a lot, you may want to have Reports available as one of the main tabs.

To manage your tabs, click on the + symbol to the right of the tab bar (next to Volunteer Registrations in the image above). This takes you to the All Tabs screen, where you can navigate to any of the objects and functions you have permission to view.

![Objects](/images/milo training/01_adding2.PNG)

To add one of these tabs to your user display, click on the orange ‘Customise My Tabs’ button at the right of the screen:

![Tabs](/images/milo training/01_tabs.PNG)

This will allow you to select the tabs you want to see on your own display. Don’t worry, this won’t change anyone else’s display within your TSI, only yours.

You can choose any available tab in the box on the left hand side and add it to the box on the right hand side to determine what tabs appear on the top bar of your display. Similarly, you can remove tabs on your existing display.

![Customize Tabs](/images/milo training/01_customtabs.PNG)

In this example, we’ve added Reports and removed Volunteering Opportunities and Volunteer Registrations. Click Save to view your amended display.

![Tabs](/images/milo training/01_tabs2.PNG)

If you change your mind, you can go back and add or remove tabs at any time.


<a href="#top">Back to Top.</a>

#### Salesforce help and training <a name="salesforce"></a>

Salesforce provides an excellent online help and training directory. While the custom Milo functionality is covered in these training modules, Salesforce has a wealth of other features that could complement your work. If you are interested in exploring Salesforce in more detail.

Click on the Help & Training link at the top right of every screen…

![Help & Training](/images/milo training/01_h&t.PNG)

…to go to the Salesforce online training and help hub. You can take online training and access support from the worldwide Salesforce community.

![Help & Training}(/images/milo training/01_h&t2.PNG)

You can usually find the answer to any question about Salesforce by typing your question into the Help search field.

Remember, for Milo-specific questions (e.g. “how do I create a new interaction with an organisation?”), it’s best to refer to the training documentation or contact the Milo team on [milosupport@scvo.org.uk](mailto:milosupport@scvo.org.uk) – but for questions about Salesforce itself, the online help and training is a fantastic resource.


<a href="#top">Back to Top.</a>

#### Summary <a name="sum"></a>

In this **Getting Started** module, we have covered:

* Logging into the system
* The Home screen, and important features like Create New and Recent Items
* Milo objects
* Using and creating views
* Customising the available object tabs on your display
* How to access Salesforce online help and training

This gives you the basic skills you need to navigate around Milo and make use of some key Salesforce functions. The next few modules will focus on using the standard Milo objects like Organisations, Volunteer Registrations and Volunteer Opportunities.

Remember – if you have any problems or get stuck, you can contact the Milo team at [milosupport@scvo.org.uk](mailto:milosupport@scvo.org.uk)


<a href="#top">Back to Top.</a>
