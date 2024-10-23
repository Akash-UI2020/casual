

const cells = document.querySelectorAll('[data-cell]');
const resultMessage = document.getElementById('resultMessage');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let board = ['', '', '', '', '', '', '', '', ''];

let xScore = 0;
let oScore = 0;

// Sound effects

 // Sound when a cell is tapped
const winSound = new Audio('game-start.mp3'); // Sound when someone wins
const tieSound = new Audio('match-cave.mp3'); // Sound for a tie

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle click event for each cell
function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (board[index] !== '' || resultMessage.innerText !== '') {
        return;
    }
    const tapSound = new Audio('mouse-click.mp3');
    // Play tap sound when a cell is clicked
    tapSound.play();
    
    board[index] = isXTurn ? 'X' : 'O';
    cell.innerText = board[index];

    // Add dynamic class to animate "X" or "O"
    cell.classList.add(isXTurn ? 'activeX' : 'activeO');

    if (checkWinner()) {
        resultMessage.innerText = `${isXTurn ? 'X' : 'O'} wins!`;
        
        // Play win sound when a player wins
        winSound.play();
        
        highlightWinningCells();
        return;
    }

    if (board.every(cell => cell !== '')) {
        resultMessage.innerText = 'It\'s a tie!';
        
        // Play tie sound when the game ends in a tie
        tieSound.play();
        return;
    }

    isXTurn = !isXTurn;
}

// Highlight the winning combination
function highlightWinningCells() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => board[index] === (isXTurn ? 'X' : 'O'))) {
            combination.forEach(index => {
                cells[index].style.backgroundColor = '#28a745';
                cells[index].style.color = '#fff';
            });
        }
    });
}

// Check if there's a winner
function checkWinner() {
    if (winningCombinations.some(combination => combination.every(index => board[index] === 'X'))) {
        xScore++;
        document.getElementById('xScore').innerText = xScore;
        if (xScore === 10) {
            showCelebration(); // Show celebration if X reaches 10
        }
        return true;
    } else if (winningCombinations.some(combination => combination.every(index => board[index] === 'O'))) {
        oScore++;
        document.getElementById('oScore').innerText = oScore;
        if (oScore === 10) {
            showCelebration(); // Show celebration if O reaches 10
        }
        return true;
    }
    return false;
}
function showCelebration() {
    const celebrationElement = document.getElementById('celebration');
    celebrationElement.style.display = 'block';

    // Optionally, you can add a timeout to hide it after a few seconds
    setTimeout(() => {
        celebrationElement.style.display = 'none';
    }, 5000); // Hides after 5 seconds
}

// Restart the game
function restartGame() {
    board.fill('');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.style.backgroundColor = ''; // Reset cell colors
        cell.style.color = ''; 
        cell.classList.remove('activeX', 'activeO'); // Remove dynamic classes
    });
    resultMessage.innerText = '';
    isXTurn = true;
    
}


// Add event listeners to cells and restart button
cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);




