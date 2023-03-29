const INITIAL_MARKER = " ";
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';


// different winning ways
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];

function initializedBoard() {
  let board = {};
  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }
  return board;
}



function playerChoice(board) {
  document.addEventListener('DOMContentLoaded', () => {
    let squares = document.querySelectorAll(".box");
    squares.forEach(square => {
      square.addEventListener('click', () => {
        if (square.textContent !== HUMAN_MARKER && square.textContent !== COMPUTER_MARKER) {
          square.textContent = HUMAN_MARKER;
          board[square.id] = HUMAN_MARKER;
          computerChoice(board);
        }
      });
    });
  });
}

function emptySquares() {
  // return an array containing the keys of the board object where the value is equal to INITIAL_MARKER.
  // In other words, is still empty
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function computerChoice(board) {
  let square;
  let center = 5;

  /* The first for loop iterates through all possible winning lines, 
    trying to find a square that would let the computer win if it played there.
    If such a square is found, it breaks out of the loop.*/
  for (let i = 0; i < WINNING_LINES.length; i++) {
    square = findAtRiskSquare(WINNING_LINES[i], board, COMPUTER_MARKER);
    if (square) break;
  }
  /*If no winning square is found, the second for loop iterates through all possible winning lines, 
  looking for a square that would let the human player win if the computer doesn't play there. 
  If such a square is found, it breaks out of the loop.*/
  if (!square) {
    for (let index = 0; index < WINNING_LINES.length; index++) {
      square = findAtRiskSquare(WINNING_LINES[index], board, HUMAN_MARKER);
      if (square) break;
    }
  }
  // If no winning or blocking square is found and the center square is empty, the computer chooses the center square.
  if (board[center] === INITIAL_MARKER) square = center;
  //If the center square is not available, the computer chooses a random empty square on the board.
  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }
  //the chosen square is updated with the COMPUTER_MARKER.
  board[square] = COMPUTER_MARKER;
  let squareId = document.getElementById(square.toString());
  squareId.textContent = COMPUTER_MARKER;
}
//possible winning combination
function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);
  // Check if the given marker appears twice in the line 
  if (markersInLine.filter(val => val === marker).length === 2) {
    // If it appears twice, the function tries to find the empty square in the line (
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}

  let tttBoard = initializedBoard();
  playerChoice(tttBoard);

 








