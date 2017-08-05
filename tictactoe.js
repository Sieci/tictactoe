
//Initialize array
var arrBoard;
arrBoard = [0,1,2,3,4,5,6,7,8];


var person = " ";
var ai = " ";
var count =0;

function choose(hum, comp){
    person = hum;
    ai = comp;

    document.getElementById("start").style.display ="none";
    document.getElementById("board").style.display ="inline";
}



//place X / O at right row and column, taking row and column from the board. Adds "X"  or "O" in arrBoard. Disable box
function place(pos){

    if(arrBoard[pos] != pos){
        return "TAKEN";
    }
        

    else if(arrBoard[pos] != person || arrBoard[pos] != ai ){
        //console.log(pos);
    arrBoard[pos] = person;
    document.getElementById("box"+pos).innerHTML =  person ;
    count = count + 1;

    
    }
    

    if (count === 9){
        alert("tie");
        reset();

    }

    else if(threeInRow(arrBoard, person) === true){
        console.log(person + " wins!");
        alert(person + " wins!");
        reset();
    }

    else{
        setTimeout(function(){

        
        console.log("index: "+minimax(arrBoard, ai).index + "score: " + minimax(arrBoard, ai).score);
        pos = minimax(arrBoard, ai).index;
        console.log(pos);
        arrBoard[pos] = ai;
        document.getElementById("box"+pos).innerHTML = ai;
        if(threeInRow(arrBoard, ai) === true){
        console.log(ai + " wins!");
        alert(ai + " wins!");
        reset();
        }
    },100);
    count = count +1;
        }
        

    }
    
    




//resets the game, clears the arrays and the board.
function reset(){
    console.log("reset");
    console.log(arrBoard.length);
    count = 0;

    for(var i =0;i<arrBoard.length;i++){
            console.log("LOOP")
            arrBoard[i] = i;
            document.getElementById("box"+i).innerHTML = ".";
        
    }
    

}


//Checks to see if there is three X or O in a row, return true if the case
function threeInRow(board, player){

    //IF ROWS EQUAL
    if(arrBoard[0] === player && arrBoard[1]  === player&&  arrBoard[2] === player ||
         arrBoard[3] === player && arrBoard[4] === player &&  arrBoard[5] === player ||
          arrBoard[6] === player && arrBoard[7] ===player  &&  arrBoard[8] === player){
        return true;
    }

    //IF DIAGONAL EQUAL
    else if (arrBoard[0] === player && arrBoard[4] === player && arrBoard[8] === player ||
         arrBoard[2] === player && arrBoard[4] === player && arrBoard[6] === player){
        return true;
    }

    // IF COLUMNS EQUAL
    else if(arrBoard[0] === player && arrBoard[3] ===player && arrBoard[6] === player ||
         arrBoard[1] ===player && arrBoard[4] ===player && arrBoard[7] === player || 
         arrBoard[2] ===player && arrBoard[5] ===player && arrBoard[8] === player ){
        return true;
    }
    else {
        return false;
    }
}



//filter for the spots on arrBoard that are not taken by "O" or "X"
function emptySpots(board){
    return board.filter(s => s != "O" && s != "X");
}

function minimax(newBoard, player){

    var freeSpots = emptySpots(newBoard);

    if(threeInRow(newBoard, person)){
        return {score:-10};
    }
    else if(threeInRow(newBoard, ai)){
        return{score:10};
    }
    else if (freeSpots.length === 0){
        return {score:0};
    }

    //array of moves
    var moves =[];

    //looping through possible moves
    for (var i = 0; i < freeSpots.length; i++){
        //creating an object, adding index
        var move = {};
        move.index = newBoard[freeSpots[i]];

        newBoard[freeSpots[i]] = player;

        if ( player == ai){
            var result = minimax(newBoard, person);
            move.score = result.score;
        }
        else{
            var result = minimax(newBoard, ai);
            move.score = result.score;
        }
        newBoard[freeSpots[i]] = move.index;

        moves.push(move);
    }

    // if ai, loop moves and choose best one
    var bestMove;
    if (player === ai){
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++){
            if (moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
        
    }
    else {
        var bestScore = 10000;
        for (var i=0; i<moves.length;i++){
            if (moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
    
    



}