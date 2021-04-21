// ==UserScript==
// @name         waitForElements
// @version      0.1
// @exclude      *
// @description  MutationObserver to wait for DOM elements. Always returns an array.
// @author       Luiz Filho
// @downloadURL  https://github.com/lfilho/userscripts/raw/main/lib/wait_for_elements.js
// @updateURL    https://github.com/lfilho/userscripts/raw/main/lib/wait_for_elements.js
// @license      MIT
// ==/UserScript==
/* eslint-disable no-unused-vars */
function waitForElements(selector) {
  return new Promise(resolve => {
    const elements = [...document.querySelectorAll(selector)];

    if (elements.length > 0) {
      resolve(elements);
      return;
    }

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        const nodes = [...mutation.addedNodes];
        for (const node of nodes) {
          if (node.matches && node.matches(selector)) {
            observer.disconnect();
            resolve([...document.querySelectorAll(selector)]);
            return;
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
