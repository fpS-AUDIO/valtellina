class MainView {
  _parentElement = document.querySelector(`body`);

  addHandlerUpdateScrollVariable(subscriberFn) {
    window.addEventListener(`scroll`, (e) => {
      // make controller update CSS variable to body with current scroll position
      subscriberFn(window.scrollY);
    });
  }
}

export default new MainView();
