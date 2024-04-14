class NavView {
  _parentElement = document.querySelector(`.nav`);
  _scrollDowbBtn = document.querySelector(`.scroll-down-btn--link`);
  _checkBoxBtn = document.getElementById(`id-menu-btn`);

  addHandlerNavLinks(subscriberFn) {
    [this._parentElement, this._scrollDowbBtn].forEach((el) =>
      el.addEventListener(`click`, (e) => {
        // checking if the actual link was clicked
        const triggerLink = e.target.closest(`.nav__link`);
        if (!triggerLink) return;

        // preventing default behavior of links
        e.preventDefault();

        // get href attribute of trigger
        const hrefAttr = triggerLink.getAttribute(`href`);

        // scroll to the interested section
        document.querySelector(hrefAttr).scrollIntoView({ behavior: `smooth` });

        // remove te 'checked' attr from checkbox to close the menu in small screens
        this._checkBoxBtn.checked = false;
      })
    );
  }
}

export default new NavView();
