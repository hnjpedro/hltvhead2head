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

const addLoad = () => {
  for (let i = 0; i < loading.length; ++i) {
    loading[
      i
    ].innerHTML = `<img src='https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif' />`;
  }
};

addLoad();
const s1Endpoint = 'https://hltvproxy.glitch.me/players/7998/'
const devEndpoint = 'https://hltvproxy.glitch.me/players/7592/'
const s1All = `${s1Endpoint}_`;
const devAll = `${devEndpoint}_`;
const s1Majors = `${s1Endpoint}Majors`;
const devMajors = `${devEndpoint}Majors`;
const s1BigEvents = `${s1Endpoint}BigEvents`
const devBigEvents = `${devEndpoint}BigEvents`

const s1AllReq = axios.get(s1All);
const devAllReq = axios.get(devAll);
const s1MajorsReq = axios.get(s1Majors);
const devMajorsReq = axios.get(devMajors);
const s1BigEventsReq = axios.get(s1BigEvents);
const devBigEventsReq = axios.get(devBigEvents)

const getAll = async () => {
  try {
    axios.all([s1AllReq, s1MajorsReq, s1BigEventsReq, devAllReq, devMajorsReq, devBigEventsReq]).then(
      axios.spread((...responses) => {
        s1Rating.innerHTML = responses[0].data.rating;
        s1Impact.innerHTML = responses[0].data.impact;
        s1Maps.innerHTML = responses[0].data.mapsPlayed;
        devRating.innerHTML = responses[3].data.rating;
        devImpact.innerHTML = responses[3].data.impact;
        devMaps.innerHTML = responses[3].data.mapsPlayed;
        
        
        for (let i = 0; i < devDetail.length; ++i) {
          const indice = Math.floor(i / 11)
          const indice2 = Math.floor(i / 33) + (i % 11)
          s1Detail[i].innerHTML = Object.values(responses[indice].data)[indice2];
          s1Detail[6].innerHTML = `${Object.values(responses[0].data)[6]}%`;
          s1Detail[17].innerHTML = `${Object.values(responses[1].data)[6]}%`;
          s1Detail[28].innerHTML = `${Object.values(responses[2].data)[6]}%`;
          devDetail[i].innerHTML = Object.values(responses[(indice + 3)].data)[indice2];
          devDetail[6].innerHTML = `${Object.values(responses[3].data)[6]}%`;
          devDetail[17].innerHTML = `${Object.values(responses[4].data)[6]}%`;
          devDetail[28].innerHTML = `${Object.values(responses[5].data)[6]}%`;
        }
       /* for (let i = 0; i < 11; ++i) {
          let j = 11
          s1Detail[i+j].innerHTML = Object.values(responses[1].data)[i];
          s1Detail[6+j].innerHTML = `${Object.values(responses[1].data)[6]}%`;
          s1Detail[10+j].innerHTML = (Object.values(responses[1].data)[2] / Object.values(responses[2].data)[3]).toFixed(2)
          devDetail[i+j].innerHTML = Object.values(responses[5].data)[i];
          devDetail[6+j].innerHTML = `${Object.values(responses[5].data)[6]}%`;
          devDetail[10+j].innerHTML = (Object.values(responses[5].data)[2] / Object.values(responses[5].data)[3]).toFixed(2)
        }
        for (let i = 0; i < 11; ++i) {
          let j = 22
          s1Detail[i+j].innerHTML = Object.values(responses[2].data)[i];
          s1Detail[6+j].innerHTML = `${Object.values(responses[2].data)[6]}%`;
          s1Detail[10+j].innerHTML = (Object.values(responses[2].data)[2] / Object.values(responses[4].data)[3]).toFixed(2)
          devDetail[i+j].innerHTML = Object.values(responses[6].data)[i];
          devDetail[6+j].innerHTML = `${Object.values(responses[6].data)[6]}%`;
          devDetail[10+j].innerHTML = (Object.values(responses[6].data)[2] / Object.values(responses[6].data)[3]).toFixed(2)
        } */
      })
    );
  } catch (err) {
    console.log(err);
  }
};

getAll();

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
