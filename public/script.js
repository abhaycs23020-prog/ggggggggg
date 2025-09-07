const players = JSON.parse(localStorage.getItem('players'));
const rounds = parseInt(localStorage.getItem('rounds'));
let gameData = JSON.parse(localStorage.getItem('gameData'));

let turn = 0;
let round = 1;
let isDrawing = true;

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;

const turnInfo = document.getElementById('turnInfo');
const clearBtn = document.getElementById('clearBtn');
const nextBtn = document.getElementById('nextBtn');
const guessSection = document.getElementById('guessSection');
const guessInput = document.getElementById('guessInput');
const submitGuess = document.getElementById('submitGuess');

function updateTurnInfo() {
  if(isDrawing) {
    turnInfo.textContent = `Round ${round} - ${players[turn]}'s Turn to Draw`;
    guessSection.style.display = 'none';
    nextBtn.style.display = 'inline';
  } else {
    turnInfo.textContent = `${players[turn]}'s Turn to Guess`;
    guessSection.style.display = 'block';
    nextBtn.style.display = 'none';
  }
}

// Canvas drawing
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if(!drawing || !isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

clearBtn.addEventListener('click', () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
});

nextBtn.addEventListener('click', () => {
  const dataURL = canvas.toDataURL();
  gameData.push({player: players[turn], type: 'drawing', data: dataURL});
  isDrawing = false;
  updateTurnInfo();
});

submitGuess.addEventListener('click', () => {
  const guess = guessInput.value.trim();
  if(guess === '') return;
  gameData.push({player: players[turn], type: 'guess', data: guess});
  guessInput.value = '';
  
  // Next turn
  turn++;
  if(turn >= players.length) {
    turn = 0;
    round++;
  }
  
  if(round > rounds) {
    localStorage.setItem('gameData', JSON.stringify(gameData));
    window.location.href = 'results.html';
  } else {
    isDrawing = true;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    updateTurnInfo();
  }
});

updateTurnInfo();
