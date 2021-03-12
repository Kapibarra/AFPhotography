const createCardWrapper = () => {
  const div = document.createElement("div");
  div.className = "gallery-div";
  div.append(document.createElement("div"));
  div.lastChild.classList.add("content");

  return div;
}

const onCardClickHandler = (flag, container, card) => {
  if (!flag) {
    const div = createCardWrapper();
    const img = new Image();

    div.lastChild.append(img);
    flag = div;

    img.onload = () => {
      div.classList.add("full");
      div.id = "big";

      container.append(div);

      div.addEventListener("click", () => {
        div.classList.remove("fullBig");
        setTimeout(() => {
          div.remove();
          flag = null;
        }, 1000);
      });

      setTimeout(() => {
        div.classList.add("fullBig");
      }, 50);
    };

    img.src = card.lastChild.lastChild.src.replace("w=400", "w=1080");
  }
};

const createBigCard = (card, container) => {
  const bigCard = null;
  card.addEventListener("click", () => {
    onCardClickHandler(bigCard, container, card);
  });
};

const getVal = function (elem, style) {
  return parseInt(window.getComputedStyle(elem).getPropertyValue(style));
};

const getHeight = function (item) {
  return item.querySelector(".content").getBoundingClientRect().height;
};

const resizeAll = function (container) {
  const altura = getVal(container, "grid-auto-rows");
  const gap = getVal(container, "grid-row-gap");
  container.querySelectorAll(".gallery-item").forEach(function (item) {
    const el = item;
    el.style.gridRowEnd =
      "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
  });
};


export { createBigCard, createCardWrapper, getHeight, getVal, resizeAll };
