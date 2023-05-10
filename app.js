const squares = document.querySelectorAll('.square');
const currentPlayerDisplay = document.querySelector('.current-player');
let currentPlayer = 'X';

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  currentPlayerDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkForWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6] // diagonal
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (squares[a].textContent === currentPlayer &&
        squares[b].textContent === currentPlayer &&
        squares[c].textContent === currentPlayer) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;
    }
  }
  return true;
}

function endGame(result) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].removeEventListener('click', handleClick);
  }
  alert(result);
}

function handleClick(event) {
  const square = event.target;
  if (square.textContent !== '') {
    return;
  }
  square.textContent = currentPlayer;
  if (checkForWin()) {
    endGame(`${currentPlayer} wins!`);
  } else if (checkDraw()) {
    endGame("It's a draw!");
  } else {
    changePlayer();
  }
}

function startGame() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', handleClick);
  }
  currentPlayerDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

startGame();
