<?php
# Author: John Gardner
# Date:   7th June 2007
# From:   http://www.braemoor.co.uk/software/passwords.php

# ******************************************************************************

#  THIS SECTION SHOULD BE MODIFIED TO REFLECT YOUR REQUIREMENTS
#  ============================================================

# Set up the password strings and associated URLs. Note that all the elements of 
# this hash list but the last MUST be separated by commas. You may have as many
# password => URL combinations as you wish.
$urlList = array ('xyzzy'  => 'valid.html',
                  'abcdef' => 'valid.html',
                  '123456' => 'valid.html'
           );

# Set up the invalid password URL - this should also be set up in the JavaScript  
$invalidURL = 'invalid.html';

# The cookie name - this should be the same as in the JavaScript
$cookieName = 'validpassword';

# ******************************************************************************

# If there is nothing in the form's submit field, this is the first time in. 
# Simply display the form and await the user's input. Othwerwise, pick up the 
# password from the form.

if (isset ($_POST['submit']) && strlen($_POST['password']) > 0) {
  
  # See if the password provided by the user exists in the list.
  if (array_key_exists ($_POST['password'], $urlList)) {

    # Password found - first set the cookie 
    setcookie ($cookieName, 0, NULL,'/');
    
    # Now go to the page associated with the password.
    header ("Location: " . $urlList[$_POST['password']]);
  }
  else {

    # Password not found - go to the 'invalid password' page
    header ("Location: " . $invalidURL);
  }
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html  lang="en-GB" xmlns="http://www.w3.org/1999/xhtml">

<head>
<title>PHP Test Script for Password Protecting a Web Site</title>
<meta name="description" content="PHP Test Script for Password Protecting Web Pages" />
<meta http-equiv="Content-Language" content="en-gb" />
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
<meta name="author" content="John Gardner" />
<meta name="copyright" content="2007-2007 John Gardner" />
<meta name="robots" content="noindex, nofollow" />
<meta name="rating" content="General" />
<link rel="stylesheet" type="text/css" href="passwordstest.css" />
</head>

<body>

<div id="rh-col">
<p class="pageheading">Test PHP Script for Password Protecting Web Pages</p>

<p>This simple test PHP script demonstrates how you can provide password 
protection for part of a web site, when you do not have access to your web 
server's implementation of the HTTP basic authentication scheme. It works in 
conjunction  with a JavaScript function which is called in the header of each 
protected web page. See 
<a href="htttp://www.braemoor.co.uk/software/passwords.php">htttp://www.braemoor.co.uk/software/passwords.php</a>
for more details.</p>

<p>The functionality protects against a casual attempt to access protected 
pages, but because it requires JavaScript to be enabled in the user's browser, 
it shouldn't be considered for anything where security is a critical issue,
although the user would need to know the specific URI of the protected page in
order to access it, as it would not be referenced directly by any page.</p>

<form id="myform" action="passwordstest.php" method="post">
<p>Try it: (passwords are <span style="color: #ff0000;">xyzzy, abcdef, 123456):</span> 
<span style="color: #ff0000; margin-left: 20px;">Enter password: 
<input type="password" name="password" maxlength="12" size="12" style="margin-left: 10px;" />
<input type="submit" name="submit" value="submit" style="margin-left: 30px; color: #f00;" />
</span></p>
</form>

<p>The normal route through the PHP script when called as above simply checks 
the given password against one contained within a list, and displays either  
the required entry web page of the protected part of the site, or reports that 
an invalid password has been given. The script allows for as many multiple 
passwords / entry web page combinations as may be required.</p>

</div>
</body>
</html>