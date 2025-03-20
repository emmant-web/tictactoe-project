let board = document.getElementById("board");
let prev = document.getElementById("prev");

let gameBoard = [
//    0   1   2
    ['', '', ''],
    //    0   1   2
    ['', '', ''],
    //    0   1   2
    ['', '', '']
]

let state = [];

let moves = 0;

let playerTurn1 = true;

function createBoard(){
     for(let i = 0; i < 9; i++){
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


function addMove(element, boxNumber){
    moves++;
    let specificGrid = document.getElementById(element);
    // if grid is empty 
    if(!specificGrid.textContent){
        if(playerTurn1){
            specificGrid.textContent = "X";
            playerTurn1 = false; 
        } else {
            specificGrid.textContent = "O";
            playerTurn1 = true;
        }
    }
}

function updateBoard(element, boxNumber){

}

function updateState(boardCopy){

}

function checkEndGame(){

}

function reflectBoard(index){
    
}

prev.addEventListener("click", () => reflectBoard(7));

createBoard();