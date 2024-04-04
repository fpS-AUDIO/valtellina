"use strict";

//s
window.addEventListener(`scroll`, (e) => {
  // Update CSS variable to body with current scroll position
  document.body.style.cssText = `--scrollTop: ${this.scrollY}px`;
});
