<!-- To add Google Analytics data to a data warehouse you need to add some type of primary key to Google Analytics. In most of the work that I’ve done this key is a visitor ID. This anonymous identifier usually comes from some other system like a CRM.

When we add the customer ID to Google Analytics we store in a visitor scoped custom variable. This means that the ID is stored in a cookie on the visitor’s machine. We normally set the cookie when the visitor makes a purchase or logs into the site. Basically any time we can positively identify the visitor.

For the sake of this example I’m going to use a little piece of JavaScript to create a unique ID for visitors. I’m actually going to extract a unique ID from the Google Analytics __utma cookie. Then I’m going to set the unique ID in a custom variable, specifically in Custom Variable slot 5.



NOTE: The function _ugc() is a generic function that get’s a cookie value. In this case it’s extracting part of the __utma cookie.
-->
