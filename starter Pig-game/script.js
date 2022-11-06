'use strict';
//SELECTING ELEMENTS
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

let scores, playing, currentScore, activePlayer;

let current0EL = document.querySelector('#current--0');
let current1EL = document.querySelector('#current--1');

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};
//STARTING CONDITIONS
const newGame = function () {
  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  currentScore = 0;

  scores = [0, 0];
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  diceEl.classList.add('hidden');
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
};

newGame();

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

btnRoll.addEventListener('click', function () {
  if (playing) {
    //GENERATE NEW NUMBER
    const dice = Math.trunc(Math.random() * 6 + 1);
    //DISPLAY NUMBER
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //CHECK WHETHER IT IS 1 OR NOT
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', newGame);
