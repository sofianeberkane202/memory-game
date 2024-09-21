const grid = document.getElementById("grid");
const playAgainBtn = document.querySelector(".replay");

const cardArray = [
  {
    name: "fries",
    img: "./images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "./images/cheeseburger.png",
  },
  {
    name: "hotedog",
    img: "./images/hotdog.png",
  },
  {
    name: "pizza",
    img: "./images/pizza.png",
  },
  {
    name: "ice-cream",
    img: "./images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "./images/milkshake.png",
  },
  {
    name: "fries",
    img: "./images/fries.png",
  },
  {
    name: "cheeseburger",
    img: "./images/cheeseburger.png",
  },
  {
    name: "hotedog",
    img: "./images/hotdog.png",
  },
  {
    name: "pizza",
    img: "./images/pizza.png",
  },
  {
    name: "ice-cream",
    img: "./images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "./images/milkshake.png",
  },
];

let pairCard = [];
let targetImg = [];

const emptyGridContainer = function () {
  grid.innerHTML = "";
};

// sort the array randomly:
cardArray.sort(() => Math.random() - 0.5);

const createBoard = function () {
  emptyGridContainer();

  // sort the array randomly:
  cardArray.sort(() => Math.random() - 0.5);

  cardArray.forEach((card, i) => {
    const html = `
      <div class="card" data-id="${i}">
        <div class="card-inner">
          <div class="card-front">
          <!-- Front content (e.g., image, text) -->
          <img src="./images/blank.png" alt="blank" />
          </div>

          <div class="card-back">
          <!-- Back content (e.g., another image, text) -->
          <img src="${card.img}" alt="${card.name}" />
      </div>
    `;
    grid.insertAdjacentHTML("beforeend", html);
  });
};

createBoard();

const chnageImg = function (src) {
  targetImg.forEach((img) => {
    img.setAttribute("src", src);
  });
};

const wait = async function () {
  grid.classList.add("non-click");
  return new Promise(function (resolved) {
    return setTimeout(resolved, 1000);
  });
};

const compareCards = async function () {
  if (pairCard.length === 2) {
    await wait();
    grid.classList.remove("non-click");
    if (pairCard[0].name === pairCard[1].name) {
      // chnageImg("./images/white.png");
      targetImg.forEach((img) => {
        img.querySelector(".card-inner").classList.add("non-click");
      });
    } else {
      targetImg.forEach((img) => {
        img.querySelector(".card-inner").classList.remove("active");
      });
    }
    pairCard = [];
    targetImg = [];
  }
};

grid.addEventListener("click", async function (e) {
  const btn = e.target.closest(".card");
  if (!btn) return;
  const cardIndex = +btn.dataset.id;
  const card = cardArray[cardIndex];

  btn.querySelector(".card-inner").classList.add("active");

  pairCard.push(card);
  targetImg.push(btn);

  await compareCards();
});

playAgainBtn.addEventListener("click", createBoard);
