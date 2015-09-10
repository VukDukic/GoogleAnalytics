# GoogleAnalytics
Sample code and notes

Implementation (The Code)

The code below will allow you to improve your reporting by passing the traffic source information into Salesforce every time a form is submitted.

Setup the following 5 fields in Salesforce:
Medium
Source
Campaign
Content
Term
Here’s sample code (“xxxxxxx” represents the database id/api name of the custom field, depending on your salesforce mapping):
<input type="hidden" name="txt_medium" id="xxxxxxx" value="" />
<input type="hidden" name="txt_source" id="xxxxxxx" value="" />
<input type="hidden" name="txt_campaign_name" id="xxxxxxx" value="" />
<input type="hidden" name="txt_term" id="xxxxxxx" value="" />
<input type="hidden" name="txt_content" id="xxxxxxx" value="" />
Update all forms to contain the same 5 fields created in step 1 (they should be hidden so they aren’t shown to the user).
Values for the hidden fields can be read from the GA cookie __utmz. The code below will parse out the campaign variables from the GA cookies and make them available in 5 variables.
Logic should be put in place within the form to pass the values of the hidden fields to their corresponding fields within Salesforce when the form is submitted.
Place the following code on every page on your website that has a Salesforce form before the closing </body> tag.
<script type="text/javascript">
var z = _uGC(document.cookie, '__utmz=', ';');
var source = _uGC(z, 'utmcsr=', '|');
var medium = _uGC(z, 'utmcmd=', '|');
var term = _uGC(z, 'utmctr=', '|');
var content = _uGC(z, 'utmcct=', '|');
var campaign = _uGC(z, 'utmccn=', '|');
var gclid = _uGC(z, 'utmgclid=', '|');
if (gclid !="-") {
 source = 'google';
 medium = 'cpc';
}

var csegment = _uGC(document.cookie, '__utmv=', ';');
if (csegment != '-') {
 var csegmentex = /[1-9]*?\.(.*)/;
 csegment = csegment.match(csegmentex);
 csegment = csegment[1];

} else {
 csegment = '';
}

function _uGC(l,n,s)
{
if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
var i,i2,i3,c="-";
i=l.indexOf(n);
i3=n.indexOf("=")+1;
if (i > -1) {
i2=l.indexOf(s,i); if (i2 < 0){ i2=l.length; }
c=l.substring((i+i3),i2);
}
return c;
}

document.getElementById("txt_medium").value =medium; /* Campaign_Medium */
document.getElementById("txt_source").value =source; /* Campaign_Source */
document.getElementById("txt_campaign_name").value =campaign; /* Campaign_CampaignName */
document.getElementById("txt_term").value =term; /* Campaign_Term */
document.getElementById("txt_content").value =content; /* Campaign_Content */

</script>
After implementing this code you can test one of the forms on your site and this is what you should see in Salesforce:

Salesforce Google Analytics Fields

Success

Congratulations! You are now pulling reports in Salesforce and accurately determine what traffic sources are resulting in opportunities, qualified leads, and customers.  Now you have a more accurate understanding of the true ROI of your marketing activities.

(Keep in mind that when testing to clear your cache, cause any previous cookies or tags associated with your site will reflect in the form submission.)

The following is a report we have helped many of our customers work towards, which is mapping their Salesforce lead/customer data to their advertising spend.  This report shows the ROI and cost per qualified lead for each of their marketing channels.

salesforce google analytics marketing dashboard

A Note About Autotagging/AdWords

If you are trying to analyze the impact of your AdWords campaigns, you may notice that in Salesforce all of the Keywords, Content, and Campaign information is missing. This will happen if you have AdWords set to use autotagging. If this is the case, the default implementation provided above will not be able to pass anything more detailed, because the AdWords information is hidden in the GCLID, which is not decoded until later in Google Analytics.

If this information is important you have two options:

You can disable autotagging and use manual tagging
You can customize our code to accept customer parameters, which you can append to all of your destination URLS.
Advanced Implementations

Qualified Lead Behavior in Google Analytics
Marketers, get ready to have your mind blown! The number one question every business has is, “How can we get more business?” One of the keys to answering this question is to understand the common traits of your buyers. “How did we close you?” so we can do more of that.

With this integration, by associating a unique identifier with visitors in Google Analytics and passing that info to Salesforce, you can easily filter for this unique identifier (if you have goals set up) by using their built-in advanced segment of converting visits. What does that mean? That’s right, you’ll be able to see what your qualified leads did on your site!

But if your conversion is a form submission or contact email for example, what you cannot do though is create a segment of only your qualified leads or actual customers, as it will likely be filled with spam leads and non-qualified leads. We can solve this with a bit of code.

Our friend Justin Cutroni details in his blog post here how to store the unique ID that Google Analytics generates into a custom variable.  By reading the __utma cookie, we can extract this ID and send it to Google Analytics and also send this key into Salesforce. By placing this code on all Salesforce form pages on your site and passing it into both Google Analytics and Salesforce we will now have a key between the two systems to tie visitors together!

Now, in Salesforce you can create reports of qualified leads, customers, or any other customer grouping and extract these unique ID’s, then take these unique ID’s and create advanced segments for each of these groupings like so:

salesforce leads field custom variable

google analytics advanced segment custom variables

First Touch Attribution
Almost every Google Analytics report (except for Multichannel Funnels) is built on a last touch attribution model. Meaning, when you create reports or segments for converting elements, only the last traffic source is being tied to it. This is the same for our Salesforce / Google Analytics implementation that is provided above.

If you need insight on first touch campaigns and marketing channels, with some minor modifications, you can pass this along. Conceptually, this works best when you pass and store this information from the Google Analytics cookies into your database. Every time, that user re-authenticates and fills out a form, you can read this information from your backend and pass it into Salesforce using hidden fields.

Conclusion: 360 Customer View

The integrations mentioned above allow you to get closer to a 360 view of all of your customers and leads. By passing your visitors campaign and marketing channel information from Google Analytics into Salesforce, you will be able to report on the ROI and Cost Per Qualified Lead, which are two metrics every lead oriented business should have. By using the advanced implementations you can pass more information into Salesforce and create segments of your visitors based on information that is learned from them in Salesforce.

We have done many custom implementations of Salesforce and Google Analytics and with marrying both systems to other data sources.  The true power in it is architecting a solution that meets your needs.
