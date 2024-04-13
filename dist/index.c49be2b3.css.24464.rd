.header-container {
  position: relative;
}

.header-container:after {
  content: "";
  z-index: 100;
  height: calc(var(--index) * 18);
  bottom: calc(var(--index) * -8);
  filter: drop-shadow(0 10px 10px #00000080);
  background-image: url("after-header.89b3b325.webp");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  position: absolute;
}

.header-container .layers {
  justify-content: center;
  align-items: center;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
}

.header-container .layer {
  will-change: transform;
  z-index: 2;
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
  position: absolute;
}

.header-container .layer__base {
  transform: translate3d(0, calc(var(--scrollTop) / 1.5), 0);
  z-index: 0;
  background-image: url("layer-base.767eb40c.webp");
}

.header-container .layer__middle {
  transform: translate3d(0, calc(var(--scrollTop) / 2.5), 0);
  background-image: url("layer-middle.fdb4ab95.webp");
}

.header-container .layer__front {
  transform: translate3d(0, calc(var(--scrollTop) / 8), 0);
  background-image: url("layer-front.8868182b.webp");
}

.header-container .layer__header {
  z-index: 1;
  transform: translate3d(0, calc(var(--scrollTop) / 1.2), 0);
}

.header-container .layer__caption {
  margin-top: -12.8rem;
}

.header-container .title--primary, .header-container .title--secondary {
  color: var(--color-nearly-white);
  text-shadow: 0 0 2px #000;
}

.nav {
  z-index: 10;
  background-color: #0ff;
  position: absolute;
  top: 0;
}
/*# sourceMappingURL=index.c49be2b3.css.map */
