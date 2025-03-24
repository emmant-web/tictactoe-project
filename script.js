let board = document.getElementById("board");
let prev = document.getElementById("prev");
let reset = document.getElementById("reset");
let info = document.getElementById("info-display");
let gameOver = false;   // Flag to track if the game is over

let currentStep = 0;         // Tracks which board state you are viewing
let maxStep = 0;              // Tracks the latest move


let gameBoard = [
  //    0   1   2
  ["", "", ""],
  //    3   4   5
  ["", "", ""],
  //    6   7   8
  ["", "", ""],
];



let state = [];

let moves = 0;

let playerTurn1 = true;

function createBoard() {
  board.innerHTML = '';

  for (let i = 0; i < 9; i++) {
    let tictactoeGrid = document.createElement("div");
    tictactoeGrid.classList.add("tictactoeBox");

    let gridID = `box${i}`;
    tictactoeGrid.setAttribute("id", gridID);

    board.append(tictactoeGrid);
    tictactoeGrid.addEventListener("click", () => {
      addMove(gridID, i);
    }); 
  }
}



function addMove(element, boxNumber) {
  if (gameOver) return;  

  let specificGrid = document.getElementById(element);

  if (!specificGrid.textContent) {
      moves++;

      if (playerTurn1) {
          specificGrid.textContent = "X";
          specificGrid.classList.add("X-style");
          
          document.body.style.backgroundColor = "#2ecc71";  // O turn → green background

          playerTurn1 = false;
      } else {
          specificGrid.textContent = "O";
          specificGrid.classList.add("O-style");
          document.body.style.backgroundColor = "#f39c12";  // X turn → orange background
          playerTurn1 = true;
      }

      updateBoard(specificGrid, boxNumber);
      
      //  Always check for the win/tie after every move
      checkEndGame();
  }
}



function updateBoard(element, boxNumber) {

  let row = Math.floor(boxNumber / 3);
  let column = boxNumber % 3;

  gameBoard[row][column] = element.innerText;
  updateState(gameBoard);
}



function updateState(boardCopy) {
  const newBoard = [];
  for (let i = 0; i < boardCopy.length; i++) {
      const row = [];
      for (let j = 0; j < boardCopy[i].length; j++) {
          row.push(boardCopy[i][j]);
      }
      newBoard.push(row);
  }

  // Add the new state
  state.push(newBoard);
  
  // Update maxStep and currentStep
  maxStep = state.length - 1;
  currentStep = maxStep;

  console.log(state);
  checkEndGame();
}


function checkEndGame() {
  // Check rows
  for (let row = 0; row < 3; row++) {
      if (
          gameBoard[row][0] &&
          gameBoard[row][0] === gameBoard[row][1] &&
          gameBoard[row][1] === gameBoard[row][2]
      ) {
          declareWinner(gameBoard[row][0]);
          return; 
      }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
      if (
          gameBoard[0][col] &&
          gameBoard[0][col] === gameBoard[1][col] &&
          gameBoard[1][col] === gameBoard[2][col]
      ) {
          declareWinner(gameBoard[0][col]);
          return;
      }
  }

  // Check diagonals
  if (
      gameBoard[0][0] &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][2]
  ) {
      declareWinner(gameBoard[0][0]);
      return;
  }

  if (
      gameBoard[0][2] &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[1][1] === gameBoard[2][0]
  ) {
      declareWinner(gameBoard[0][2]);
      return;
  }

  //  Proper tie check based on `moves` counter
  if (moves === 9) {
      document.getElementById("show").style.display = "block";
      document.getElementById("info-display").textContent = "It's a tie! 😕";
  }
}





function declareWinner(player) {
  gameOver = true;   // Stop further moves
    document.getElementById("show").style.display = "block";
    document.getElementById("info-display").textContent = `${player} wins! 🎉`;
}
  




function reflectBoard(index) {
  let tempBoard = state[index];
  let moveString = [];

  for (let i = 0; i < tempBoard.length; i++) {
    for (let j = 0; j < tempBoard[i].length; j++) {
      moveString.push(tempBoard[i][j]);
    }
  }

  for (let grid = 0; grid < moveString.length; grid++) {
    document.getElementById(`box${grid}`).textContent = moveString[grid];
  }
}



function resetGame() {
  gameOver = false;   // Stop further moves
  const cells = document.querySelectorAll('.tictactoeBox');

  state = [];
  

  // Clear the board visually
  cells.forEach(cell => {
      cell.textContent = '';
      cell.classList.remove('X-style', 'O-style');
      document.body.style.backgroundColor = "#342e37";  // X turn → 
  });

  //  Reset the game logic
  gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
  ];

  moves = 0;                            // Reset moves counter properly
  playerTurn1 = true;                   // Reset the turn

  //  Hide the win/tie message
  document.getElementById("show").style.display = "none";
  document.getElementById("info-display").textContent = '';

  //  Reattach the click event listeners properly
  const boxes = document.querySelectorAll(".tictactoeBox");
  boxes.forEach((box, index) => {
      box.onclick = () => addMove(`box${index}`, index);
  });

  console.log("Game reset successful! 🎯");
}


function showBoard(step) {
  let tempBoard = state[step];

  for (let i = 0; i < tempBoard.length; i++) {
      for (let j = 0; j < tempBoard[i].length; j++) {
          let boxIndex = i * 3 + j;                         // Map 2D to 1D index
          let box = document.getElementById(`box${boxIndex}`);
          box.textContent = tempBoard[i][j];                 // Display X/O
      }
  }
}



function prevMove() {
  if (currentStep > 0) {
      currentStep--;                // Go back one step
      showBoard(currentStep);
  }
}

function nextMove() {
  if (currentStep < maxStep) {
      currentStep++;                // Go forward one step
      showBoard(currentStep);
  }
}







createBoard();
restart();


// prev.addEventListener("click", () => reflectBoard(7));
reset.addEventListener("click", resetGame);


prev.addEventListener("click", prevMove);
next.addEventListener("click", nextMove);
