import "./scss/index.scss";
if (document.querySelector("#gallery")) {
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
      // console.log(item.src);
    } else {
      item.addEventListener("load", function () {
        const altura = getVal(gallery, "grid-auto-rows");
        const gap = getVal(gallery, "grid-row-gap");
        const gitem = item.parentElement.parentElement;
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
    });
  });
}

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
(function() {
    const hamburger = {
      navToggle: document.querySelector('.nav-toggle'),
      nav: document.querySelector('nav'),
  
      doToggle: function(e) {
        e.preventDefault();
        this.navToggle.classList.toggle('expanded');
        this.nav.classList.toggle('expanded');
      },
    };
    hamburger.navToggle.addEventListener('click', function(e) { hamburger.doToggle(e); });
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
window.addEventListener("scroll", burgerButtonToggle)


