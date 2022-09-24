const majorButton = document.getElementById("stats-major");
const bigEventsButton = document.getElementById("stats-big-events");
const majorPopup = document.getElementById("major-popup");
const majorMainPopup = document.getElementById("major-main-popup");
const bigEventsPopup = document.getElementById("big-events-popup");
const bigEventsMainPopup = document.getElementById("big-events-main-popup");
let overlay = document.getElementById("popup-overlay");
const body = document.body;

// TOOLTIP ICONS

const info = () => {
  var tooltips = document.querySelectorAll(".tooltip");
  for (let i = 0; i < tooltips.length; ++i) {
    var infoButton = document.createElement("span");
    infoButton.innerHTML = `<span class='material-icons-outlined info-icon'>info</span>`;

    while (infoButton.firstChild) {
      tooltips[i].appendChild(infoButton.firstChild);
    }
  }
};

info();

// TOOLTIPS ON MOBILE
if (window.innerWidth < 1000) {
  const tooltips = document.querySelectorAll("h4[title]");

  for (let i = 0; i < tooltips.length; ++i) {
    const auxTool = () => {
      const toolTipText = document.createElement("span");

      toolTipText.innerHTML =
        '<span class="title">' + tooltips[i].getAttribute("title") + "</span>";
      while (toolTipText.firstChild) {
        tooltips[i].appendChild(toolTipText.firstChild);
      }
    }
    tooltips[i].addEventListener("click", (event) => {
      let activeTool = document.querySelectorAll(".title");
      if (!activeTool.length) {
        auxTool();
      } else {
        if (
          event.target.className == "title" ||
          event.target == activeTool[0].previousSibling
        ) {
          activeTool[0].remove();
        } else {
          activeTool[0].remove();
          auxTool();
        }
      }
    });
  }
}

// }

/* $(document).ready(function () {
  $("h4[title]").click(function () {
    var $titles = $(document).find(".title");
    var $title = $(this).find(".title");
    if (!$title.length) {
      $titles.remove();
      $(this).append(
        '<span class="title">' + $(this).attr("title") + "</span>"
      );
    } else {
      $title.remove();
    }
  });
}); */

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
