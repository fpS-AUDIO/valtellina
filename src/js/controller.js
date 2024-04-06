// ----- IMPORTS ----- //

import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import MainView from "./views/mainView.js";
import SliderAnimal from "./views/sliderAnimalsView.js";

// if (module.hot) {
//   module.hot.accept();
// }

// ----- CONTROLLER FUNCTIONS ----- //

const controlUpdateScrollVariable = function (scrollY) {
  // Update CSS variable to body with current scroll position
  document.body.style.cssText = `--scrollTop: ${scrollY}px`;
};

const mainControlSlider = function () {
  SliderAnimal.goToSlide(model.state.slider.currentSlide);
  SliderAnimal.createDots();
  SliderAnimal.activateSliderDot(1);
};

// ----- ENTRY POINT FUNCTION ----- //

const init = function () {
  /**
   * Entry point function based on publish–subscribe pattern
   */
  MainView.addHandlerUpdateScrollVariable(controlUpdateScrollVariable);
  SliderAnimal.addHandelerControlSlider(mainControlSlider);
};

init();
