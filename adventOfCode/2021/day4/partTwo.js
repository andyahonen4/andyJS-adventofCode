function getList() {

    const fs = require("fs");

    const file = fs.readFileSync('input.txt', 'utf8');
    let fileTextWhitespace = file.toString('utf8');
    
    let fileText = fileTextWhitespace.split(/\r\n|\r|\n/);
    //return an array. array contains drawings for the first element, and 'n' number of board row elements
    return fileText;
}

// gets us our bingo draws isolated from the comma-seperated board text
let [draws, ...rest] = getList();

/*---PRE-GAME FORMATTING---*/
// bingo draws: from string to array
draws = draws.split(',');

// BOARDS
// remove the empty space elements that separated them
rest = rest.filter(element => element.length > 1);
let rows = [];
// trim outer whitespace, replace inner whitespace with commas via regex. then turn string into array
for(i = 0; i < rest.length; i++) {
    let trimmedString = rest[i].trim();
    let rowString = trimmedString.replace(/\s+/g,',');
    let row = rowString.split(',');
    rows.push(row);
}
class Cell {
    constructor(drawn, position, value) {
        this.drawn = drawn;
        this.position = position;
        this.value = value;  
    }

};

//for each row, convert value into a Cell object and give them a position
for (let i = 0; i < rows.length; i++) {

    for (let j = 0; j < 5; j++) {
        let cell = new Cell(false,j, rows[i][j]);
        rows[i][j] = cell;
    }
}

// tells us how many boards should be made; 5 rows to a board
let boardNum = rows.length / 5;

let boards = [];
let firstIndex = 0;
let winners = [];

// for each item in boards...push the first 5 indexed rows into a board. append the board, then move the index down 5 spaces
for(b = 0; b < boardNum; b++) {
    board = [];
    count = 0;

    while (board.length < 5) {
        board.push(rows[firstIndex + count]);
        count++;
    }
    boards.push(board);
    firstIndex += 5;
}

function newDraw() {
    console.log('draw #' + drawCount + ': ' + draws[drawCount]);
    for(b = 0; b < boards.length; b++){
        // for each board...
        for(r = 0; r < boards[b].length; r++) {
            //check each row
            for(c = 0; c < boards[b][r].length; c++) {
                //if Cell matches the draw, mark it as drawn
                if(boards[b][r][c].value == draws[drawCount]) {
                    //console.log('match!')
                    boards[b][r][c].drawn = true;
                }
            }  
        }
    }
    drawCount++;
    return draws[drawCount - 1];
}

function checkDiagonals(b, n) {
    let topLeftBotRight = [
        boards[b][0][0], boards[b][1][1], boards[b][2][2], boards[b][3][3], boards[b][4][4]
    ];

    let topRightBotLeft =
    [
        boards[b][0][4], boards[b][1][3], boards[b][2][2], boards[b][3][1], boards[b][4][0]
    ];

    let diagonals = [topLeftBotRight, topRightBotLeft];
    
    diagonals.forEach(diag => {

        if(diag.every(cell => cell.drawn === true)) {
            winners.push(b);
            console.log('diagonal winner! board #' + b);
            console.log(boards[b]);
            boardResult(boards[b], n);           
        }

    });
}

function checkHorizVert(b, n) {
    
    boards[b].forEach(row => { 
        if(row.every(cell => cell.drawn === true)) {
            winners.push(b);
            console.log('horizontal winner declared: board #' + b + ', row: ' + row);
            console.log(boards[b]);
            boardResult(boards[b], num);
        }
    });

    for (c = 0; c < boards[b].length; c++) {
        if(boards[b].every(row => row[c].drawn === true)) {
            winners.push(b);
            console.log('vertical winner! board #' + b + ', column #' + c);
            console.log(boards[b]);
            boardResult(boards[b], n);
        }
    }

}

function checkWinner(num) {
    
    for (b = 0; b < boards.length; b++){
        checkDiagonals(b, num);
        checkHorizVert(b,num);       
    };

    if(winners.length === 0) {
        console.log('no winner from boards.');
    } else{
        console.log('winning board(s): ' + winners);
    }

}
/*---ADVENT SPECIFICS---*/
// this gives the pedantic calculation needed for the advent challenge
function boardResult(b, d){
    let unmarkedSum = 0;
    b.forEach(r => {
        r.forEach(c => {
            // if the cell has false in it...
            if(c.drawn === false) {
                // add it to a sum
                let parsedSum = parseInt(c.value);
                unmarkedSum += parsedSum;
            }
        });        
    });
    console.log('winning number: ' + d);
    console.log('unmarked spaces bonus: ' + unmarkedSum);
    const adventAnswer = unmarkedSum * d;
    console.log('Day 4 Advent of Code answer: ' + adventAnswer);
    return unmarkedSum * d;
}

/*---START BINGO---*/
let drawCount = 0;
while(winners.length === 0){
    
    let numberDrawn = newDraw();
    winner = checkWinner(numberDrawn);
}


