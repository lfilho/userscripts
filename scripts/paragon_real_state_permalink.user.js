// ==UserScript==
// @name         Paragon real state permalink
// @version      0.1
// @description  Adds a permalink to paragon's listings so we can share with realtors, spouses, etc
// @author       Luiz Filho
// @match        https://bcres.paragonrels.com/publink/*
// @icon         https://www.google.com/s2/favicons?domain=paragonrels.com
// @downloadURL  https://openuserjs.org/install/lfilho/Paragon_real_state_permalink.user.js
// @updateURL    https://openuserjs.org/install/lfilho/Paragon_real_state_permalink.user.js
// @grant        none
// @license      MIT
// ==/UserScript==

(() => {
  const rows = [
    ...window.frames['left'].document.querySelectorAll(
      'tr.GridAltRow, tr.GridRow, tr.GridHiRow'
    ),
  ];
  const guid = new URL(document.location).searchParams.get('GUID');

  rows.forEach(row => {
    try {
      const subject = JSON.parse(decodeURIComponent(row.dataset.subject));
      const listingKey = subject.listingKey;
      const externalLink = `https://bcres.paragonrels.com/publink/Report.aspx?outputtype=HTML&GUID=${guid}&ListingID=${listingKey}:0&Report=Yes&view=29&layout_id=65&screenWidth=1318`;
      const newColumn = `<td><a href=${externalLink} target="_blank">⚓︎</a></td>`;
      row.insertAdjacentHTML('afterbegin', newColumn);
    } catch {
      console.error('Row subject seems invalid');
    }
  });
})();
