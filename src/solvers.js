/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// togglePiece: function(rowIndex, colIndex)
window.findNRooksSolution = function(n) {
  var solution; //fixme
  // Create New Board
  let board = new Board({n:n});
  let rows = board.rows();
  let boardLength = rows.length;
  board.togglePiece(0,0);
  let currentSpace = 1;
  let totalSpaces = Math.pow(n, 2);
  let pieceCount = 1;
  // Toggle First Position
  // Toggle Second Position
  function helperRecursive(board) {
    // Base Case
    if (pieceCount === n) {
      return board;
    }
    for (let i = 1; i < totalSpaces; i++) {
      // after looping through we need new index for the col and row
      let rowIndex = Math.floor(currentSpace / boardLength);
      let colIndex = currentSpace % boardLength;
      // toggle the new piece
      board.togglePiece(rowIndex, colIndex);
      // if that piece conflicts untoggle it
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(rowIndex, colIndex);
      } else {
        // piece has no conflict? so add it to count
        pieceCount++;
      }
      // move to next space
      currentSpace++;
    }
    return helperRecursive(board); // need to return, so solution evaluates to a board and not undefined
  }
    // if conflict, untoggletoggle third position, continue....
    // if no conflict
  // toggle next position
  solution = helperRecursive(board).rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// Create a new board n x n dimensions
// Array of In Progress Working Boards
// Helper Function that does the recursion (accept current array of working boards)
  // base case = n rooks on the board
  // create storage for arrays that work that will be used as the arguments for the next call
window.countNRooksSolutions = function(n) {
  let board = new Board(n); // 2x2 Board
  let totalSpaces = Math.pow(n, 2); // 4 Total Spaces
  let pieceCount = 0;
  let solutionCount = 0; 
  function recursiveHelper(arr) {
    // Base Case: Boards have N-Rooks and are not attacking, return solution
    if (pieceCount === n) {
      solutionCount = arr.length;
    }
    // Temporary Storage Variable to Hold Working Boards
    let temp = [];
    // Loop Through Every Board from Input Array
    for (let j = 0; j < arr.length; j++) {
      // Loop Through Every Space for Each Board
      for (let i = 0; i < totalSpaces; i++); {
        let tempBoard = arr[j]; 
        let rowIdx = Math.floor(i / n);
        let colIdx = i % n;
        tempBoard.togglePiece(rowIdx, colIdx);
        // If there are no conflicts after adding a Rook, push into the temp array and run again
        if(!tempBoard.hasAnyRooksConflicts()) {
          temp.push(tempBoard);
        }
      }
      pieceCount++;
    }
  };
  recursiveHelper([board]);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
