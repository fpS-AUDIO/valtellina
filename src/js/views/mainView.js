class MainView {
  // Selects the <body> element as the main element of interest for this view.
  _parentElement = document.querySelector(`body`);
  _header = document.querySelector(`.header-container`);
  _headerHeight = this._header.getBoundingClientRect().height;
  _scrollDownBtn = document.querySelector(`.scroll-down-btn--link`);

  // helper function toggle hidden class on _scrollDownBtn
  showHidescrollDownBtn() {}

  // Adds a handler function that updates a variable based on the scroll position.
  addHandlerUpdateScrollVariable(subscriberFn) {
    // initializes a variable to hold the last known scroll position
    let lastScrollY = window.scrollY;
    // flag to indicate whether an update has already been scheduled
    let ticking = false;

    // This function is called whenever the user scrolls.
    const onScroll = () => {
      // Updates `lastScrollY` with the current scroll position.
      lastScrollY = window.scrollY;
      // Requests an animation frame to update the scroll variable if not already requested.

      // guard clause to exit function header is not more visible because of scrolling down
      // using cached height for performance
      if (lastScrollY > this._headerHeight) return;

      requestTick();
    };

    // Requests an update (if not already in progress) to process changes.
    const requestTick = () => {
      // If an update hasn't been scheduled yet, it schedules one.
      if (!ticking) {
        requestAnimationFrame(update);
      }
      // Sets the flag indicating that an update has been scheduled.
      ticking = true;
    };

    // The update function, called once per animation frame.
    const update = () => {
      // Resets the ticking flag to allow further updates to be scheduled.
      ticking = false;
      // Calls the subscriber function with the latest scroll position.
      subscriberFn(lastScrollY);
    };

    // Adds the scroll event listener to the window, triggering `onScroll` on scroll events.
    window.addEventListener("scroll", onScroll);
  }

  addHandlerHidescrollDownBtn() {
    const observerCallback = (entries, observer) => {
      const [entry] = entries;
      if (entry.isIntersecting) this._scrollDownBtn.classList.remove(`hidden`);
      if (!entry.isIntersecting) this._scrollDownBtn.classList.add(`hidden`);
    };

    const observerOptions = {
      root: null,
      threshold: 0.85,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    observer.observe(this._header);
  }

  
}

export default new MainView();
