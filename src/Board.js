// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // loop through the rowindex and want to check if there are more than 1 queen
      // if so then there is a conflict 
        // return true right away
      // if there is none
        // return false at the end
    hasRowConflictAt: function(rowIndex) {
      let row = this.rows()[rowIndex]; // array of rows, get the row that is the rowIndex
      let count = 0;
      for (let value of row) {
        if (value === 1) {
          count++;
        }
        if (count > 1) {
          return true;
        }
      } 
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    // use the board's row function to get all the rows of the board
    // we can just run function above to check each row on the board
      // if there are no conflicts for that row then look at the next row,
      // if there is a conflict, return true to show that there are row conflicts
    // at the end if there are no conflicts just return false
    hasAnyRowConflicts: function() {
      let rows = this.rows() // this is the board
      for (let i = 0; i < rows.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    // Lets say we have colIndex = 1
      // to check for that, we would want to go into the row and check for that same index in the row
    // if there is a queen we want to count it
    // Then go into the next row and check the colIndex and continue for each row
      // We want to stop counting if the counter is greater than 1 and return true
    
     
    hasColConflictAt: function(colIndex) {
      let rows = this.rows();
      let counter = 0;
      // the row in this case would the each inner array of the board
      for (let row of rows) {
        if (row[colIndex] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts

    // we are now checking to see all cols to see if they have conflicts
    // will use the function above to test each col
    // if the function above returns true there is a conflict so return true
    // if not then return false
    // Our board is a square. So the # of columns = # of rows
    // this.rows() invokes the function to equal the array of rows
    // i in this case is the colIndex which is the same as the rowIndex
    // note: To get the number of columns we would have to go inside the row to count the length
      // insde of the row shows the columns
    hasAnyColConflicts: function() {
      for (let i = 0; i < this.rows().length; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let rows = this.rows();
      let boardLength = rows.length;
      let diagonalLength = boardLength - Math.abs(majorDiagonalColumnIndexAtFirstRow);
      let counter = 0;
      let colIdx = majorDiagonalColumnIndexAtFirstRow;
      let rowIdxStart = 0;

      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        rowIdxStart = majorDiagonalColumnIndexAtFirstRow * -1;
        colIdx = 0;
        diagonalLength++;
      }
      for (let i = rowIdxStart; i < diagonalLength; i++) {
        // i.e. rows[0][1]
        if (rows[i][colIdx] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
        colIdx++;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // Get length of board
      let boardLength = this.rows().length;
      // Need to go from i = (-length + 1) to (length - 1) (<length)
      for (let i = 1 - boardLength; i < boardLength; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let rows = this.rows();
      let boardLength = rows.length;
      let diagonalLength = minorDiagonalColumnIndexAtFirstRow + 1;
      let counter = 0;
      let colIdx = minorDiagonalColumnIndexAtFirstRow;
      let rowIdxStart = 0;

      if (minorDiagonalColumnIndexAtFirstRow >= boardLength) {
        rowIdxStart = minorDiagonalColumnIndexAtFirstRow - 3;
        colIdx = boardLength - 1;
        diagonalLength = boardLength - (minorDiagonalColumnIndexAtFirstRow - boardLength);
      }
      
      for (let i = rowIdxStart; i < diagonalLength; i++) {
        // i.e. rows[0][1]
        if (rows[i][colIdx] === 1) {
          counter++;
        }
        if (counter > 1) {
          return true;
        }
        colIdx--;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let boardLength = this.rows().length;
      for (let i = 0; i <= (boardLength - 1) * 2; i++) {
        if(this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
