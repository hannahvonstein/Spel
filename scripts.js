const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
 
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
 
function handleCellClick() {
    const cellIndex = this.getAttribute('data-index');
 
    if (gameBoard[cellIndex] !== '' || !gameActive) {
        return;
    }
 
    updateCell(this, cellIndex);
    checkWinner();
}
 
function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
 
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s tur`;
}
 
function checkWinner() {
    let roundWon = false;
 
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameBoard[winCondition[0]];
        const b = gameBoard[winCondition[1]];
        const c = gameBoard[winCondition[2]];
 
        if (a === '' || b === '' || c === '') {
            continue;
        }
 
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
 
    if (roundWon) {
        statusText.textContent = `${currentPlayer} har vunnit!`;
        gameActive = false;
        return;
    }
 
    if (!gameBoard.includes('')) {
        statusText.textContent = 'Oavgjort!';
        gameActive = false;
        return;
    }
 
    changePlayer();
}
 
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `${currentPlayer}'s tur`;
    cells.forEach(cell => (cell.textContent = ''));
}
 
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
 
statusText.textContent = `${currentPlayer}'s tur`;