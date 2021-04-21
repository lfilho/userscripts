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
