'use strict';

const score0Ele = document.getElementById ("score--0");
const socre1Ele = document.getElementById('score--1');

const currentScore0Ele = document.getElementById ('current--0');
const currentScore1Ele = document.getElementById ('current--1');

const diceEle = document.querySelector ('.dice');

const btnRollEle = document.querySelector ('.btn--roll');
const btnNewGameEle = document.querySelector ('.btn--new');
const btnHoldEle = document.querySelector ('.btn--hold');

const player0Ele = document.querySelector (".player--0");
const player1Ele = document.querySelector (".player--1");

let currentScore, activePlayer, scores, playing;
const init = function () {
    //display initial scores;
    score0Ele.textContent = 0;
    socre1Ele.textContent = 0;
    currentScore0Ele.textContent = 0;
    currentScore1Ele.textContent = 0;

    //initialize
    currentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    playing = true;

    // display dice
    diceEle.classList.add('hidden');

    //initialize style classes for players
    player0Ele.classList.remove ("player--winner");
    player1Ele.classList.remove ("player--winner");
    player0Ele.classList.add ("player--active");
    player1Ele.classList.remove ("player--active");
    
};

init();

const switchPlayer = function () {
    document.querySelector (`.player--${activePlayer}`).classList.remove ("player--active");
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector (`.player--${activePlayer}`).classList.add ("player--active");

}
const handleRollDice = function () {
    if (playing) {
        //roll dice
        let dice = Math.trunc(Math.random() * 6) + 1;

        //display dice
        diceEle.classList.remove("hidden");
        diceEle.src = `dice-${dice}.png`;

        // change the player current score
        if (dice != 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else { //change the player
            currentScore = 0;
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            switchPlayer();
        }
    }
}

const handleHoldScore = function () {
    if (playing) {
        //add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;

        //if a player wins disable playing buttons and don't switch the player
        if (scores[activePlayer] >= 10) {
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            // btnRollEle.disabled = true;
            // btnHoldEle.disabled = true;
            diceEle.classList.add("hidden");
        }
        else
            switchPlayer();
    }
}

btnRollEle.addEventListener ("click", handleRollDice);
btnHoldEle.addEventListener ("click", handleHoldScore);
btnNewGameEle.addEventListener ("click", init);