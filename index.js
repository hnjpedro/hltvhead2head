const axios = require("axios");
const overlay = document.getElementById("popup-overlay");
const allPopups = document.querySelectorAll(".popup");
const statsButtons = document.querySelectorAll(".open-btn");
const mainPopup = document.querySelectorAll(".main-popup");
const body = document.body;
const s1Rating = document.getElementById("s1-rating");
const s1Impact = document.getElementById("s1-impact");
const s1Maps = document.getElementById("s1-maps");
const s1Detail = document.querySelectorAll(".s1-detailed-stat");
const devRating = document.getElementById("dev-rating");
const devImpact = document.getElementById("dev-impact");
const devMaps = document.getElementById("dev-maps");
const devDetail = document.querySelectorAll(".dev-detailed-stat");
const loading = document.querySelectorAll(".loading");

// FIRST BOX - STATS FROM HLTV API
const gets1mple = async () => {
  for (let i = 0; i < loading.length; ++i) {
    loading[
      i
    ].innerHTML = `<img src='https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif' />`;
  }
  try {
    const response = await axios.get(
      "https://hltvproxy.glitch.me/players/7998"
    );

    s1Rating.innerHTML = response.data.rating;
    s1Impact.innerHTML = response.data.impact;
    s1Maps.innerHTML = response.data.mapsPlayed;
    s1Detail[0].innerHTML = response.data.mapsPlayed;
    s1Detail[1].innerHTML = response.data.rating;
    s1Detail[2].innerHTML = response.data.impact;
    s1Detail[3].innerHTML = response.data.kast + "%";
    s1Detail[4].innerHTML = response.data.adr;
    s1Detail[5].innerHTML = response.data.kpr;
    s1Detail[6].innerHTML = response.data.dpr;
  } catch (err) {
    console.log(err);
  }
};
gets1mple();

const getDev = async () => {
  try {
    const response = await axios.get(
      "https://hltvproxy.glitch.me/players/7592"
    );

    devRating.innerHTML = response.data.rating;
    devImpact.innerHTML = response.data.impact;
    devMaps.innerHTML = response.data.mapsPlayed;
    devDetail[0].innerHTML = response.data.mapsPlayed;
    devDetail[1].innerHTML = response.data.rating;
    devDetail[2].innerHTML = response.data.impact;
    devDetail[3].innerHTML = response.data.kast + "%";
    devDetail[4].innerHTML = response.data.adr;
    devDetail[5].innerHTML = response.data.kpr;
    devDetail[6].innerHTML = response.data.dpr;
  } catch (err) {
    console.log(err);
  }
};

getDev();

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
    if (window.innerWidth < 1600) {
      allPopups[i].style.top = `${window.pageYOffset + 10}px`;
    } else {
      allPopups[i].style.top = `calc(${window.pageYOffset}px + 15vh)`;
    }
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
