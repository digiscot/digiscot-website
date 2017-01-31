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

You need to create a verified GitHub account to start contributing. By verified I mean that you have confirmed that the email address you used to sign up is actually yours. If you have already done this you can skip to [Step 2]({{ page.url }}#finding-your-project-page). If you already have an account and need to make sure it is verified, go to [Step 1.2]({{ page.url }}#verifying-your-email-address).

### 1.1. Creating an account
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

### 1.2. Verifying your email address

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

Below you can see how to do some of the more common formatting you might want to apply on your project page. For those wanting to learn more or wanting even more options, take a look at this [guidance for formatting in markdown](https://guides.github.com/features/mastering-markdown/) and this [handy cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

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
**This text will be made bold**
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

When you clicked "Propose file change" in the previous step, GitHub did a whole lot of things happened in the background to save you a lot of time. Unfortunately, for security reasons we don't just want anyone being able to upload files to our repository without us being able to check them out first. GitHub doesn't offer the same shortcuts as it does for text changes when it comes to uploading files. Here is how you submit an image file to our site so you can use it in your project page.

### 4.1. Creating a "Fork"

One of the key principals to GitHub is the ability for users to make their own copies of a repository to work on. This is called "Creating a Fork". Once you have done this, you'll have your own version of our site that you can make any changes you wish and then issue a "Pull Request" to ask us to include those changes in our repository so they appear on [digital.scvo.org.uk](https://digital.scvo.org.uk).

Creating a fork is really simple. Visit our [main repository page here](https://github.com/digiscot/digiscot.github.io) and click on the "Fork" button.

![Main repository page](images/guide/github-main-repository-page.png){:.responsive-img.screenshot}

As soon as you click on this button, GitHub will copy every file that is used to construct our website to a repository on your own account.

![Your own fork](images/guide/github-your-fork.png){:.responsive-img.screenshot}

The list you are looking at is the "root" of the repository. Think of it as a normal computer directory structure with files and folders. If you click on a folder name such as "images", you will be presented with a list of its contents.

### 4.2. Uploading your image

All images used on the SCVO Digital site are stored in a folder called "images". If you are looking at the root of the repository, just click on the "images" folder to open it.

![Images folder repository page](images/guide/github-repo-images.png){:.responsive-img.screenshot}

All project specific images are stored in another folder inside the main images folder called "projects". Click on this to open it.

![Project images folder](images/guide/github-project-images.png){:.responsive-img.screenshot}

Uploading a file is simple. Just drag and drop the image file from your desktop onto the projects page. When you hover your mouse with the image file you want to upload over the page you will see a message saying "Drop to upload your files".

Once you have dropped your image you will see a page with your image listed and a "Commit changes" form at the bottom. You can drag and drop more images onto this pages to upload. Your images aren't in the project images folder until you Commit your changes. Use the form to add a note about what files you have uploaded and click on the "Commit changes" button. Comments are only used for auditing purposes and so we have a nice history of changes to our site.

**Make sure you have "Commit directly to the `master` branch." selected before you click on the "Commit Changes" button**.

After the "Processing files" screen disappears you will be taken back to the project images folder and will see a message about your "Commit" at the top of the file list.

![Image commit confirmation](images/guide/github-image-commit-confirmation.png){:.responsive-img.screenshot}

### 4.3 Making a "Pull Request"

Now you have successfully added your image to your own fork of our website you need to let us know about it by requesting that we "Merge" our version with your changes (the files you have uploaded and commited). You do this by creating what is called a "Pull Request". Instead of you "Pushing" your changes, GitHub puts the control in the hands of the owner of the original repository, us! Pull requests can contain as many commits as you like.

To create your Pull request, simply click on the "Pull request" link that appears at the top of every directory listing in your repository.

![Pull request link](images/guide/github-pull-request-link.png){:.responsive-img.screenshot}

You will be taken to a page that lets you compare the changes you are asking us to accept. In the below screenshot you will see that there is a "Commit" listed with a your username and next to that the comment you entered.

![Comparing changes](images/guide/github-comparing-changes.png){:.responsive-img.screenshot}

Click on the "Create pull request" button to enter continue with the process.

![Create a Pull request](images/guide/github-create-pull-request.png){:.responsive-img.screenshot}

The "Leave a comment" box on this page can be used to describe all of your changes to help us understand what you are submitting. This is optional and like all comments, can be as brief as you like. When you are done writing your comment, click on the "Create pull request" button at the bottom.

The page you have been taken to is a review of your Pull request on the main repository of our website.

![Pull request review](images/guide/github-pull-request-review.png){:.responsive-img.screenshot}

That's it, your Pull request has been created and is ready for review by one of Team Digital. We usually review and accept Pull requests within a working day.

### 4.4 Using your uploaded image

Obviously you will want to embed your image in your project page (see ["3. Editing your page"]({{ page.url }}#editing-your-page) above). These can be embedded in exactly the same way as the images we discussed in [the above section]({{ page.url }}#images). You will need to know what the Url is of your image, if you uploaded your image to the project images page, the Url is `/images/projects/your-file-name.jpg` replacing the "your-file-name.jpg" bit with the actual filename of what you uploaded. In our example, this would be:

~~~~~
![Pull request review](images/projects/image.png){:.responsive-img}
~~~~~

Propose the changes in the same way mentioned in [3.2 Propose your changes]({{ page.url }}#propose-your-changes) and as soon as we have reviewed and accepted them, your images will appear.
