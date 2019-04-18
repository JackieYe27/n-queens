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



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme

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
      return arr;
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
        pieceCount++;
        // If there are no conflicts after adding a Rook, push into the temp array and run again
        if(!tempBoard.hasAnyRooksConflicts()) {
          temp.push(tempBoard);
        }
      }
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
