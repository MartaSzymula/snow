function startSnow() {
  function createElement(tagName, classes = []) {
    const element = document.createElement(tagName);

    classes.forEach((c) => {
      element.classList.add(c);
    });

    return element;
  }

  function addChild(element, children) {
    if (children) {
      element.appendChild(children);
    }
    return element;
  }

  function createImg(src, classes = []) {
    const img = createElement("img", classes);
    img.src = src;
    return img;
  }

  function generateFlakeContainer(flakeImg, startingPostiion, scale) {
    const flake = createImg(flakeImg, ["snow-flake"]);
    const flakeContainer = addChild(
      createElement("div", ["snow-flake-container"]),
      flake
    );

    flakeContainer.style.left = `${startingPostiion}%`;
    flakeContainer.style.transform = `scale(${scale}) `;

    return flakeContainer;
  }

  function getRandomFlake(images) {
    const randomPosition = Math.random() * 100;
    const randomImage = Math.floor(Math.random() * images.length);
    const randomScale = Math.random();

    return generateFlakeContainer(
      images[randomImage],
      randomPosition,
      randomScale
    );
  }

  function removeFlake(flake) {
    flake.remove();
  }

  function generateFlakes(container, images) {
    const flake = getRandomFlake(images);
    addChild(container, flake);
    setTimeout(removeFlake, 10 * 1000, flake);
    setTimeout(generateFlakes, 500, container, images);
  }

  function renderSnowContainer() {
    const audio = document.createElement("audio");
    audio.src = "sounds/jinglebells.mp3";
    audio.play();

    const snowContainer = createElement("div");
    snowContainer.id = "snow-container";

    addChild(document.body, addChild(snowContainer, audio));
    return snowContainer;
  }

  function renderSanta(container) {
    const santa = createElement("div");
    santa.id = "santa-container";

    const sleigh = createElement("div", ["sleigh"]);
    const sleighImage = createImg("images/sleigh.png");

    addChild(santa, addChild(sleigh, sleighImage));

    for (let i = 0; i < 3; i++) {
      let reinder = createElement("div", ["reindeer"]);
      let image = createImg("images/reindeer.png");

      addChild(santa, addChild(reinder, image));
    }

    let lastPosition = 0;
    let santaRect;

    document.addEventListener("mousemove", (e) => {
      if (!santaRect) {
        addChild(container, santa);
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

  function appendStyles() {
    const style = createElement("style");
    style.innerText = `
        #snow-container {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
      `;
    addChild(document.head, style);
  }

  appendStyles();

  const flakes = ["images/flake.png", "images/flake2.png", "images/flake3.png"];

  const startButton = document.querySelector("#start");

  startButton.addEventListener(
    "click",
    () => {
      const snowContainer = renderSnowContainer();
      generateFlakes(snowContainer, flakes);
      renderSanta(snowContainer);

      startButton.remove();
    },
    { once: true }
  );
}
