/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, dice1, dice2;

let FINAL_SCORE;
const RESET_VALUE_IF_DOUBLE_ROLL = 6;

const rollDiceBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');

const diceDom1 = document.querySelector('#dice-1');
const diceDom2 = document.querySelector('#dice-2');

let lastRollValue;

init();

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	initInput();
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	if (FINAL_SCORE === undefined || FINAL_SCORE <= 0) {	
		rollDiceBtn.disabled = true;
		holdBtn.disabled = true;
	} else {
		rollDiceBtn.disabled = false;
		holdBtn.disabled = false;
	}
}

rollDiceBtn.addEventListener('click', function() {
	const currentScoreDom = document.querySelector('#current-'+activePlayer);
	dice1 = getDiceValue();
	dice2 = getDiceValue();
	displayDices(dice1, dice2);
	if (dice1 === dice2 && dice1 === RESET_VALUE_IF_DOUBLE_ROLL) {
		resetAfterTwoSixes();
	} else {
		if (dice1 === 1 || dice2 === 1) {
			changePlayer();
		} else {
			currentScoreDom.textContent = parseInt(currentScoreDom.textContent) + (dice1 + dice2);
			roundScore += (dice1 + dice2);
		}
	}
});

holdBtn.addEventListener('click', function() {
	const currentPlayerScoreDom = document.querySelector('#score-'+activePlayer);
	scores[activePlayer] += roundScore;
	currentPlayerScoreDom.textContent = scores[activePlayer];
	if (playerWon()) {
		endGame();
	} else {
		changePlayer();
	}
});

function initInput() {
	const inputWinngScoreDom = document.querySelector('#max-score-input');
	inputWinngScoreDom.onkeypress = function(){
		return event.charCode >= 48 && event.charCode <= 57;
	};
	inputWinngScoreDom.onblur = function(){
		FINAL_SCORE = parseInt(inputWinngScoreDom.value);
		if (FINAL_SCORE > 1) {
			rollDiceBtn.disabled = false;
			holdBtn.disabled = false;
		}
	};
}

function resetAfterTwoSixes() {
	scores[activePlayer] = 0;
	document.getElementById('score-'+activePlayer).textContent = '0';
	changePlayer();
}

function endGame() {
	document.querySelector('#name-'+activePlayer).textContent = 'Winner !';
	document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
	document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
	rollDiceBtn.disabled = true;
	holdBtn.disabled = true;
}

function displayDices(dice1Value, dice2Value) {
	diceDom1.style.display = 'block';
	diceDom2.style.display = 'block';
	diceDom1.src = 'dice-' + dice1Value + '.png';
	diceDom2.src = 'dice-' + dice2Value + '.png';
}

function getDiceValue() {
	return Math.floor(Math.random() * 6) + 1;
}

function playerWon() {
	return scores[activePlayer] >= FINAL_SCORE;
}

function changePlayer() {
	lastRollValue = 0;
	const currentScoreDom = document.querySelector('#current-'+activePlayer);
	currentScoreDom.textContent = 0;
	roundScore = 0;
	document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
	activePlayer = activePlayer === 0 ? 1 : 0;
	document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
	document.getElementById('dice-1').style.display = 'none';
	document.getElementById('dice-2').style.display = 'none';
}
