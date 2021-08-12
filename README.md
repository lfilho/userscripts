# My personal collection of userscripts

If you don't what a userscript is, check [here](https://en.wikipedia.org/wiki/Userscript), including the "external links" section with plenty of sample userscripts.

## How to install scripts

1. Install Tampermonkey extension on your browser: https://www.tampermonkey.net/. If you already have the extension, you can skip this step for future times.
2. Click on a userscript's link below (they always end in `.user.js`) to install it
3. Make sure the script/Tampermonkey are configured to check for updates
4. Reload the page it's supposed to work on

## Scripts

### `google_calendar_just_open_zoom_already.user.js`

**Problem:** You use google calendar and Zoom's desktop client. When you click a zoom link in Google Calendar, Google adds a layer of redirection through their own servers AND open a new tab before sending you to the Zoom client - stealing a second or two from you AND leaving that tab open for you to close after.

**Solution:** This userscript intercepts clicks to that link and will open the Zoom client directly, saving you those seconds and from having to close that dangling tab.

### `paragon_real_state_permalink.user.js`

**Problem:** Your hunting for real state and your realtor has got you using Paragon. Their UI/UX is terrible. No permalinks, no opening links in new tabs, no links to Google Maps...

**Solution:** This user scripts adds all of the above.
