const overlay = document.getElementById("popup-overlay");
const allPopups = document.querySelectorAll(".popup");
const statsButtons = document.querySelectorAll(".open-btn");
const mainPopup = document.querySelectorAll(".main-popup");
const body = document.body;

// TOOLTIP ICONS
const tooltips = document.querySelectorAll(".tooltip");
for (let i = 0; i < tooltips.length; ++i) {
  var infoButton = document.createElement("span");
  infoButton.innerHTML = `<span class='material-icons-outlined info-icon'>info</span>`;
  while (infoButton.firstChild) {
    tooltips[i].appendChild(infoButton.firstChild);
  }
}

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
    };
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

// OPEN POPUPS
for (let i = 0; i < statsButtons.length; ++i) {
  statsButtons[i].addEventListener("click", () => {
    allPopups[i].style.display = "flex";
    allPopups[i].style.top = `${window.pageYOffset + 10}px`;
    mainPopup[i].style.cssText =
      "animation:slide-in .5s; animation-fill-mode: forwards";
    overlay.style.top = `${window.pageYOffset}px`;
    body.style.overflow = "hidden";
    overlay.style.display = "block";
  });
}

// CLOSE POPUPS
const closePopUpAux = () => {
  for (let i = 0; i < allPopups.length; ++i) {
    if (window.innerWidth < 1000 || window.innerWidth > 1600) {
      mainPopup[i].style.cssText =
        "animation:slide-out200 .5s; animation-fill-mode: forwards";
    } else {
      mainPopup[i].style.cssText =
        "animation:slide-out .5s; animation-fill-mode: forwards";
    }
    setTimeout(() => {
      allPopups[i].style.display = "none";
      body.style.overflow = "auto";
      overlay.style.display = "none";
    }, 500);
  }
};

for (let i = 0; i < allPopups.length; ++i) {
  allPopups[i].addEventListener("click", (event) => {
    const classNameOfClickedElement = event.target.classList[0];
    const classNames = ["close-btn", "popup", "popup-overlay"];
    console.log(classNameOfClickedElement);
    const shouldClosePopUp = classNames.some(
      (className) => className === classNameOfClickedElement
    );
    if (shouldClosePopUp) {
      closePopUpAux();
    }
  });
}

/// CLOSE MODALS WITH ESC
window.onkeydown = function (event) {
  if (event.keyCode == 27) {
    closePopUpAux();
  }
};