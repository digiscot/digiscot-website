---
layout: page
title: 2015 Training Module 08
excerpt: Milo Training Module 08 - Reporting Tips.
permalink: /data/milo-training-reporting-tips/
---

### Contents <a name="top"></a>

1. <a href="#intro">Introduction</a>
2. <a href="#separate">Separating delineated lists into separate cells</a>

#### Inroduction <a name="intro"></a>

This Reporting tips training module has been designed to provide you with several tips to help you use the features of reporting easier and more efficently.

<a href="#top">Back to Top.</a>

**Separating delineated lists into separate cells** <a href="#separate">Separating delineated lists into separate cells</a>

This reporting tip training can also be downloaded in PDF form. <a href="/files/Milo 2015 Training Handbook 08 Reporting Tips 01.pdf" download target="_blank">Click here to download</a>

On multi-select picklists in Salesforce (e.g. Main Activities, Neighbourhoods) it is possible to select more than one value. Because multiple values are stored in a single field, this means that when the report is exported to Excel, all of the values will appear in a single cell, delineated by a semicolon.

![Navigate](/images/milo training/a01_navigate.png)

This is fine for a summary of the details in the field, but if you want to do more with the data, it’s handy to separate these values into separate cells. 
Excel has a handy feature that lets you do just that with its Convert Text to Columns wizard. Just follow these steps:
1.	Export your report to Excel

2.	Select the column with the delineated values you want to separate (Main Activities in this example):

![Search](/images/milo training/a02_search.png)

3.	Click on the DATA menu on the ribbon
4.	Click on Text to Columns

![View and Edit](/images/milo training/a03_viewedit.png)

5.	Then simply follow the wizard instructions:

![VE Options](/images/milo training/VEoptions.png)

You can click next on most of the defaults, but make sure ‘Semicolon’ is selected in step 2, as that’s how the values are delineated in Excel: 

![VE Customize](/images/milo training/a05_VECustomize.png)

![VE Customize 2](/images/milo training/a06_VECustomize2.png)

Click Finish, and the individual values from the multi-select field should now be spaced out in separate cells:

![Create](/images/milo training/a07_Create.png)

All you have to do now is add relevant headers to your new columns, e.g. Main Activity 1, Main Activity 2…

![Create 2](/images/milo training/a08_Create2.png)

<a href="#top">Back to Top.</a>
