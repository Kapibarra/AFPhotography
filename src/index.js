import "./scss/index.scss";
import { createApi } from 'unsplash-js';
import {createBigCard, createCardWrapper, getHeight, getVal, resizeAll} from './utils';
import photos from './gallery'


/* GALLERY AUTO GRID */

function loadImage(page) {
  const unsplash = createApi({
    accessKey: 'YiJBrVJIK2ScDQUqWmAfskLIYwFWBPfCIA7xww7SfSk',
  });

  unsplash.users.getPhotos({ username: 'annfish', perPage: 20, page: page }).then((result) => {
    if (result.errors) {
      // handle error here
      console.log('error occurred: ', result.errors[0]);
    } else {
      const items = [];
      const gallery = document.querySelector("#gallery");
      // handle success here
      // const photo = result.response;
  
      const photosArr = photos

      photosArr.forEach((e, i) => {
        // const photo = photos;
        const div = createCardWrapper();
        const img = new Image();
        img.src = e.thumb;
        img.alt = 'image';
        img.loading = 'lazy'

        div.lastChild.append(img);
        gallery.append(div);
        items.push(div);
      })

      gallery.querySelectorAll("img").forEach(function (item) {
        item.classList.add("activeimg");
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


      window.addEventListener("resize", () => {resizeAll(gallery)});
      items.forEach(function (item) {
        createBigCard(item, gallery);
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
// window.onscroll = function (ev) {
//   if ((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight && page <= 10) {
//     loadImage(++page)
//   }
// };

/* INPUT MASK */
// const selector = document.querySelectorAll('input[type="tel"]')
// const inputMask = new Inputmask('+7 (999) 999-99-99')
// inputMask.mask(selector);

document.getElementById("year").innerHTML = new Date().getFullYear();

if (document.getElementsByClassName('gallery')) {
  const personalShootingBtn = document.querySelector(".personal-shooting")
  const crotiaBtn = document.querySelector(".crotia")
  const crotiaBtnMobile = document.querySelector(".crotia-mobile")
  const personalShootingBtnMobile = document.querySelector('.personal-shooting-mobile')

  console.log(crotiaBtnMobile, personalShootingBtnMobile);

  personalShootingBtn.addEventListener('click', personalShootingToggle)
  crotiaBtn.addEventListener('click', crotiaToggle)
  personalShootingBtnMobile.addEventListener('click', personalShootingMobileToggle)
  crotiaBtnMobile.addEventListener('click', crotiaMobileToggle)
}

function personalShootingToggle() {
  const galleryBlock = document.querySelector('.gallery')
  const personalShootingBlock = document.querySelector('.personal__shooting')
  const crotiaBlock = document.querySelector(".crotia__block")

  galleryBlock.classList.add('unvisible-block')
  galleryBlock.classList.remove('visible-block')

  crotiaBlock.classList.remove('visible-block')
  crotiaBlock.classList.add('unvisible-block')

  personalShootingBlock.classList.remove('unvisible-block')
  personalShootingBlock.classList.add("visible-block")
  console.log('ps work');
}

function crotiaToggle() {
  const galleryBlock = document.querySelector('.gallery')
  const personalShootingBlock = document.querySelector('.personal__shooting')
  const crotiaBlock = document.querySelector(".crotia__block")

  galleryBlock.classList.remove('visible-block')
  galleryBlock.classList.add('unvisible-block')
  personalShootingBlock.classList.remove('visible-block')
  personalShootingBlock.classList.add('unvisible-block')
  crotiaBlock.classList.remove('unvisible-block')
  crotiaBlock.classList.add('visible-block')
}

function personalShootingMobileToggle() {
  const galleryBlock = document.querySelector('.gallery')
  const personalShootingBlock = document.querySelector('.personal__shooting')
  const crotiaBlock = document.querySelector(".crotia__block")
  const navToggle = document.querySelector('.nav-toggle')
  const nav = document.querySelector('.nav')

  galleryBlock.classList.add('unvisible-block')
  galleryBlock.classList.remove('visible-block')

  crotiaBlock.classList.remove('visible-block')
  crotiaBlock.classList.add('unvisible-block')

  personalShootingBlock.classList.remove('unvisible-block')
  personalShootingBlock.classList.add("visible-block")

  setTimeout(() => {
    navToggle.classList.remove('expanded')
    nav.classList.remove('expanded')
}, 100)

  console.log('ps work');
}

function crotiaMobileToggle() {
  const galleryBlock = document.querySelector('.gallery')
  const personalShootingBlock = document.querySelector('.personal__shooting')
  const crotiaBlock = document.querySelector(".crotia__block")
  const navToggle = document.querySelector('.nav-toggle')
  const nav = document.querySelector('.nav')

  galleryBlock.classList.remove('visible-block')
  galleryBlock.classList.add('unvisible-block')

  personalShootingBlock.classList.remove('visible-block')
  personalShootingBlock.classList.add('unvisible-block')

  crotiaBlock.classList.remove('unvisible-block')
  crotiaBlock.classList.add('visible-block')

  setTimeout(() => {
    navToggle.classList.remove('expanded')
    nav.classList.remove('expanded')
}, 100)

  console.log('travel work work');
}