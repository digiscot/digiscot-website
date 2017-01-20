---
layout: markdown
title: How to update your project page
excerpt: A simple guide on what you need to do to make changes to your page
permalink: /participation/projects/editing-your-project/
fa-icon: fa-info-circle
submenu: participation-projects
---

# Introduction

The SCVO Digital website is hosted on [Github](https://github.com) which is basically a service that lets you host some project files and many people work on them in tandem, keeping track of any changes. It is called a Version Control System (VCS). One of the benefits for using Github is that you can turn a project repository (or repo) into a website using [Github Pages](https://pages.github.com/).

You don't need to know the technical details of how Github Pages works to contribute to a website but it can seem a little tricky if you've never used it before. Here is a brief guide that will hopefully de-mystify things for you.

# The steps

## 1. Creating a verified account

You need to create a verified GitHub account to start contributing. By verified I mean that you have confirmed that the email address you used to sign up is actually yours. If you have already done this you can skip to [Step 2](#2-finding-your-project-page). If you already have an account and need to make sure it is verified, go to [Step 1.2](#1-2-verifying-your-email-address).

### 1.1 Creating an account
To create an account you will need to open your favourite web browser and navigate to the [main page of GitHub.com](https://github.com). Once there you should see a screen that looks something like this.

![GitHub homepage](images/guide/github-homepage.png){:.responsive-img.screenshot}

As you can see from the form, GitHub likes to keep things simple so only asks you for the following details when signing up:

{:.browser-default}
 * Username &mdash; _Can only contain alphanumeric characters and hyphens. I can also not begin or end with a hyphen_
 * Email address &mdash; _You will need to verify you own this email address to contribute_
 * Password &mdash; _Must contain at least one letter, one number, and be a minimum of 7 characters long_

Unlike other sign up forms you may have seen elsewhere online, GitHub only asks you to enter your email address and password once so be sure to type it in correctly.

After you have filled in the form and clicked on "Sign up for GitHub" you will see the following screen asking you to "Choose your plan".

![GitHub sign up step 2](images/guide/github-signup-step-2.png){:.responsive-img.screenshot}

Although GitHub is free, you can sign up for a paid plan but that is not necessary for what you want to do. On this screen, simply click on the "Continue" button.

The next screen you will see is just a wee survey to help customize your GitHub experience. You can click on the "skip this step" link at the bottom of the page if you like.

![GitHub sign up step 3](images/guide/github-signup-step-3.png){:.responsive-img.screenshot}

You now have a GitHub account! Let's verify your email address so you can start contributing.

### 1.2 Verifying your email address

To prevent people from easily automatically creating accounts and attempting to push changes to other people's GitHub repositories, you are required to verify your email address. When you first register for an account you will be sent an email with a link in it you must follow.

To check if you are verified and ready to go, click on the little picture at the top right-hand side of any page within GitHub.com and then click on "Settings"

![Github user menu](images/guide/github-user-menu.png){:.responsive-img.screenshot}

Once in the "Personal settings", click on the "Emails" link in the side menu. If you see a warning triangle next to it, you have not yet verified your email address.

![Github email settings](images/guide/github-email-settings.png){:.responsive-img.screenshot}

If you have just signed up for an account, check your inbox for the verification email. If you haven't received one you can click on the "Resend" link to get another one. The email you receive will look like this.

![Verification email](images/guide/verification-email.png){:.responsive-img.screenshot}

All you need to do is click on "Verify email address". This should take you to a page that looks like this.

![GitHub verification confirmation](images/guide/github-email-verification-confirmation.png){:.responsive-img.screenshot}

Congratulations! You now have a verified GitHub account. Please email [digital@scvo.org.uk](mailto:digital@scvo.org.uk) your GitHub username from an Organisational email address just so we can know who to accept updates from. We do this manually and may need to call your organistaion if your organisation does not have its own domain name that you can email us from. We need to do this for security reasons.

## 2. Finding your project page

There is an [index of all project pages](participation/projects/) on the SCVO Digital website. Scroll through this list to find your own or press `ctrl+f` and start typing in your project name and let your browser find it for you.

![Finding your project](images/guide/finding-your-project.png){:.responsive-img.screenshot}

Click on the project's title - in this case, "Resemount Lifelong Learning" - to open the project's page.

![Project page](images/guide/project-page.png)

Click on the "Update this page" button that appears at the top of the page. This will take you to the GitHub repository for the SCVO Digital website where you can edit your page.

## 3. Editing your page

If you are signed in to GitHub with your verified account you will see a button with a pencil icon.

![GitHub repository page](images/guide/github-repository-page.png){:.resonsive-img.screenshot}

Click on the pencil to go to the page editor. There are 2 important tabs to note on this page:

{:.browser-default}
 * Edit file &mdash; _The code editor where you type in your changes_
 * Preview changes &mdash; _Shows you a basic preview of what your page will look like when you have commited your changes_

![GitHub edit page](images/guide/github-edit-page.png){:.responsive-img.screenshot}

__IMPORTANT! When editing your project's page, **DO NOT** change anything in the top section that is labeled "DO NOT EDIT THIS SECTION"__

### 3.1 Formatting your page's text using Markdown

GitHub pages uses a markup language called [Markdown](https://en.wikipedia.org/wiki/Markdown). A markup language is basically a way of telling a computer how it should format text. It allows you to have titles, headings, emphasise text, link to other pages, embed images, and much more. This means you can make your project page look much more rich without having to learn HTML!

To be more specific GitHub pages uses a varient of Markdown called [kramdown](https://kramdown.gettalong.org/) that allows you to do a little bit more with your text but you don't need to worry about that.

#### Paragraphs

When writing text in Markdown you must remember to put a line break between each paragraph.

~~~~~
Here is paragraph 1 ⏎
⏎
Here is paragraph 2 ⏎
~~~~~

#### Headings

You use the hash (#) symbol to start a heading. There are many _levels_ of headings you can use and the number of hashes you start your heading with tells the page what level to use. Heading 1 is the biggest and with each increment they get smaller. Each heading must sit on its own line and be sure to put a space between your hash (#) and your heading text.

~~~~~
# Heading 1 ⏎
⏎
## Heading 2 ⏎
⏎
### Heading 3 ⏎
⏎
#### Heading 4
~~~~~

Becomes

> # Heading 1
>
> ## Heading 2
>
> ### Heading 3
>
> #### Heading 4
{:.highlight}

#### Emphasis

To make bits of your text stand out you can wrap it in asterisks ( * ). Use 1 asterisk to make your *text italicised*, and 2 asterisks to make your **text bold**.

~~~~~
*This text will be italicised* ⏎
⏎
**This text will be made bold*
~~~~~

#### Links

You will probably want to link to other websites or your email address in your project page. You will need to tell the page what text needs to be a link and then type where it needs to link to. The link text sits between square brackets [ ] and the address sits between curved brackets ( ).

~~~~~
[I am a website link](https://google.com) ⏎
⏎
[I am an email link](mailto:contact@awesome-charity.org.uk)
~~~~~

Be sure to start all of your website links with either "**http://**" or "**https://**" and your email links with "**mailto:**". This lets the browser know how it is supposed to be handling the link.

#### Images

Embedding an image is very similar to including a link. The only difference is you need to put an Exclamation Point at the start. The bit that would be the Link Text can now be used as a description for your image for people who use screen readers. Images should sit on their own lines.

~~~~~
![I am a description](https://unsplash.it/1280/768/?random)
~~~~~

This will display a random image from the wonderful free stock image provider [Unsplash](https://unsplash.com/). There is one extra step to make your images look right on your project page and that is to add what is called a "Class" to it to tell the browser that the image needs to be responsive. To do this you need to add `{:.responsive-img}` to the end of your image line.

~~~~~
![I am a description](https://unsplash.it/1280/768/?random){:.responsive-img}
~~~~~

This will be displayed on the page as

![I am a description](https://unsplash.it/1280/768/?random){:.responsive-img}

#### Full guide to kramdown

If you want to see a complete guide to what is possible using the kramdown variant of Markdown, read their ["Quick Reference"](https://kramdown.gettalong.org/quickref.html) guide. It'll tell you everything you need to know.

### 3.2 Propose your changes

As mentioned above, GitHub is a Version Control System. When you make changes to a file you don't just click a save button, you need to "Propose file change". If you scroll to the bottom of the edit page you will see a form to do this.

![Propose changes form](images/guide/github-propose-changes.png){:.responsive-img.screenshot}

When you fill in this form with a description of what you have changed, some one here in Team Digital will receive what is called a "Pull Request". This is basically a request to replace your current project page with the changes you have just made. It is done this way so we can make sure that everything that goes on our site is good and correct &mdash; we don't just want anyone putting anything on your project page. We usually review and accept these changes within a day.

## 4. Hosting images on GitHub

_TODO: Create a guide to forking and creating a pull request_