const flakes = ["images/flake.png", "images/flake2.png", "images/flake3.png"];

const snowContainer = document.createElement("div");
snowContainer.id = "snow-container";

const audio = document.createElement("audio");
audio.src = "sounds/jinglebells.mp3";

snowContainer.appendChild(audio);

document.body.appendChild(snowContainer);

function generateFlakeContainer(flakeImg, startingPostiion, scale) {
  const flakeContainer = document.createElement("div");
  flakeContainer.classList.add("snow-flake-container");

  flakeContainer.style.left = `${startingPostiion}%`;
  flakeContainer.style.transform = `scale(${scale}) `;

  const flake = document.createElement("img");
  flake.classList.add("snow-flake");
  flake.src = flakeImg;

  flakeContainer.appendChild(flake);

  return flakeContainer;
}

function getRandomFlake() {
  const randomPosition = Math.random() * 100;
  const randomImage = Math.floor(Math.random() * flakes.length);
  const randomScale = Math.random();

  return generateFlakeContainer(
    flakes[randomImage],
    randomPosition,
    randomScale
  );
}

function removeFlake(flake) {
  flake.remove();
}

function generateFlakes() {
  const flake = getRandomFlake();
  snowContainer.appendChild(flake);
  setTimeout(removeFlake, 10 * 1000, flake);
  setTimeout(generateFlakes, 500);
}

function renderSanta() {
  const santa = document.createElement("div");
  santa.id = "santa-container";

  const sleigh = document.createElement("div");
  sleigh.classList.add("sleigh");
  const sleighImage = document.createElement("img");
  sleighImage.src = "images/sleigh.png";
  sleigh.appendChild(sleighImage);
  santa.appendChild(sleigh);

  for (let i = 0; i < 3; i++) {
    let reinder = document.createElement("div");
    reinder.classList.add("reindeer");
    let image = document.createElement("img");
    image.src = "images/reindeer.png";

    reinder.appendChild(image);
    santa.appendChild(reinder);
  }

  let lastPosition = 0;
  let santaRect;

  document.addEventListener("mousemove", (e) => {
    if (!santaRect) {
      snowContainer.appendChild(santa);
      santaRect = santa.getBoundingClientRect();
    }

    if (lastPosition > e.pageX) {
      santa.style.left = `${e.pageX}px`;
      santa.classList.add("flipped-santa");
    } else {
      santa.classList.remove("flipped-santa");
      santa.style.left = `${e.pageX - santaRect.width}px`;
    }

    lastPosition = e.pageX;
    santa.style.top = `${e.pageY}px`;
  });
}

const startButton = document.querySelector("#start");

startButton.addEventListener(
  "click",
  () => {
    generateFlakes();
    renderSanta();

    audio.play();

    startButton.remove();
  },
  { once: true }
);

document.addEventListener("mousemove", (e) => {
  if (!santaRect) {
    snowContainer.appendChild(santa);
    santaRect = santa.getBoundingClientRect();
  }

  if (lastPosition > e.pageX) {
    santa.style.left = `${e.pageX}px`;
    santa.classList.add("flipped-santa");
  } else {
    santa.classList.remove("flipped-santa");
    santa.style.left = `${e.pageX - santaRect.width}px`;
  }

  lastPosition = e.pageX;
  santa.style.top = `${e.pageY}px`;
});
