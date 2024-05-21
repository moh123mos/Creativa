// localStorage
//? Set main color in local Storage
let mainColor = localStorage.getItem("color");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  //remove active class from all lis
  document.querySelectorAll(".box-setting .colors-list li").forEach((e) => {
    e.classList.remove("active");

    if (e.dataset.color === mainColor) {
      e.classList.add("active");
    }
  });
}

//? Set status to random background in local storage
let statusRandom = localStorage.getItem("status");
let statusImg = localStorage.getItem("statusImg");
if (statusRandom != null) {
  document.querySelector(".landing-page").style.backgroundImage = statusImg;
  document
    .querySelectorAll(".box-setting .random-background span")
    .forEach((e) => {
      e.classList.remove("active");
      if (e.dataset.status === statusRandom) {
        e.classList.add("active");
      }
    });
}

//Start Setting Box, Add class for gear, box-settings
document.querySelector(".toggle .icon").onclick = () => {
  // toggle class open for setting box
  document.querySelector(".box-setting").classList.toggle("open");
  // toggle class rotate for icon
  document.querySelector(".toggle .icon").classList.toggle("rotate");
};

//when click on any where to hide setting box
removeEleByClick(
  document.querySelector(".toggle .icon"),
  document.querySelector(".box-setting")
);
document.querySelector(".box-setting").onclick = function (e) {
  e.stopPropagation();
};

//? Color Option
//set colors from dataset to Lis and set it in main-color
let lis = document.querySelectorAll(".box-setting .colors-list li");
lis.forEach((li) => {
  //set background-color for lis
  li.style.backgroundColor = li.dataset.color;
  //set main-color for lis
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      li.dataset.color
    );
    localStorage.setItem("color", li.dataset.color);
    //add class active to Li
    handleAcive(e);
  });
});
//? Random Backgtounfd Option
let backEls = document.querySelectorAll(".box-setting .random-background span");
backEls.forEach((sp) => {
  //set main-color for lis
  sp.addEventListener("click", (e) => {
    handleAcive(e);
    localStorage.setItem("status", sp.dataset.status);
  });
});
//Is Show Bullts
let showBlts = document.querySelectorAll(".show-bullts span");
showBlts.forEach(function (blt) {
  blt.addEventListener("click", (e) => {
    handleAcive(e);
    if (e.target.classList.contains("no")) {
      document.querySelector(".nav-bullts").style.display = "none";
      localStorage.setItem("isShow", "no");
    } else {
      document.querySelector(".nav-bullts").style.display = "block";
      localStorage.setItem("isShow", "yes");
    }
  });
});
//? Set IsShow to Nav Bullts in local storage
let isShowBlts = localStorage.getItem("isShow");
if (isShowBlts !== null) {
  showBlts.forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.status === isShowBlts) {
      e.classList.add("active");
    }
  });
  if (isShowBlts === "no") {
    document.querySelector(".nav-bullts").style.display = "none";
  } else {
    document.querySelector(".nav-bullts").style.display = "block";
  }
}
// function to handle active class
function handleAcive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  e.target.classList.add("active");
}
//nav bar fixed or not
let nav = document.querySelectorAll(".box-setting .fix-nav span");
nav.forEach(function (n) {
  n.addEventListener("click", (e) => {
    handleAcive(e);
    document.querySelector(".landing-page .container").classList.toggle("fix");
    if (e.target.classList.contains("yes"))
      localStorage.setItem("fixNav", "yes");
    else localStorage.setItem("fixNav", "no");
  });
});
let fixNav = localStorage.getItem("fixNav");
if (fixNav !== null) {
  nav.forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.status === fixNav) {
      e.classList.add("active");
    }
    if (fixNav === "yes") {
      document.querySelector(".landing-page .container").classList.add("fix");
    } else {
      document
        .querySelector(".landing-page .container")
        .classList.remove("fix");
    }
  });
}
//ResetOption
document.querySelector(".box-setting .reset-option").onclick = function () {
  localStorage.removeItem("color");
  localStorage.removeItem("status");
  localStorage.removeItem("isShow");
  window.location.reload();
};

//End Setting Box

// landing in var
let land = document.querySelector(".landing-page");
//arr for imgs of landing
let arrImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
//change img in landing
setInterval(() => {
  if (
    document
      .querySelector(".box-setting .random-background .active")
      .classList.contains("yes")
  ) {
    let rndm = Math.floor(Math.random() * arrImgs.length);
    land.style.backgroundImage = `linear-gradient(90deg, #0000009d, #0000009c),url(./imgs/${arrImgs[rndm]})`;
    localStorage.setItem(
      "statusImg",
      `linear-gradient(90deg, #0000009d, #0000009c),url(../imgs/${arrImgs[rndm]})`
    );
  }
}, 5000);

//? Animation when reach to skill section
let skills = document.querySelector(".skills");
window.onscroll = setInterval(function () {
  // height above the skills
  let aboveSkills = skills.offsetTop;

  // height of  skills section
  let skillsH = skills.offsetHeight;

  // height of  skills section
  let screenH = window.innerHeight;

  // height of move of scroll
  let windowY = this.pageYOffset;

  let allSpan = document.querySelectorAll(".skill-box .skill-progress span");

  if (windowY < 20) {
    allSpan.forEach((span) => {
      span.style.width = 0;
    });
  }
  if (windowY > aboveSkills + skillsH - screenH - 50) {
    allSpan.forEach((span) => {
      span.style.width = span.dataset.prog;
    });
  }
}, 1000);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//Create Popup box
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach((img) => {
  img.addEventListener("click", (_) => {
    //[1]create overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    //[2]create img in overlay
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let imgPop = document.createElement("img");
    imgPop.className = "img-pop";
    imgPop.src = img.src;
    popupBox.appendChild(imgPop);
    overlay.appendChild(popupBox);

    //[3]create heading for img
    let imgHeading = document.createElement("h3");
    let imgText = document.createTextNode("This Image");
    imgHeading.appendChild(imgText);
    popupBox.prepend(imgHeading);

    //[4]create close button
    let closeButton = document.createElement("div");
    let closeText = document.createTextNode("X");
    closeButton.className = "close-button";
    closeButton.appendChild(closeText);
    popupBox.prepend(closeButton);
  });
});

//Logic close button
document.onclick = function (e) {
  if (e.target.className == "close-button") {
    document.querySelector(".popup-overlay").remove();
  }
};

//function to scroll into view
function scroll(eles) {
  eles.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let section = e.target.dataset.section;
      document.querySelector(section).scrollIntoView({ behavior: "smooth" });
    });
  });
}
//Nav Bullts
let blts = document.querySelectorAll(".nav-bullts .bullt");
scroll(blts);
let links = document.querySelectorAll(".landing-page .links li");
scroll(links);

//add class open to => toggle menu
let menu = document.querySelector(".landing-page .toggle-menu .bars");
let tlink = document.querySelector(".landing-page .links");
menu.onclick = function () {
  tlink.classList.toggle("open");
};
//click anywhere to remove menu list
removeEleByClick(menu, tlink);

//function remove element by click anywhere
function removeEleByClick(mark, list) {
  document.addEventListener("click", function (e) {
    if (e.target !== mark && e.target !== list) {
      if (list.classList.contains("open")) {
        list.classList.toggle("open");
      }
    }
  });
}
