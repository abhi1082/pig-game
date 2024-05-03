'use strict';

//selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceImge = document.querySelector('.dice');

const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let score, currentScore, activePlayer;

//starting condition
const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0
    currentScore1El.textContent = 0
    diceImge.classList.add('hidden');

    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    //enabling both buttons for reset
    btnRollEl.disabled = false;
    btnHoldEl.disabled = false;

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
};
init();

//dice roll functionality
btnRollEl.addEventListener( 'click', function () {
    //1. generate random dice roll
    const dice = Math.trunc(Math.random()*6) + 1;
    
    //2. display the dice image
    diceImge.classList.remove('hidden');
    diceImge.src = `dice-${dice}.png`;

    //3. if score not = 1, keep adding the score to the current score
    if( dice !== 1 ){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
    }
    else{
        //switch to next player
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
    }
});

btnHoldEl.addEventListener('click', function () {
    //1. add current score to the active player
    score[activePlayer] += currentScore;
    if(score[activePlayer] >= 100){
        //adding the winner class to the winner
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');

        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        //dice image is hidden after someone wins the game
        diceImge.classList.add('hidden');
        //disable both buttons after someone wins the game
        btnRollEl.disabled = true;
        btnHoldEl.disabled = true;

    }else{
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
        //choosing the new active player
        activePlayer = activePlayer === 0 ? 1 : 0;
        //toggle class gives the active class to only 1 player
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active'); 
    }   
});

btnNewEl.addEventListener('click', init);
