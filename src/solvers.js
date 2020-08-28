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


//create a board

// place a piece on board

//check for conflicts
// if no conflicts place next piece
// else remove that piece, go back to previous level and place new piece in next available spot ==> recursion

//when n=== rows and no more pieces to place => we found a soluion and incerement coun or (return that soultion)



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  var board = new Board({n: n});

  var recursive = function (row) {
    if (row === n) {
      solution = board.rows();
      return;
    }
    for (var i = 0; i < n; i++) {

      board.togglePiece(row, i);
      if (!board.hasAnyRooksConflicts()) {
        recursive (row + 1);
      } else {

        board.togglePiece(row, i);
      }

    }
  };
  recursive(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;


};







// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  //create a board
  var board = new Board({n: n});

  var recursive = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);

      if (!board.hasAnyRooksConflicts()) {
        recursive (row + 1);
      }
      board.togglePiece(row, i);
    }
  };
  recursive(0);

  return solutionCount;


};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  //fixme

  var board = new Board({n: n});
  // var solution = board.rows();

  // if (n === 2 || n === 3) {
  //   return 1;
  // }

  var recursive = function (row) {
    if (row === n) {
      if (!board.hasAnyQueensConflicts()) {
        return true;
      }

    }

    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {

        if (recursive (row + 1)) {
          return true;
        }
      }

      board.togglePiece(row, i);
    }
    return false;
  };
  recursive(0);

  return board.rows();


};



// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {


  var solutionCount = 0;
  var board = new Board({n: n});

  var recursive = function (row) {
    if (row === n) {
      solutionCount ++;
      return;
    }
    for (var i = 0; i < n; i++) {

      board.togglePiece(row, i);
      if (!board.hasAnyQueensConflicts()) {
        recursive (row + 1);
      }

      board.togglePiece(row, i);


    }
  };
  recursive(0);


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
