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

    //I: num
    //O: boolean

    //iterate over the row and add every index to some varible and check if the sum is more than one return true

    hasRowConflictAt: function(rowIndex) {
      // craete a sum variable
      var sum = 0;
      //assign this.row to board variable
      var board = this.rows();

      var row = board[rowIndex];
      // console.log(row);
      //iterate over the row
      row.forEach((item) => {
        //sum all the index
        sum += item;
      });
      //if the sum grater than one return true
      //if not return false
      return sum > 1 ? true : false;



    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //create a board using this.rows()
      var board = this.rows();
      //iterate over each row in board
      // board.forEach((row, i) => {
      //   if (this.hasRowConflictAt(i)) {
      //     return true;
      //   }
      // });
      for (var i = 0; i < board.length; i++) {
        //invoke hasRowConflictsAt for each row
        if (this.hasRowConflictAt(i)) {
          // if any return true return true
          return true;
        }
      }

      //else at end return false
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
    //craete sum varialbe
      var sum = 0;
      //assign this.row() to board variable
      var board = this.rows();
      //iterate over the board
      for (var i = 0; i < board.length; i++) {
      //add the value of the cuurent index  [rowi][coli] to sum
        var row = board[i];
        sum += row[colIndex];

      }

      //ir sum > 1 return true
      return sum > 1 ? true : false;
      //return false
      // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //create board variable with this.rows()
      //iterate over the board
      //for each index we want to invoke hasColConflictAt
      //if true return true
      //return false
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
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
      var index = majorDiagonalColumnIndexAtFirstRow;
      var board = this.rows();
      var sum = 0;
      for (var i = 0; i < board.length; i++) {
      //  console.log("should be row: ", board[i][i]);
        var x = i + index;
        // console.log('should be value added to sum: ', board[i][x]);
        // console.log('should be x: ', x);
        // console.log("sum: ", sum);
        // console.log("index: ", index);
        if (board[i][x] !== undefined) {
          sum += board[i][x];

        }
      }

      return sum > 1 ? true : false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      var board = this.rows();
      //console.log('board length: ', board.length);

      for (var i = -(board.length); i < board.length; i++) {
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
      var index = minorDiagonalColumnIndexAtFirstRow;
      var rowIn = 0;
      var n = this.get('n');
      //console.log('****',this. _getFirstRowColumnIndexForMinorDiagonalOn());
      var board = this.rows();
      var sum = 0;
      while (rowIn < n && index >= 0 ) {
        if (index < n) {
          sum += board[rowIn][index];
        }
        rowIn ++;
        index --;

      }

      return sum > 1 ? true : false;
    },


    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      var len = (board.length - 1) * 2;
      //console.log('board length: ', board.length);

      for (var i = 0; i < len; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }


      }
      return false; // fixme
    },



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
