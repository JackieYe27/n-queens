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
  let currentSpace = 0;
  let totalSpaces = Math.pow(n, 2);
  let pieceCount = 0;
  // Toggle First Position
  // Toggle Second Position
  function helperRecursive(board) {
    // Base Case
    if (pieceCount === n) {
      return board;
    }
    for (let i = 0; i < totalSpaces; i++) {
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
  let solutionCount = 0;
  let newBoard = new Board({n:n});

  function recurse(row) {
    if (row === n) {
      solutionCount++;
      return;
    }

    for (let col = 0; col < n; col++) {
      newBoard.togglePiece(row, col);
      if (!newBoard.hasAnyRooksConflicts()) {
        recurse(row + 1);
      }
      newBoard.togglePiece(row, col);
    }
  }
  recurse(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
  // let solutionCount = 0;
  // let totalSpaces = Math.pow(n, 2);
  // let spaceStart = 0;
  // let currentSpace = 0;
  // let pieceCount = 0;
  
  // function recursionHelper(currentSpace) {
  //   if (spaceStart === totalSpaces - 1) return;
  //   if (currentSpace === totalSpaces) {
  //     spaceStart++;
  //     currentSpace = spaceStart;
  //     pieceCount = 0;
  //   }
  //   let newBoard = new Board({n:n});
  //   // let initColIdx = spaceStart % n;
  //   // let initRowIdx = Math.floor(spaceStart / n);
  //   // newBoard.togglePiece(initRowIdx, initColIdx);
  //   for (let i = spaceStart; i < totalSpaces; i++) {
  //     let colIdx = i % n;
  //     let rowIdx = Math.floor(i / n);
  //     if (newBoard.rows()[rowIdx][colIdx] === 0) {
  //       newBoard.togglePiece(rowIdx, colIdx);
  //       if (newBoard.hasAnyRooksConflicts()) {
  //         newBoard.togglePiece(rowIdx, colIdx);
  //       } else {
  //         pieceCount++;
  //         if (pieceCount === n) {
  //           solutionCount++;
  //           newBoard.togglePiece(rowIdx, colIdx);
  //           pieceCount--;
  //         }
  //       }
  //     }
  //     currentSpace++;
  //   }
  //   recursionHelper(currentSpace);
  // }
  // recursionHelper(currentSpace);
  // function helperRecursive() {
    //   let inProgressBoards = [];
  //   let currentSpace = 0;
  //   // Base Case
  //   if (pieceCount === n) return boardArrays;
  //   // boardArrays at every index will have its own board
  //   let rows = boardArrays[0].rows();
  //   let tempArray = rows.slice();
  //   for (let i = 0; i < totalSpaces; i++) {
      
  //     let currentBoard = new Board(tempArray);
  //     let colIndex = currentSpace % n;
  //     let rowIndex = Math.floor(currentSpace / n);
  //     if (currentBoard.rows()[rowIndex][colIndex] === 0) {
  //       currentBoard.togglePiece(rowIndex, colIndex); // don't toggle off existing rook
  //     }
  //     inProgressBoards.push(currentBoard);
  //     console.log(inProgressBoards);
  //     currentSpace++;
  //   }
  // }
  // helperRecursive();
  //workingBoards = helperRecursive(workingBoards);
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
