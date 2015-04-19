// JScript File

function Board(arrBoard) {
    this.arr = arrBoard; // array or current board
    this.ai = "O";
    this.player = "X";
    this.emptySpot = "-";
    
    // clear current board
    this.clear = function() {
        for( var y = 0; y<3; y++ ) {
            for( var x = 0; x<3; x++ ) {
                if( this.arr[x] == null ) {
                    this.arr[x] = [];
                }
                this.arr[x][y] = this.emptySpot;
            }
        }
    };
     
    // returns array of Board()
    // @player = "X" (player, min) or "O" (ai, max)
    this.getAvailableMoves = function(player) {
        var arrBoards = [],
            i = 0,
            b = null;
        
        for( var y = 0; y<3; y++ ) {
            for( var x = 0; x<3; x++ ) {
                if( this.arr[x][y] == this.emptySpot ) {
                    //alert('found ai move');
                    b = new Board(this.arrayCopy()); // copy
                    b.arr[x][y] = player; // add new move 
                    arrBoards[i++] = b; // add to return array
                }
            }
        }
        return arrBoards;
    };
    
    // copy current board
    this.arrayCopy = function() {
        var newArr = [];
        for( var y=0; y<3; y++) {
            for( var x=0; x<3; x++) {
                if( newArr[x] == null ) { newArr[x] = []; }
                newArr[x][y] = this.arr[x][y];
            }
        }
        return newArr;
    };
    
    // check if no more moves available
    this.isTerminalMove = function() {
        var w = this.getWinner();
        if(  w == "O" ||  w == "X" ) { return true; }
        else { 
            for( var y=0; y<3; y++) {
                for( var x=0; x<3; x++) {
                    if( this.arr[x][y] == this.emptySpot ) {
                        return false;
                    }
                }
            }
            return true;  // no moves left
        }
    };
    
    // current score: 0 or -1 or 1 if AI is winning
    // @player = "X" (player, min) or "O" (ai, max)
    this.getCurrentScore = function() {
        var winner = this.getWinner();
                
        if( winner == this.ai ) { return 1; }
        else if( winner == this.player ) { return -1; }
        else { return 0; }
    };
    
    // check for winning conditions
    this.getWinner = function() {
        // vert
        for( var x = 0; x < 3; x++ ) {            
            if( this.arr[x] && this.arr[x][0] == this.arr[x][1] &&  this.arr[x][0] == this.arr[x][2] &&  this.arr[x][0] != this.emptySpot) {
                return this.arr[x][0];
            }
        }
        
        // horiz check
        for( var y = 0; y < 3; y++ ) {            
            if( this.arr[0] && this.arr[1] && this.arr[2] && this.arr[0][y] == this.arr[1][y] &&  this.arr[0][y] == this.arr[2][y] && this.arr[0][y] != this.emptySpot) {
                return this.arr[0][y];
            }
        }
        
        // diag
        if( this.arr[0] && this.arr[1] && this.arr[2] && this.arr[0][0] == this.arr[1][1] && this.arr[0][0] == this.arr[2][2] && this.arr[2][2] != this.emptySpot ) {   
            return this.arr[0][0];
        } else if( this.arr[2] && this.arr[1] && this.arr[0] && this.arr[2][0] == this.arr[1][1] && this.arr[2][0] == this.arr[0][2] && this.arr[0][2] != this.emptySpot ) {   
            return this.arr[2][0];
        }
        
        return "none";
    };
} // function Board(arrBoard)

var MinMax = {
    maxDepth : 10,
    maxPlayer : "O",

    getMoveScore : function(board, depth, alpha, beta, player) {   
        if( depth >= this.maxDepth || board.isTerminalMove() ) {
            return board.getCurrentScore();
        }
        
        var opponent = ( player == "O" ? "X" : "O" );
        var moves, iMove;
        moves = board.getAvailableMoves(opponent);
               
        if (opponent == this.maxPlayer ) { // AI move, O
            for( iMove in moves ) {
                alpha = Math.max(alpha, this.getMoveScore(moves[iMove], depth + 1, alpha, beta, opponent) );
                if (beta < alpha ) {
                    break;
                } 
            }
 
            return alpha;
        }
        else { // minPlayer, X
            for( iMove in moves ) {
                beta = Math.min(beta, this.getMoveScore(moves[iMove], depth + 1, alpha, beta, opponent));
                if (beta < alpha ) {
                    break;
                }
            }
 
            return beta;
        }
    }
}; // var MinMax

