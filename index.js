const majorButton = document.getElementById("stats-major");
const bigEventsButton = document.getElementById("stats-big-events");
const majorPopup = document.getElementById("major-popup");
const majorMainPopup = document.getElementById("major-main-popup");
const bigEventsPopup = document.getElementById("big-events-popup");
const bigEventsMainPopup = document.getElementById("big-events-main-popup");
let overlay = document.getElementById("popup-overlay");
const body = document.body;

const info = () => {
  var tooltips = document.querySelectorAll(".tooltip");
  for (let i = 0; i < tooltips.length; ++i) {
    var infoButton = document.createElement("span");
    infoButton.innerHTML = `<span class='material-icons-outlined'>info</span>`;

    while (infoButton.firstChild) {
      tooltips[i].appendChild(infoButton.firstChild);
    }
  }
}

info();

const auxOpenPopup = () => {
  const allPopups = document.querySelectorAll(".popup");
  for (const popup of allPopups) {
    popup.style.top = `${window.pageYOffset + 10}px`;
  }
  overlay.style.top = `${window.pageYOffset}px`;
  body.style.overflow = "hidden";
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
  const classNames = ["close-btn", "popup", "popup-overlay"];
  console.log(classNameOfClickedElement);
  const shouldClosePopUp = classNames.some(
    (className) => className === classNameOfClickedElement
  );

  if (shouldClosePopUp) {
    if (window.innerWidth < 1000 || window.innerWidth > 1600) {
      majorMainPopup.style.cssText =
        "animation:slide-out200 .5s; animation-fill-mode: forwards";
    } else {
      majorMainPopup.style.cssText =
        "animation:slide-out .5s; animation-fill-mode: forwards";
    }
    setTimeout(() => {
      majorPopup.style.display = "none";
      body.style.overflow = "auto";
      overlay.style.display = "none";
    }, 500);
  }
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
  const classNames = ["close-btn", "popup-overlay", "popup"];
  const shouldClosePopUp = classNames.some(
    (className) => className === classNameOfClickedElement
  );

  if (shouldClosePopUp) {
    if (window.innerWidth < 1600) {
      bigEventsMainPopup.style.cssText =
        "animation:slide-out .5s; animation-fill-mode: forwards";
    } else {
      bigEventsMainPopup.style.cssText =
        "animation:slide-out200 .5s; animation-fill-mode: forwards";
    }
    setTimeout(() => {
      bigEventsPopup.style.display = "none";
      body.style.overflow = "auto";
      overlay.style.display = "none";
    }, 500);
  }
});
