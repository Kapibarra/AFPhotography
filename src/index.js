import "./scss/index.scss";
import { createApi } from 'unsplash-js';
// import Inputmask from "inputmask";

/* UNSPLASH API & GALLERY AUTO GRID */
let page = 1;
function loadImage(page) {
  const unsplash = createApi({
    accessKey: 'YiJBrVJIK2ScDQUqWmAfskLIYwFWBPfCIA7xww7SfSk',
  });

  unsplash.users.getPhotos({ username: 'annfish', perPage: 20, page: page }).then((result) => {
    if (result.errors) {
      // handle error here
      console.log('error occurred: ', result.errors[0]);
    } else {
      // handle success here
      const photo = result.response;
      console.log(photo);
      const photosArr = photo.results
      photosArr.forEach((e) => {
        const photo = e.urls.small;
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `<div class="content"><img src=${photo}></div>`;
        document.querySelector("#gallery").append(div)
      })

      const gallery = document.querySelector("#gallery");
      const getVal = function (elem, style) {
        return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
      };
      const getHeight = function (item) {
        return item.querySelector(".content").getBoundingClientRect().height;
      };
      const resizeAll = function () {
        const altura = getVal(gallery, "grid-auto-rows");
        const gap = getVal(gallery, "grid-row-gap");
        gallery.querySelectorAll(".gallery-item").forEach(function (item) {
          const el = item;
          el.style.gridRowEnd =
            "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
        });
      };
      gallery.querySelectorAll("img").forEach(function (item) {
        item.classList.add("byebye");
        if (item.complete) {
          const altura = getVal(gallery, "grid-auto-rows");
          const gap = getVal(gallery, "grid-row-gap");
          const gitem = item.parentElement.parentElement;
          gitem.classList.add('activeimg');
          gitem.style.gridRowEnd =
            "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
          item.classList.remove("byebye");
        } else {
          item.addEventListener("load", function () {
            const altura = getVal(gallery, "grid-auto-rows");
            const gap = getVal(gallery, "grid-row-gap");
            const gitem = item.parentElement.parentElement;
            gitem.classList.add('activeimg');
            gitem.style.gridRowEnd =
              "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
            item.classList.remove("byebye");
          });
        }
      });
      window.addEventListener("resize", resizeAll);
      gallery.querySelectorAll(".gallery-item").forEach(function (item) {
        item.addEventListener("click", function () {
          item.classList.toggle("full");
          item.lastChild.lastChild.src = item.lastChild.lastChild.src.replace('w=400', 'w=1080')
        });
      });
    }
  });
}

loadImage(1)

/* SCROLL TO TOP BTN */
const scrollToTopButton = document.getElementById("js-top");
const scrollFunc = () => {
  const y = window.scrollY;
  if (y > 200) {
    scrollToTopButton.className = "top-link show";
  } else {
    scrollToTopButton.className = "top-link hide";
  }
};

window.addEventListener("scroll", scrollFunc);

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 18);
  }
};

scrollToTopButton.onclick = function (e) {
  e.preventDefault();
  scrollToTop();
};
/* burger */
(function () {
  const hamburger = {
    navToggle: document.querySelector('.nav-toggle'),
    nav: document.querySelector('nav'),

    doToggle: function (e) {
      e.preventDefault();
      this.navToggle.classList.toggle('expanded');
      this.nav.classList.toggle('expanded');
    },
  };
  hamburger.navToggle.addEventListener('click', function (e) { hamburger.doToggle(e); });
  // hamburger.nav.addEventListener('click', function(e) { hamburger.doToggle(e); });
}());

function burgerButtonToggle() {
  const burgerButton = document.querySelector(".nav-toggle")
  const yPos = window.scrollY;
  if (yPos > 10) {
    burgerButton.classList.add("unvisible")
    burgerButton.classList.remove("visible");
  } else {
    burgerButton.classList.remove("unvisible");
    burgerButton.classList.add("visible");
  }
}
window.addEventListener("scroll", burgerButtonToggle);

/* AUTO ImageLoad 20per page*/ 
window.onscroll = function (ev) {
  if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight && page <= 3) {
    loadImage(++page)
  }
};

/* INPUT MASK */
// const selector = document.querySelectorAll('input[type="tel"]')
// const inputMask = new Inputmask('+7 (999) 999-99-99')
// inputMask.mask(selector);

document.getElementById("year").innerHTML = new Date().getFullYear();