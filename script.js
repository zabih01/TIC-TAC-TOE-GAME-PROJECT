const boxes = document.querySelectorAll('.box');
const winnerMsg = document.querySelector('.winner_msg');
const msgContainer = document.querySelector('.msg_container');
const resetBtn = document.getElementById('reset_btn');
const newBtn = document.getElementById('new_btn');

let currentPlayer = 'X';
let board = Array(9).fill('');
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      showWinner(board[a]);
      return true;
    }
  }
  if (!board.includes('')) {
    showWinner('Draw');
    return true;
  }
  return false;
}

function showWinner(winner) {
  gameActive = false;
  msgContainer.classList.remove('hide');
  winnerMsg.textContent = winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`;
}

function handleBoxClick(e, idx) {
  if (!gameActive || board[idx]) return;
  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  if (!checkWinner()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function resetGame() {
  board = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  boxes.forEach(box => box.textContent = '');
  msgContainer.classList.add('hide');
}

boxes.forEach((box, idx) => {
  box.addEventListener('click', (e) => handleBoxClick(e, idx));
});

resetBtn.addEventListener('click', resetGame);
newBtn.addEventListener('click', resetGame);