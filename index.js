const majorButton = document.getElementById("stats-major");
const bigEventsButton = document.getElementById("stats-big-events");
const majorPopup = document.getElementById("major-popup");
const majorMainPopup = document.getElementById("major-main-popup");
const bigEventsPopup = document.getElementById("big-events-popup");
const bigEventsMainPopup = document.getElementById("big-events-main-popup");
const overlay = document.getElementById("popup-overlay");
const body = document.body;

const auxOpenPopup = () => {
  body.style.overflow = "hidden";
  window.scroll(0, 0);
  overlay.style.display = "block";
};

// MAJOR POPUP

majorButton.addEventListener("click", () => {
  majorPopup.style.display = "flex";
  majorMainPopup.style.cssText =
    "animation:slide-in .5s; animation-fill-mode: forwards";
  auxOpenPopup();
});

majorPopup.addEventListener("click", (event) => {
  const classNameOfClickedElement = event.target.classList[0];
  const classNames = ["close-btn", "popup-overlay"];
  const shouldClosePopUp = classNames.some(
    (className) => className === classNameOfClickedElement
  );

  if (shouldClosePopUp) {
    if (window.innerWidth < 1600) {
      majorMainPopup.style.cssText =
        "animation:slide-out .5s; animation-fill-mode: forwards";
    } else {
      majorMainPopup.style.cssText =
        "animation:slide-out200 .5s; animation-fill-mode: forwards";
    }
    setTimeout(() => {
      majorPopup.style.display = "none";
      overlay.style.display = "none";
    }, 500);
  }
  body.style.overflow = "auto";
});

// BIG EVENTS POPUP
bigEventsButton.addEventListener("click", () => {
  bigEventsPopup.style.display = "flex";
  bigEventsMainPopup.style.cssText =
    "animation:slide-in .5s; animation-fill-mode: forwards";
  auxOpenPopup();
});

bigEventsPopup.addEventListener("click", (event) => {
  const classNameOfClickedElement = event.target.classList[0];
  const classNames = ["close-btn", "popup-overlay"];
  const shouldClosePopUp = classNames.some(
    (className) => className === classNameOfClickedElement
  );

  if (shouldClosePopUp) {
    bigEventsMainPopup.style.cssText =
      "animation:slide-out .5s; animation-fill-mode: forwards";
    setTimeout(() => {
      bigEventsPopup.style.display = "none";
    }, 500);
  }
  body.style.overflow = "auto";
});
