// ==UserScript==
// @name         Paragon real state permalink
// @version      0.5
// @description  Adds a permalink to paragon's listings so we can share with realtors, spouses, etc
// @author       Luiz Filho
// @match        https://bcres.paragonrels.com/publink/*
// @icon         https://www.google.com/s2/favicons?domain=paragonrels.com
// @downloadURL  https://github.com/lfilho/userscripts/raw/main/scripts/paragon_real_state_permalink.user.js
// @updateURL    https://github.com/lfilho/userscripts/raw/main/scripts/paragon_real_state_permalink.user.js
// @run-at       document-end
// @grant        none
// @license      MIT
// ==/UserScript==

/* global $*/

(async () => {
  await sleep(200);

  const isMenu = window.self.name === 'left';
  const isDetailPage = window.self.name === 'fraDetail';
  const isStandalonePage = window.self === window.top;

  if (isMenu) {
    addPermalinks();
  }
  if (isDetailPage || isStandalonePage) {
    addGoogleMapsLinks();
  }
  if (isStandalonePage) {
    fixSlideshow();
  }

  function fixSlideshow() {
    const newSlideshowHandler = element => {
      const $this = $(element.currentTarget);
      let index = parseInt($this.attr('firstImage'), 10) - 1;
      index = index < 0 ? 0 : index;

      let title = 'Listing ';
      const listingId = $this.attr('listingid');
      const displayId = $this.data('displayId') || listingId;
      if (displayId != null) {
        title += '#' + displayId;
      }
      let height = $(window).height();
      height = height > 625 ? 575 : height - 50;
      const currentLocation = new URL(window.location);
      const guid = currentLocation.searchParams.get('GUID');
      const slideshowUrl = `/Publink/Search/SlideShow2.aspx?GUID=${guid}`;
      const newUrl = `${slideshowUrl}&listingId=${listingId}&index=${index}&callingWindow=""`;
      $.fn.colorbox({
        href: newUrl,
        open: true,
        iframe: true,
        width: 850,
        height: height,
        title: title,
        close:
          '<button id="Print">Print</button><button id="Close">Close</button>',
        onClosed: false,
      });
    };

    document.querySelectorAll('img[rel^=slideshow]').forEach(el => {
      el.addEventListener('click', newSlideshowHandler);
    });
  }

  function addGoogleMapsLinks() {
    const addressDiv = document.elementFromPoint(150, 15);
    const postalCodeDiv = document.elementFromPoint(316, 56);
    const address = [addressDiv, postalCodeDiv]
      .map(el => el.innerText)
      .join(', ');

    const googleMapsLink = `<a href="https://www.google.com/maps/search/${address}" target="_blank">📍</a>`;

    addressDiv.insertAdjacentHTML('beforeend', googleMapsLink);
  }

  function addPermalinks() {
    const rows = [
      ...document.querySelectorAll('tr.GridAltRow, tr.GridRow, tr.GridHiRow'),
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
