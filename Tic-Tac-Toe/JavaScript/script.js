const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-cell-index');

    if (board[cellIndex] || !isGameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        resultDisplay.textContent = `${currentPlayer} Wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell)) {
        resultDisplay.textContent = 'It\'s a Tie!';
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}
function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return board[index] === currentPlayer;
        });
    });
}
function restartGame() {
    currentPlayer = 'X';
    board = Array(9).fill(null);
    isGameActive = true;
    resultDisplay.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
    });
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
