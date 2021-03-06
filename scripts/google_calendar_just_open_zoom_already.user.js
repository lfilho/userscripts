// ==UserScript==
// @name         Google Calendar, just open Zoom already!
// @version      1.1.0
// @description  Instead of opening a new tab and then redirecting you to Zoom (leaving an tab for you to close later), open Zoom directly.
// @author       Luiz Gonzaga dos Santos Filho
// @match        https://calendar.google.com/calendar/*
// @icon         https://icons.duckduckgo.com/ip2/google.com.ico
// @downloadURL  https://github.com/lfilho/userscripts/raw/main/scripts/google_calendar_just_open_zoom_already.user.js
// @updateURL    https://github.com/lfilho/userscripts/raw/main/scripts/google_calendar_just_open_zoom_already.user.js
// @grant        none
// ==/UserScript==
//
// CHANGELOG
// v1.1.0
// - Added support for plain zoom urls (without google redirection preprended to it)

(() => {
  const ZOOM_WEB_LINK_PATTERNS = [
    new RegExp('^https://www.google.com/url\\?q=https://coursera.zoom.us/j/(\\d+)'),
    new RegExp('^https://coursera.zoom.us/j/(\\d+)'),
  ];
  const ZOOM_DESKTOP_LINK_PATTERN = 'zoommtg://zoom.us/join?confno=';

  function interceptZoomClick(e) {
    const target = e.target || e.srcElement;

    if (target.tagName === 'A') {
      const href = target.getAttribute('href');

      const meetingId = ZOOM_WEB_LINK_PATTERNS.map(pattern => href.match(pattern)?.[1])
        .filter(Boolean)
        .pop();

      const isZoomLink = !!meetingId;

      if (isZoomLink) {
        e.preventDefault();

        target.href = `${ZOOM_DESKTOP_LINK_PATTERN}${meetingId}`;
        target.removeAttribute('target'); // needed so the default taget="_blank" don't force-open a new tab
        target.click();
      }
    }
  }

  document.addEventListener('click', interceptZoomClick);
})();
