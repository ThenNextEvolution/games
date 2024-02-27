document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('tic-tac-toe-board');
    const restartButton = document.getElementById('restart-game');
    let currentPlayer = 'Batman'; // Alternates between Batman and Opponent
    const gameState = ['', '', '', '', '', '', '', '', ''];

    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick, { once: true });
            board.appendChild(cell);
        }
    };

    const handleCellClick = (e) => {
        const cell = e.target;
        const currentIndex = cell.dataset.index;
        if (currentPlayer === 'Batman') {
            cell.style.backgroundImage = "url('/joker.png')";
            cell.style.backgroundSize = 'cover';
            gameState[currentIndex] = 'B'; // B for Batman
            currentPlayer = 'Opponent';
        } else {
            cell.style.backgroundImage = "url('/batman.png')";
                       cell.style.backgroundSize = 'cover';
            gameState[currentIndex] = 'O'; // O for Opponent
            currentPlayer = 'Batman';
        }
        checkForWinner();
    };

    const checkForWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        let roundWon = false;
        for (let i = 0; i < winPatterns.length; i++) {
            const winPattern = winPatterns[i];
            const a = gameState[winPattern[0]];
            const b = gameState[winPattern[1]];
            const c = gameState[winPattern[2]];
            if (a === '' || b === '' || c === '') continue;
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            alert(`${currentPlayer} wins!`);
            setTimeout(restartGame, 3000); // Restart the game after 3 seconds
            return; // Exit the function to avoid proceeding to the draw logic
        }
    
        // Check for a draw
        const draw = !gameState.includes('');
        if (draw) {
            alert("It's a draw!");
            setTimeout(restartGame, 3000); // Restart the game after 3 seconds
        }
    };
    

    restartButton.addEventListener('click', () => {
        gameState.fill('');
        board.innerHTML = '';
        createBoard();
    });

    createBoard();
});
