const gridContainer = document.querySelector(".grid-container");
const myAudio = document.getElementById("Myaudio");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
let attempts = 0;
let maxAttempts = 15;
let matchedCardsCount = 0;
let timer;
let timeLeft = 60; 
let isTimerRunning = false; 
let gameOver = false; 

myAudio.volume = .1;

document.querySelector(".score").textContent = score;
document.querySelector(".time").textContent = `Time Left: ${timeLeft}s`;

window.onload = function() {
    showIntroModal();
};

function fetchCards() {
    return fetch("./data/cards.json")
        .then((res) => res.json())
        .then((data) => {
            cards = [...data, ...data]; 
            shuffleCards();
            generateCards();
        });
}

function showIntroModal() {
    const introModal = document.createElement("div");
    introModal.classList.add("intro-modal");
    introModal.innerHTML = `
        <div class="modal-content">
            <h2>Welcome to Memory Card Game!</h2>
            <p>Test your memory and match all the cards!</p>
            <p>Mechanics:</p>
            <ul>
                <li><strong>• 15 Attempts</strong> to match the cards</li>
                <li><strong>• 1 Minute</strong> time limit</li>
                <li>• Match pairs of cards by flipping them</li>
                <li>• If all pairs are matched before time runs out, you win!</li>
            </ul>
            <button onclick="startGame()">Start Game</button>
        </div>
    `;
    document.body.appendChild(introModal);

    setTimeout(() => {
        introModal.classList.add("modal-show");
    }, 100);

    const listItems = introModal.querySelectorAll("ul li");
    listItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.3}s`; 
        item.classList.add('fadeIn'); 
    });
}

function startGame() {
    const introModal = document.querySelector(".intro-modal");
    if (introModal) {
        introModal.classList.remove("modal-show");
        setTimeout(() => {
            introModal.remove(); 
            if (cards.length === 0) { 
                fetchCards(); 
            } else {
                shuffleCards(); 
                generateCards(); 
            }
        }, 500);
    }
}

function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex, temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    gridContainer.innerHTML = "";
    for (let card of cards) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
            <div class="front">
                <img class="front-image" src=${card.image} />
            </div>
            <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipcard);
    }
}

function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;

    timer = setInterval(() => {
        if (gameOver) {
            clearInterval(timer);
            return;
        }

        timeLeft--;
        document.querySelector(".time").textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeLeft = 60; 
            isTimerRunning = false;
            gameOver = true;
            setTimeout(showTryAgainModal, 500);
        }
    }, 1000);
}

function flipcard() {
    if (lockBoard || attempts >= maxAttempts || timeLeft <= 0) {
        if (attempts >= maxAttempts && !document.querySelector(".modal")) {
            setTimeout(showTryAgainModal, 500);
        }
        return;
    }

    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        if (!isTimerRunning) startTimer();
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkforMatch();
}

function checkforMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        matchedCardsCount++;
        disabledCards();
    } else {
        attempts++;
        score++;
        document.querySelector(".score").textContent = score;
        unflipCards();
    }

    if (matchedCardsCount === cards.length / 2) {
        setTimeout(showWinnerModal, 500);
    }
}

function disabledCards() {
    firstCard.removeEventListener("click", flipcard);
    secondCard.removeEventListener("click", flipcard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function showTryAgainModal() {
    const tryAgainModal = document.createElement("div");
    tryAgainModal.classList.add("modal", "try-again");
    tryAgainModal.innerHTML = `
        <div class="modal-content">
            <h2>Oops, you've reached the maximum attempts or time!</h2>
            <p>Don't worry, you can try again and improve your memory!</p>
            <button onclick="restart()">Try Again</button>
        </div>
    `;
    document.body.appendChild(tryAgainModal);

    setTimeout(() => {
        tryAgainModal.classList.add("modal-show");
    }, 100);
}

function showWinnerModal() {
    clearInterval(timer); 
    gameOver = true; 
    timeLeft = 60; 
    const winnerModal = document.createElement("div");
    winnerModal.classList.add("modal", "you-win");
    winnerModal.innerHTML = ` 
        <div class="modal-content">
            <h2>Congratulations!</h2>
            <p>You matched all the cards!</p>
            <button onclick="restart()">Play Again</button>
        </div>
    `;
    document.body.appendChild(winnerModal);

    setTimeout(() => {
        winnerModal.classList.add("modal-show");
    }, 100);

    generateConfetti();
}

function restart() {
    resetBoard();
    matchedCardsCount = 0;
    attempts = 0;
    score = 0;
    document.querySelector(".score").textContent = score;
    document.querySelector(".time").textContent = `Time Left: 60s`;
    timeLeft = 60; 
    gameOver = false; 
    isTimerRunning = false;
    clearInterval(timer); 
    gridContainer.innerHTML = "";
    shuffleCards();
    generateCards();

    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => modal.remove());
}
