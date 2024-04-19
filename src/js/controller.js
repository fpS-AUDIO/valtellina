/** -----> TO DO:
 * rebuild sentence section
 * style "focus" state
 * style scroller tab
 *
 */

// ----- IMPORTS ----- //

import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import * as cfg from "./config.js";
import MainView from "./views/mainView.js";
import SliderAnimal from "./views/sliderAnimalsView.js";
import navView from "./views/navView.js";

// if (module.hot) {
//   module.hot.accept();
// }

// ----- HELPER FUNCTIONS ----- //

const findBiggerElement = function () {
  // FUNCTION HELPS FIND OVERFLOW-X ELEMENT
  // get the width of the body
  const bodyWidthStr = window.getComputedStyle(document.body).width;
  const bodyWidthStrInt = parseInt(bodyWidthStr);

  // selecting every element
  const everithing = document.querySelectorAll(`*`);

  console.log(`The width of body is: ${bodyWidthStrInt}px`);

  everithing.forEach((el) => {
    const computedStyle = window.getComputedStyle(el);
    const width = parseInt(computedStyle.width);
    // Get all computed styles of the element
    console.log(`Analazing element with width of ${width}px: ${el}`);
    if (width > bodyWidthStrInt) {
      console.log(`🆘🆘🆘 ----- BIGGER WIDTH -----:`);
      console.dir(el);
      return;
    }

    if (width === bodyWidthStrInt) {
      console.log(`⚠️⚠️⚠️ ----- SAME WIDTH -----:`);
      console.dir(el);
    }
  });
};

const updateCurrentSlide = function (currentSl) {
  model.state.slider.currentSlide = currentSl;
};

const updateSlidesNumber = function (slidesNum) {
  model.state.slider.slidesNumber = slidesNum;
};

// ----- CONTROLLER FUNCTIONS ----- //

const controlUpdateScrollVariable = function (scrollY) {
  // Update CSS variable to body with current scroll position
  document.body.style.cssText = `--scrollTop: ${scrollY}px`;
};

const mainControlSlider = function () {
  // update state with number of slides
  updateSlidesNumber(SliderAnimal.slides.length);

  // update slides view on UI (init position)
  SliderAnimal.goToSlide(model.state.slider.currentSlide);

  // update the active slide
  SliderAnimal.activateSlide(model.state.slider.currentSlide);

  // create dots buttons
  SliderAnimal.createDots();

  // activate the current dot button
  SliderAnimal.activateSliderDot(cfg.STARTING_SLIDE);

  // show the info container
  SliderAnimal.updateInfoContainer(model.state.slider.currentSlide);
};

const mainChangeSlideControl = function (direction) {
  // 1. check for the next slide and update the state

  // 1.1 if direction is a number
  if (typeof direction === `number`) {
    updateCurrentSlide(direction);
    // 1.2 if direction is a pushed button and it's left
  } else if (direction === `left`) {
    // if current slide is the first one, update it to last
    if (model.state.slider.currentSlide === 0)
      updateCurrentSlide(model.state.slider.slidesNumber - 1);
    // if current slide is NOT the first one, update it by descreasing it by one
    else updateCurrentSlide(model.state.slider.currentSlide - 1);

    // 1.3 if direction is a pushed button and it's right
  } else if (direction === `right`) {
    // if current slide is the last one, update it to the first
    if (model.state.slider.currentSlide === model.state.slider.slidesNumber - 1)
      updateCurrentSlide(0);
    // if current slide is NOT the last one, update it by increasing it by one
    else updateCurrentSlide(model.state.slider.currentSlide + 1);
  }

  // 2. update slides view on UI
  SliderAnimal.goToSlide(model.state.slider.currentSlide);

  // 3. update the active slide
  SliderAnimal.activateSlide(model.state.slider.currentSlide);

  // 4. activate slider dot button
  SliderAnimal.activateSliderDot(model.state.slider.currentSlide);

  // 5. update the info slider
  SliderAnimal.updateInfoContainer(model.state.slider.currentSlide);
};

// ----- ENTRY POINT FUNCTION ----- //

const init = function () {
  /**
   * Entry point function based on publish–subscribe pattern
   */
  MainView.addHandlerUpdateScrollVariable(controlUpdateScrollVariable);
  MainView.addHandlerHidescrollDownBtn();
  SliderAnimal.addHandelerControlSlider(mainControlSlider);
  SliderAnimal.addHandleChangeSlide(mainChangeSlideControl);
  SliderAnimal.addHandlerChangeSlidebyButton(mainChangeSlideControl);
  SliderAnimal.addHandlerControlDotsButtons(mainChangeSlideControl);
  navView.addHandlerNavLinks();
  navView.addHandlerStickNavbar();
  // findBiggerElement();
};
init();
