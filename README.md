# SCVO Digital Participation

This is the master repository for [digital.scvo.org.uk](http://digital.scvo.org.uk).

### Where to find things

**Regular pages** are at:

```
/pages/
```

**Profile pages** for projects and charter signatories are at:

```
/pages/projects/
/pages/signatories/
```

### Adding pages

Navigate to the relevant folder and use the `+` button to add a new page.

Please give your file a sensible name, and make sure it ends in `.md`.

Your file will need some [front matter](http://jekyllrb.com/docs/frontmatter/) at the top, to specify things like the page layout and permalink. Front matter lives between two sets of `---` marks and looks something like this:

```
---
layout: page
title: Example page
excerpt: This is an example page
permalink: /example-page/
---
```

Below this you can put your page content. You can use [Markdown syntax](https://help.github.com/articles/markdown-basics/) for things like headings and links. It's usually easiest to start by copying and pasting the front matter and content from a similar page and then adapting it to your needs.

If you add a new profile page (e.g. a new charter signatory) then an entry for it will automatically appear on the matching regular page (e.g. the main charter page).

Once you are finished, click `Commit new file` to save it.

**NB: You will need sufficient privileges to add new pages.**

### Editing pages

Navigate to the relevant file and use the `Edit` button (it usually looks like a pencil).

Once you are finished editing, one of two things needs to happen:

1. If you have sufficient privileges then you can choose `Commit changes`. Your changes will go live on the website within a couple of minutes.
2. Otherwise you can choose `Propose file change` followed by `Send pull request`. This will notify the team that you have proposed a change. We will review this ASAP and if everything is ok we will `Merge` to incorporate your changes.

### Uploading images

You will need to use a desktop client to upload images.

Once you are set up, open the client software (e.g. GitHub for Windows) and click `Sync` to get the latest copy of everything from the GitHub servers.

Add any new images to your local copy of the images folder, either:

```
/images/
```

Or the relevant subfolder:

```
/images/projects/
/images/signatories/
```

Please try to give your images sensible filenames!

When you are finished adding images, click `Commit to master` and then `Sync` to upload your files to the GitHub servers.

### Contact

Enquiries to [@clry2](https://github.com/clry2).
