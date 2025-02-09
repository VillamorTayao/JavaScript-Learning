const score = JSON.parse(localStorage.getItem('score')) || {
    Wins: 0,
    Losses: 0,
    Ties: 0
};

console.log(score);

function pickComputerMove(){
    const randomNumber = Math.random();
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3 ) {
        computerMove = 'rock';
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'paper';
    } else if (randomNumber >= 2/3 && randomNumber <= 1) {
        computerMove = 'scissors';
    }

    return computerMove;
}

function randomPlayerMove(){
    const randomPlay = Math.random();
    let playerRandomMove = '';

    if (randomPlay >= 0 && randomPlay < 1/3 ) {
        playerRandomMove = 'rock';
    } else if (randomPlay >= 1/3 && randomPlay < 2/3) {
        playerRandomMove = 'paper';
    } else if (randomPlay >= 2/3 && randomPlay <= 1) {
        playerRandomMove = 'scissors';
    }

    return playerRandomMove;
}

function autoPlay(){
    const isAutoPlay = document.querySelector('.auto-play');

    if(!isAutoPlay.classList.contains('toggled-on')){
        isAutoPlay.classList.add('toggled-on');
        isAutoPlay.innerHTML = `STOP`;

        autoPlayInterval = setInterval(() => {
            const playerMove = randomPlayerMove();
            playGame(playerMove); 
        }, 850); 
        
    } else {
        isAutoPlay.classList.remove('toggled-on');
        isAutoPlay.innerHTML = `AUTO PLAY`;
        clearInterval(autoPlayInterval);
    }
}

function playGame(playerMove){
    let computerMove = pickComputerMove();
    let result = ''

    switch (playerMove) {
        // If player chose ROCK
        case 'rock':
            if (computerMove === 'rock'){
                result = 'IT\'S A TIE!';
            } else if (computerMove === 'paper') {
                result = 'YOU LOSE!';
            } else if (computerMove === 'scissors') {
                result = 'YOU WIN!';
            }
            break;
        
        // If player chose PAPER
        case 'paper':
            if (computerMove === 'paper'){
                result = 'IT\'S A TIE!';
            } else if (computerMove === 'rock') {
                result = 'YOU WIN!';
            } else if (computerMove === 'scissors') {
                result = 'YOU LOSE!';
            }
            break;
    
        // If player chose SCISSORS
        case 'scissors':
            if (computerMove === 'scissors'){
                result = 'IT\'S A TIE!';
            } else if (computerMove === 'paper') {
                result = 'YOU WIN!';
            } else if (computerMove === 'rock') {
                result = 'YOU LOSE!';
            }
            break;
    }

    if (result === 'You Win!') {
        score.Wins++;
    } else if (result === 'YOU LOSE!') {
        score.Losses++;
    } else if (result === 'It\'s a Tie!') {
        score.Ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScore(playerMove, computerMove, result);
}

function resetScore(){
    score.Wins = 0; 
    score.Losses = 0; 
    score.Ties = 0;
    localStorage.removeItem('score');
    updateScore('--', '--', '--');
}

function updateScore(playerMove, computerMove, result){
    const playersMove = document.querySelector('.result-text');
    const gameResult = document.querySelector('.verdict-text');
    const scoreBoard = document.querySelector('.score');

    if(playerMove === '--' && computerMove === '--' && result === '--'){
        playersMove.innerHTML = `YOU: ---, COMPUTER: ---`;
        gameResult.innerHTML = `YOU ---`;
        scoreBoard.innerHTML = `WINS: ${score.Wins}, LOSSES: ${score.Losses}, TIES: ${score.Ties}`;
    } else {
        playersMove.innerHTML = `YOU: <img src="pictures/${playerMove}-emoji.png">, COMPUTER <img src="pictures/${computerMove}-emoji.png">`;
        gameResult.innerHTML = `${result}`;
        scoreBoard.innerHTML = `WINS: ${score.Wins}, LOSSES: ${score.Losses}, TIES: ${score.Ties}`;
    }
}