const axios = require("axios");
const body = document.body;
const overlay = document.getElementById("popup-overlay");
const allPopups = document.querySelectorAll(".popup");
const statsButtons = document.querySelectorAll(".open-btn");
const mainPopup = document.querySelectorAll(".main-popup");
const s1Rating = document.querySelectorAll(".s1-main-rating");
const s1Impact = document.querySelectorAll(".s1-main-impact");
const s1Maps = document.querySelectorAll(".s1-main-maps");
const s1Detail = document.querySelectorAll(".s1-detailed-stat");
const s1RatingBig = document.getElementById("s1-rating-bigevents");
const devRating = document.querySelectorAll(".dev-main-rating");
const devImpact = document.querySelectorAll(".dev-main-impact");
const devMaps = document.querySelectorAll(".dev-main-maps");
const devDetail = document.querySelectorAll(".dev-detailed-stat");
const devRatingBig = document.getElementById("dev-rating-bigevents");
const loading = document.querySelectorAll(".loading");
const s1Endpoint = "https://hltvproxy.glitch.me/players/7998/";
const devEndpoint = "https://hltvproxy.glitch.me/players/7592/";
const s1All = `${s1Endpoint}_`;
const devAll = `${devEndpoint}_`;
const s1Majors = `${s1Endpoint}Majors`;
const devMajors = `${devEndpoint}Majors`;
const s1BigEvents = `${s1Endpoint}BigEvents`;
const devBigEvents = `${devEndpoint}BigEvents`;
const s1Online = `${s1Endpoint}Online`;
const s1LAN = `${s1Endpoint}Lan`;
const devOnline = `${devEndpoint}Online`;
const devLAN = `${devEndpoint}Lan`;
const s1AllReq = axios.get(s1All);
const devAllReq = axios.get(devAll);
const s1MajorsReq = axios.get(s1Majors);
const devMajorsReq = axios.get(devMajors);
const s1BigEventsReq = axios.get(s1BigEvents);
const devBigEventsReq = axios.get(devBigEvents);
const s1OnlineReq = axios.get(s1Online);
const s1LANReq = axios.get(s1LAN);
const devOnlineReq = axios.get(devOnline);
const devLANReq = axios.get(devLAN);

// ADD LOADING ICONS
const addLoad = () => {
  for (let i = 0; i < loading.length; ++i) {
    loading[
      i
    ].innerHTML = `<img src='https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif' />`;
  }
};

addLoad();

// GET ALL PARSEABLE STATS
const getAll = async () => {
  try {
    axios
      .all([
        s1AllReq,
        s1LANReq,
        s1OnlineReq,
        s1MajorsReq,
        s1BigEventsReq,
        devAllReq,
        devLANReq,
        devOnlineReq,
        devMajorsReq,
        devBigEventsReq,
      ])
      .then(
        axios.spread((...responses) => {
          // ADD ALL PARSEABLE FACE STATS
          s1RatingBig.innerHTML = responses[4].data.rating;
          devRatingBig.innerHTML = responses[9].data.rating;
          for (let i = 0; i < s1Rating.length; ++i) {
            s1Rating[i].innerHTML = responses[i].data.rating;
            s1Impact[i].innerHTML = responses[i].data.impact;
            s1Maps[i].innerHTML = responses[i].data.mapsPlayed;
            devRating[i].innerHTML = responses[i + 5].data.rating;
            devImpact[i].innerHTML = responses[i + 5].data.impact;
            devMaps[i].innerHTML = responses[i + 5].data.mapsPlayed;
          }
          for (let i = 0; i < devDetail.length; ++i) {
            const indice = Math.floor(i / 11);
            const indice2 = i % 11;
            // ALL S1MPLE DETAILED STATS
            s1Detail[i].innerHTML = Object.values(responses[indice].data)[
              indice2
            ];
            // ALL DEVICE DETAILED STATS
            devDetail[i].innerHTML = Object.values(responses[indice + 5].data)[indice2];
          }
          // CHANGE COLOR ON GREATER STAT
          for (let k = 0; k < s1Detail.length; ++k) {
            if (k != 3 && k != 14 && k != 25 && k != 36 && k != 47) {
            if (s1Detail[k].innerHTML > devDetail[k].innerHTML) {
              s1Detail[k].style.color = 'lightgreen'
            } else {
              devDetail[k].style.color = 'lightgreen'
            }} else {
              if (s1Detail[k].innerHTML > devDetail[k].innerHTML) {
                devDetail[k].style.color = 'lightgreen'
              } else {
                s1Detail[k].style.color = 'lightgreen'
              }
            }
          }
          // MAKE SURE ALL KAST STATS HAVE '%' IN EVERY MODAL
          for (let j = 0; j < s1Detail.length; j += 11) {
            const iconSpan = document.createElement("span");
            const iconSpan2 = document.createElement("span");
            iconSpan.innerHTML = `%`;
            iconSpan2.innerHTML = `%`;
            while (iconSpan.firstChild) {
              s1Detail[6 + j].appendChild(iconSpan.firstChild);
            }
            while (iconSpan2.firstChild) {
              devDetail[6 + j].appendChild(iconSpan2.firstChild);
            }
          }
          
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
