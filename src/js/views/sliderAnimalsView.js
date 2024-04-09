//////////////////////
// Slider Component //
//////////////////////

class SliderAnimal {
  wrapper = document.querySelector(`.animals-slider--wrapper`);
  slider = document.querySelector(`.slider`);
  slides = document.querySelectorAll(`.slide`);
  slideRightBtn = document.querySelector(`.slider__btn--right`);
  slideLeftBtn = document.querySelector(`.slider__btn--left`);
  sliderDotsContainer = document.querySelector(`.dots`);
  infoWrapper = document.querySelector(`.slider-info`);
  infoSlides = document.querySelectorAll(`.info-slide`);

  goToSlide(slide) {
    this.slides.forEach((sld, indx) => {
      sld.style.transform = `translateX(${100 * (indx - slide)}%) scale(0.6)`;
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

  activateSlide(currentSlide) {
    // deactivate all slides
    this.slides.forEach((slide) => slide.classList.remove(`activeSlide`));

    // spread nodeList into array and check for the current slide
    const activeSlide = [...this.slides].filter((slide) => {
      return slide.classList.contains(`slide--${currentSlide + 1}`);
    });

    if (!activeSlide) return;

    // index 0 because the filter returns array
    activeSlide[0].classList.add(`activeSlide`);
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

  updateInfoContainer(numContainer) {
    // first add hidden class to all slides
    this.infoSlides.forEach((slide) => slide.classList.add(`hidden`));

    // then search for the correct slide and remove hidden class
    const currentSlider = this.infoWrapper.querySelector(
      `.slider-info--${numContainer + 1}`
    );
    currentSlider.classList.remove(`hidden`);
  }

  // ----- handlers ----- //

  addHandelerControlSlider(subscriberFn) {
    subscriberFn();
  }

  addHandleChangeSlide(subscriberFn) {
    this.wrapper.addEventListener(`click`, (e) => {
      // check for clicked button next/prev
      const btn = e.target.closest(`.slider__btn`);
      if (!btn) return;

      if (btn.classList.contains(`slider__btn--left`)) {
        subscriberFn(`left`);
      } else if (btn.classList.contains(`slider__btn--right`)) {
        subscriberFn(`right`);
      }
    });
  }

  addHandlerChangeSlidebyButton(subscriberFn) {
    document.addEventListener(`keydown`, function (e) {
      if (e.key === `ArrowRight`) subscriberFn(`right`);
      if (e.key === `ArrowLeft`) subscriberFn(`left`);
    });
  }

  addHandlerControlDotsButtons(subscriberFn) {
    this.sliderDotsContainer.addEventListener(`click`, function (e) {
      if (!e.target.classList.contains(`dots__dot`)) return;
      // get data-slide of target element
      const slideNumber = e.target.dataset.slide;

      // pass to controller (transformer to number)
      subscriberFn(+slideNumber);
    });
  }
}

export default new SliderAnimal();
