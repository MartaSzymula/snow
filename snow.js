function renderSnowContainer() {
  const snowContainer = document.createElement('div');
  snowContainer.id = 'snow-container';

  document.body.appendChild(snowContainer);

  return snowContainer;
}

const flakeImages = [
  'images/flakes/flake.png',
  'images/flakes/flake2.png',
  'images/flakes/flake3.png',
];

function renderFlake(snowContainer) {
  const flakeContainer = document.createElement('div');
  flakeContainer.classList.add('flake-container');

  flakeContainer.style.left = `${Math.random() * 100}%`;
  flakeContainer.style.transform = `scale(${Math.random()})`;

  const img = document.createElement('img');
  img.src = flakeImages[Math.floor(Math.random() * flakeImages.length)];

  flakeContainer.appendChild(img);

  snowContainer.appendChild(flakeContainer);

  setTimeout(renderFlake, 500, snowContainer);
}

function renderSanta(snowContainer) {
  const santaContainer = document.createElement('div');
  santaContainer.id = 'santa-container';

  const sleighImg = document.createElement('img');
  sleighImg.src = 'images/santa/sleigh.png';

  santaContainer.appendChild(sleighImg);

  for (let i = 0; i < 3; i++) {
    const renideerContainer = document.createElement('div');
    renideerContainer.classList.add('reindeer-container');

    const reindeerImg = document.createElement('img');
    reindeerImg.src = 'images/santa/reindeer.png';

    renideerContainer.appendChild(reindeerImg);
    santaContainer.appendChild(renideerContainer);
  }

  snowContainer.appendChild(santaContainer);
}

function addAudioElement(snowContainer) {
  const audioElement = document.createElement('audio');
  audioElement.src = 'sounds/jinglebells.mp3';
  audioElement.play();

  snowContainer.appendChild(audioElement);
}

function addStartButton(snowContainer) {
  const button = document.createElement('button');
  button.innerText = 'Pada śnieg!';
  snowContainer.appendChild(button);
  return button;
}

const snowContainer = renderSnowContainer();
const button = addStartButton(snowContainer);

button.addEventListener(
  'click',
  () => {
    renderSanta(snowContainer);
    renderFlake(snowContainer);
    addAudioElement(snowContainer);

    let lastPosition = 0;
    let santaDimenstions;

    document.addEventListener('mousemove', (e) => {
      const santaContainer = document.querySelector('#santa-container');

      santaDimenstions =
        santaDimenstions || santaContainer.getBoundingClientRect();

      if (lastPosition < e.pageX) {
        santaContainer.classList.add('flipped-santa');
        santaContainer.style.left = `${e.pageX - santaDimenstions.width}px`;
        santaContainer.style.top = `${e.pageY}px`;
      }

      if (lastPosition > e.pageX) {
        santaContainer.classList.remove('flipped-santa');
        santaContainer.style.left = `${e.pageX}px`;
        santaContainer.style.top = `${e.pageY}px`;
      }

      lastPosition = e.pageX;
    });

    button.remove();
  },
  { once: true }
);
