/* ===== GALERÍA ===== */
function flip(card) {
  card.classList.toggle('flipped');
}

/* ===== MEMORAMA ===== */
const game = document.getElementById('memory-game');
const statusText = document.getElementById('status');

const cardsData = [
  'img/memory/img1.jpg', 'img/memory/img1.jpg',
  'img/memory/img2.jpg', 'img/memory/img2.jpg',
  'img/memory/img3.jpg', 'img/memory/img3.jpg',
  'img/memory/img4.jpg', 'img/memory/img4.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  shuffle(cardsData).forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.dataset.symbol = symbol;

    card.innerHTML = `
      <div class="memory-card-front">💗</div>
      <div class="memory-card-back">
        <img src="${symbol}" alt="amor" />
      </div>
    `;

    card.addEventListener('click', flipMemoryCard);
    game.appendChild(card);
  });
}

function flipMemoryCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipMemoryCard);
  secondCard.removeEventListener('click', flipMemoryCard);

  matchedPairs++;

  resetBoard();

  if (matchedPairs === cardsData.length / 2) {
    statusText.innerText = '¡Ganaste! 💖 Sabía que eras perfecto para mí 😘';
    launchHearts(); // Animación de corazones al ganar
  }
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 800);
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function restartGame() {
  game.innerHTML = '';
  statusText.innerText = '';
  matchedPairs = 0;
  resetBoard();
  createBoard();
}

/* ===== CORAZONES FLOTANDO ===== */
function launchHearts() {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.innerText = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = '-50px';
    heart.style.fontSize = (10 + Math.random() * 30) + 'px';
    heart.style.opacity = Math.random();
    heart.style.pointerEvents = 'none';
    heart.style.transition = 'transform 3s linear, top 3s linear';
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.top = window.innerHeight + 'px';
      heart.style.transform = 'rotate(' + (Math.random()*360) + 'deg)';
    }, 50);

    setTimeout(() => {
      heart.remove();
    }, 3500);
  }
}

createBoard();

function toggleMusic() {
  const audio = document.getElementById('love-audio');
  const btn = document.getElementById('music-btn');
  
  if (audio.paused) {
    audio.play();
    btn.innerText = '🎵 Pausar';
  } else {
    audio.pause();
    btn.innerText = '🎵 Reproducir';
  }
}

