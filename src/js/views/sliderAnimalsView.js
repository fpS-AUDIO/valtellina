//////////////////////
// Slider Component //
//////////////////////

class SliderAnimal {
  slider = document.querySelector(`.slider`);
  slides = document.querySelectorAll(`.slide`);
  slideRightBtn = document.querySelector(`.slider__btn--right`);
  slideLeftBtn = document.querySelector(`.slider__btn--left`);
  sliderDotsContainer = document.querySelector(`.dots`);
  // currentSlide = 2; MODEL
  // slidesNumber = null; MODEL

  goToSlide(slide) {
    this.slides.forEach((sld, indx) => {
      sld.style.transform = `translateX(${100 * (indx - slide)}%)`;
    });
  }

  createDots() {
    // arrow functions do not have their own this but inherit it from the parent scope
    // looping over the slide to create the same number of dots
    this.slides.forEach((_, indx) => {
      // insert actual html inside the container with data-slide=index
      this.sliderDotsContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots__dot" data-slide="${indx}"></button>`
      );
    });
  }

  goToNextSlide() {
    if (this.currentSlide === this.slidesNumber - 1) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
    goToSlide(this.currentSlide);
    activateSliderDot(this.currentSlide);
  }

  goToPreviousSlide() {
    if (currentSlide === 0) {
      this.currentSlide = this.slidesNumber - 1;
    } else {
      this.currentSlide--;
    }
    goToSlide(this.currentSlide);
    activateSliderDot(this.currentSlide);
  }

  activateSliderDot(slide) {
    // selecting all existing slider dots and remove active class from all of them
    document.querySelectorAll(`.dots__dot`).forEach((dot) => {
      dot.classList.remove(`dots__dot--active`);
    });
    // select the dot basing of the given data-attribute and add the active class to this dot
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active`);
  }

  addHandelerControlSlider(subscriberFn) {
    subscriberFn();
  }

  addHandelerNextSlide(subscriberFn) {
    slideRightBtn.addEventListener(`click`, goToNextSlide);
  }
  addHandelerPrevSlide(subscriberFn) {
    slideLeftBtn.addEventListener(`click`, goToPreviousSlide);
  }
}

export default new SliderAnimal();

// // everything is in the separe function to not pollute the global namespace
// const slider = function () {

//   // --- event handlers ---

//   document.addEventListener(`keydown`, function (e) {
//     if (e.key === `ArrowRight`) goToNextSlide();
//     if (e.key === `ArrowLeft`) goToPreviousSlide();
//     // e.key === `ArrowLeft` && goToPreviousSlide();
//   });

//   // using event delegation
//   sliderDotsContainer.addEventListener(`click`, function (e) {
//     if (!e.target.classList.contains(`dots__dot`)) return;
//     // get data-slide of target element
//     const slideNumber = e.target.dataset.slide;
//     // got to that data-slide number
//     goToSlide(slideNumber);
//     activateSliderDot(slideNumber);
//   });
// };

// slider();
