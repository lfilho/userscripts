// ==UserScript==
// @name         Paragon real state permalink
// @version      0.2
// @description  Adds a permalink to paragon's listings so we can share with realtors, spouses, etc
// @author       Luiz Filho
// @match        https://bcres.paragonrels.com/publink/*
// @icon         https://www.google.com/s2/favicons?domain=paragonrels.com
// @downloadURL  https://github.com/lfilho/userscripts/raw/main/scripts/paragon_real_state_permalink.user.js
// @updateURL    https://github.com/lfilho/userscripts/raw/main/scripts/paragon_real_state_permalink.user.js
// @grant        none
// @license      MIT
// ==/UserScript==

(async () => {
  await sleep(2000);

  addPermalinks();

  addGoogleMapsLinks();

  function addGoogleMapsLinks() {
    const addressDiv = window.frames.fraDetail.document.elementFromPoint(
      150,
      15
    );
    const postalCodeDiv = window.frames.fraDetail.document.elementFromPoint(
      316,
      56
    );
    const address = [addressDiv, postalCodeDiv]
      .map(el => el.innerText)
      .join(', ');

    const googleMapsLink = `<a href="https://www.google.com/maps/search/${address}" target="_blank">📍</a>`;

    addressDiv.insertAdjacentHTML('beforeend', googleMapsLink);
  }

  function addPermalinks() {
    const rows = [
      ...window.frames.left.document.querySelectorAll(
        'tr.GridAltRow, tr.GridRow, tr.GridHiRow'
      ),
    ];
    const guid = new URL(document.location).searchParams.get('GUID');

    rows.forEach(row => {
      try {
        const subject = JSON.parse(decodeURIComponent(row.dataset.subject));
        const listingKey = subject.listingKey;
        const externalUrl = `https://bcres.paragonrels.com/publink/Report.aspx?outputtype=HTML&GUID=${guid}&ListingID=${listingKey}:0&Report=Yes&view=29&layout_id=65&screenWidth=1318`;
        const externalLink = `<a href=${externalUrl} target="_blank">🏠</a>&nbsp;`;
        row.querySelector('td').insertAdjacentHTML('afterbegin', externalLink);
      } catch {
        console.error('Row subject seems invalid');
      }
    });
  }

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
})();
