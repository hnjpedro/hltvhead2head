import { allNames, flagLinks, playerIDs, countryFlags } from "./allplayers";
import moment from "moment";

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
const devRating = document.querySelectorAll(".dev-main-rating");
const devImpact = document.querySelectorAll(".dev-main-impact");
const devMaps = document.querySelectorAll(".dev-main-maps");
const devDetail = document.querySelectorAll(".dev-detailed-stat");
const loading = document.querySelectorAll(".loading");
const endpoint = "https://hnjpedro.tech/players/";
const input1 = document.getElementById("input-1");
const input2 = document.getElementById("input-2");
const input = document.querySelectorAll("input");
const playerNames = document.querySelectorAll(".player-name");
const playerPics = document.querySelectorAll(".player-pic");
const teamLogos = document.querySelectorAll(".team-logo");
const h3Left = document.querySelectorAll("h3.left");
const h3Right = document.querySelectorAll("h3.right");

// ADD LOADING ICONS
const addLoad = () => {
  loading.forEach((item) => {
    item.innerHTML = `<img src='https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif' />`;
  });
};

// ADD AUTOCOMPLETE SUGGESTIONS TO FORM
const autocomplete = (inp, arr) => {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;
    // CLOSE ANY OPEN SUGGESTIONS
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    // CREATE DIV FOR ALL THE SUGGESTIONS
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "-autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    // APPEND DIV AS CONTAINER'S CHILD
    this.parentNode.appendChild(a);
    // LOOP SETTINGS
    for (i = 0; i < arr.length; i++) {
      // CHECK IF ANY ITEM CONTAINS SEARCH QUERY
      if (arr[i].toUpperCase().includes(val.toUpperCase())) {
        // CREATE DIV FOR ANY MATCHED ITEM
        b = document.createElement("DIV");
        // ADD FLAG TO THESE ITEMS
        b.setAttribute("class", "each-item");
        b.setAttribute("style", `--bg-image: url('${countryFlags[i]}')`);
        // MAKE MATCHING LETTERS BOLD
        b.innerHTML =
          `<strong style="
          margin-left: 5px;">` +
          arr[i].substr(0, val.length) +
          "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        // HIDDEN INPUT THAT WILL HOLD THE VALUE
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        // SEND VALUE TO ACTUAL INPUT WHEN ITEM IS CLICKED AND CLOSE SUGGESTIONS
        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  // FUNCTIONS WHEN KEY IS PRESSED
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "-autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
};

let playerList = [];

for (let i = 0; i < flagLinks.length; ++i) {
  let span = document.createElement("span");
  span.innerHTML = `${flagLinks[i]} ${allNames[i]}`;
  playerList.push(span);
}

input.forEach((item) => {
  autocomplete(item, allNames);
});

// GET DEFAULT INFO AND IDs FROM INPUT
const searchPlayers = async () => {
  addLoad();
  var select = document.querySelector("select").value;
  const date = (number) => {
    return new Date(Date.now() - 24 * number * 3600 * 1000)
      .toISOString()
      .slice(0, 10);
  };
  const dateNow = new Date().toISOString().slice(0, 10);
  let rating1 = document.querySelectorAll(".rating-1");
  const defaultRating = "RATING 2.0";
  const ratingValue = (number) => {
    for (let i = 0; i < rating1.length; ++i) {
      if (number < 2017) {
        rating1[i].innerHTML = "RATING 1.0";
      } else {
        rating1[i].innerHTML = "RATING 2.0";
      }
    }
  };
  var dateFilterEnd = dateNow;
  switch (select) {
    case "all-time":
      var dateFilterStart = "_";
      ratingValue(2015);
      break;
    case "1":
    case "3":
    case "6":
    case "12":
      dateFilterStart = moment().subtract(select, "months");
      ratingValue(2018);
      console.log(`teste1: ${dateFilterStart}`);
      break;
    case "custom":
      if (
        document.querySelectorAll(".hidden")[2].value &&
        document.querySelectorAll(".hidden")[3].value
      ) {
        var dateFilterStart = document.querySelectorAll(".hidden")[2].value;
        var dateFilterEnd = document.querySelectorAll(".hidden")[3].value;
        ratingValue(dateFilterStart.slice(0, 4));
      } else {
        alert("Please add dates!");
      }
      break;
    default:
      var dateFilterStart = `${select}-01-01`;
      var dateFilterEnd = `${select}-12-31`;
      ratingValue(select);
  }
  const allEndpoints = [
    `${endpoint}${
      playerIDs[allNames.indexOf(input1.value)]
    }/_/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input1.value)]
    }/Lan/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input1.value)]
    }/Online/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input1.value)]
    }/Majors/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input1.value)]
    }/BigEvents/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input2.value)]
    }/_/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input2.value)]
    }/Lan/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input2.value)]
    }/Online/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input2.value)]
    }/Majors/${dateFilterStart}/${dateFilterEnd}`,
    `${endpoint}${
      playerIDs[allNames.indexOf(input2.value)]
    }/BigEvents/${dateFilterStart}/${dateFilterEnd}`,
  ];

  try {
    let responses = [];
    h3Left.forEach((item) => {
      item.innerHTML = input1.value;
    });
    h3Right.forEach((item) => {
      item.innerHTML = input2.value;
    });
    playerNames[0].innerHTML = input1.value;
    playerNames[1].innerHTML = input2.value;
    for (let i = 0; i < s1Detail.length; ++i) {
      if (i < allEndpoints.length) {
        let resp = await axios.get(allEndpoints[i]);
        responses.push(resp.data);
      }
        if (i == 0 || i == 5) {
        if (Object.keys(responses[i][1]).length > 2) {
          playerPics[i/5].setAttribute("src", responses[i][1].image);
          teamLogos[i/5].setAttribute("src", responses[i][1].teamLogo);
          teamLogos[i/5].style.visibility = "initial";
        } else {
          playerPics[i/5].setAttribute("src", responses[i][1].teamLogo);
          teamLogos[i/5].style.visibility = "hidden";
        }
      }
      if (i < s1Rating.length) {
        s1Rating[i].innerHTML = responses[i][0].rating;
        s1Impact[i].innerHTML = responses[i][0].impact;
        s1Maps[i].innerHTML = responses[i][0].mapsPlayed;
      } else if (i < (devRating.length + 5)) {
        devRating[i - 5].innerHTML = responses[i][0].rating;
        devImpact[i - 5].innerHTML = responses[i][0].impact;
        devMaps[i - 5].innerHTML = responses[i][0].mapsPlayed;
      }
    }

    for (let i = 0; i < devDetail.length; ++i) {
      const indice = Math.floor(i / 11);
      const indice2 = i % 11;
      // ALL S1MPLE DETAILED STATS
      s1Detail[i].innerHTML = Object.values(responses[indice][0])[indice2];
      // ALL DEVICE DETAILED STATS
      devDetail[i].innerHTML = Object.values(responses[indice + 5][0])[indice2];
    }
    // CHANGE COLOR ON GREATER STAT
    for (let k = 0; k < s1Detail.length; ++k) {
      if (k % 11 != 3) {
        if (s1Detail[k].innerHTML > devDetail[k].innerHTML) {
          s1Detail[k].style.color = "lightgreen";
          devDetail[k].style.color = "white";
        } else {
          devDetail[k].style.color = "lightgreen";
          s1Detail[k].style.color = "white";
        }
      } else {
        if (s1Detail[k].innerHTML > devDetail[k].innerHTML) {
          devDetail[k].style.color = "lightgreen";
          s1Detail[k].style.color = "white";
        } else {
          s1Detail[k].style.color = "lightgreen";
          devDetail[k].style.color = "white";
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
  } catch (err) {
    console.log(err);
  }
};

searchPlayers();

var select = document.querySelector("select");
select.addEventListener("change", (event) => {
  if (select.value == "custom") {
    document
      .querySelectorAll(".hidden")
      .forEach((item) => (item.style.display = "initial"));
  } else {
    document
      .querySelectorAll(".hidden")
      .forEach((item) => (item.style.display = "none"));
  }
});

// ADD FUNCTION TO 'COMPARE' BUTTON
const verifyAndSearch = () => {
  if (input1.value && input2.value) {
    searchPlayers();
  } else if (input1.value && !input2.value) {
    alert("Please add second player!");
  } else if (!input1.value && input2.value) {
    alert("Please add first player!");
  } else {
    alert("Please add players!");
  }
};

document.getElementById("search-players").addEventListener("click", () => {
  verifyAndSearch();
});

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
