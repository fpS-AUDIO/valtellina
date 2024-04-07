// class MainView {
//   _parentElement = document.querySelector(`body`);

//   addHandlerUpdateScrollVariable(subscriberFn) {
//     window.addEventListener(`scroll`, (e) => {
//       // make controller update CSS variable to body with current scroll position
//       subscriberFn(window.scrollY);
//     });
//   }
// }

// export default new MainView();

class MainView {
  _parentElement = document.querySelector(`body`);

  addHandlerUpdateScrollVariable(subscriberFn) {
    let isThrottled = false,
      savedArgs;
    window.addEventListener(`scroll`, (e) => {
      if (isThrottled) {
        savedArgs = arguments;
        return;
      }

      subscriberFn(window.scrollY);
      isThrottled = true;

      setTimeout(() => {
        isThrottled = false;
        if (savedArgs) {
          subscriberFn(window.scrollY);
          savedArgs = null;
        }
      }, 5); // Adjust the timeout to control frequency
    });
  }
}

export default new MainView();
