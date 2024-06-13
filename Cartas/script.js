const cardsArray = [
    { name: 'card1', img: 'Imagenes/imagen1.png' },
    { name: 'card2', img: 'Imagenes/imagen2.png' },
    { name: 'card3', img: 'Imagenes/imagen3.png' },
    { name: 'card4', img: 'Imagenes/imagen4.png' },
    { name: 'card5', img: 'Imagenes/imagen5.png' },
    { name: 'card6', img: 'Imagenes/imagen6.png' },
    { name: 'card7', img: 'Imagenes/imagen7.png' },
    { name: 'card8', img: 'Imagenes/imagen8.png' },
    { name: 'card1', img: 'Imagenes/imagen1.png' },
    { name: 'card2', img: 'Imagenes/imagen2.png' },
    { name: 'card3', img: 'Imagenes/imagen3.png' },
    { name: 'card4', img: 'Imagenes/imagen4.png' },
    { name: 'card5', img: 'Imagenes/imagen5.png' },
    { name: 'card6', img: 'Imagenes/imagen6.png' },
    { name: 'card7', img: 'Imagenes/imagen7.png' },
    { name: 'card8', img: 'Imagenes/imagen8.png' }
];

cardsArray.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createBoard() {
    cardsArray.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-name', card.name);

        const frontFace = document.createElement('img');
        frontFace.src = card.img;
        frontFace.classList.add('front');

        const backFace = document.createElement('div');
        backFace.classList.add('back');
        backFace.textContent = '?';

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

createBoard();
