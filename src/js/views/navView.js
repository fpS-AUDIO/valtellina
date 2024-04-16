class NavView {
  _parentElement = document.querySelector(`.nav`);
  _scrollDowbBtn = document.querySelector(`.scroll-down-btn--link`);
  _header = document.querySelector(`.header-container`);
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

  addHandlerStickNavbar() {
    // making an oberver which observe the header element
    // and adds the .sticky class to the .nav when header is not visible

    // defining the callback for headerObserver
    const addRemoveSticky = (entries) => {
      // same as "const entry = entries[0]" but using destructuring
      const [entry] = entries;
      // if header is not intersecting the viewport add .sticky class to the .nav
      // else remove the .sticky class from the .nav
      if (!entry.isIntersecting) this._parentElement.classList.add(`sticky`);
      else this._parentElement.classList.remove(`sticky`);
    };

    // calculate the height of this._parentElement to the dinamically add margin to the options object
    // const navBarHeight = this._parentElement.getBoundingClientRect().height;

    // defining options object for headerObserver
    const headerObserverOptions = {
      root: null,
      threshold: 0,
      // rootMargin: `-${navBarHeight}px`,
    };

    // defining the observer
    const headerObserver = new IntersectionObserver(
      addRemoveSticky,
      headerObserverOptions
    );

    // start observing the .header
    headerObserver.observe(this._header);
  }
}

export default new NavView();
