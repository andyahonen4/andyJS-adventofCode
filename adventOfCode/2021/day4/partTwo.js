const { listenerCount } = require("process");

function getList() {

    const fs = require("fs");

    const file = fs.readFileSync('input.txt', 'utf8');
    let fileText = file.toString('utf8');
    
    return fileText;
}

const reading = getList();

//let [draws, ...rest] = reading.split('\n');
//separate the draws from the rest of the text, and split for each instance of returns and newlines
let [draws, ...rest] = reading.split(/\r\n|\r|\n/);

draws = draws.split(',');

//split each board row into it's own string of nums
rest = rest.filter(element => element.length > 1);
let rows = [];
class Cell {
    constructor(drawn, position, value) {
        this.drawn = drawn;
        this.position = position;
        this.value = value;  
    }

};

//replace all whitespace with commas, then turn string into array, remove any elements that are empty and turn the elements into integers
for(i = 0; i < rest.length; i++) {
    
    let rowString = rest[i].replace(/\s+/g,',');
    let rowSpaced = rowString.split(',');
    let row = rowSpaced.filter(element => element !== '');
    rows.push(row);
}

//LESSON LEARNED

//for each row, convert value into a Cell object and give them a position
//then push each row into a board (five a piece)
// then add the board to boards

for (let i = 0; i < rows.length; i++) {

    for (let j = 0; j < 5; j++) {
        let cell = new Cell(false,j, rows[i][j]);
        rows[i][j] = cell;
    }
}

let boards = [];
let boardNum = rows.length / 5;
let firstIndex = 0;
let winners = [];
let winner;

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

//STOPPED HERE; GOT IT COOKIN'!


function newDraw() {
    console.log('draw #' + drawCount + ': ' + draws[drawCount]);
    for(b = 0; b < boards.length; b++){
        //boards
        for(r = 0; r < boards[b].length; r++) {
            //console.log(boards[b].length);
            //rows
            for(c = 0; c < boards[b][r].length; c++) {
                //console.log(boards[b][r].length);
                //console.log('cell value: ' + boards[b][r][c].value);
                //cells
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

function checkWinner(num) {
    for (b = 0; b < boards.length; b++){

        let diagonalOne = [
            boards[b][0][0], boards[b][1][1], boards[b][2][2], boards[b][3][3], boards[b][4][4]
        ];

        let diagonalTwo =
        [
            boards[b][0][4], boards[b][1][3], boards[b][2][2], boards[b][3][1], boards[b][4][0]
        ];

        let diagonals = [diagonalOne, diagonalTwo];
        
        diagonals.forEach(diag => {
            if(diag.every(cell => cell.drawn === true)) {
                winners.push(b);
                console.log('diagonal winner! board #' + b);
                console.log(boards[b]);
                boardResult(boards[b], num);           
            }
        });

        boards[b].forEach(row => {
            //console.log('hey' + row);
            if(row.every(cell => cell.drawn === true)) {
                // I PAUSED HERE 07.26.2022
                winners.push(b);
                console.log('horizontal winner declared: board #' + b + ', row: ' + row);
                console.log(boards[b]);
                boardResult(boards[b], num);

            }        
        });
        for (c = 0; c < boards[b].length; c++) {
            if(boards[b].every(blahrow => blahrow[c].drawn === true)) {
                winners.push(b);
                console.log('vertical winner! board #' + b + ', column #' + c);
                console.log("checked row's column " + c);
                console.log(boards[b]);
                boardResult(boards[b], num);
            }
            // else {
            //     console.log('no vertical winner.');
            //     columnCount++
            //     console.log("checked row's column " + c);
            // }
            
            // console.log('hey heres the board length: ');
        }
    
        
        

            
    };

    if(winners.length === 0) {
        console.log('no winner from boards.');
    } else{
        console.log("winner! ");
        console.log(winners);
    }

    //console.log(winners);
}

function boardResult(b, d){
    let unspacedSum = 0;
    b.forEach(r => {
        //console.log(r);
        r.forEach(c => {
            // if the cell has false in it...
            if(c.drawn === false) {
                // add it to a sum
                let parsedSum = parseInt(c.value);
                unspacedSum += parsedSum;
            }
        });        
    });

    console.log(unspacedSum);
    console.log(d);
    console.log(unspacedSum * d);
    return unspacedSum * d;
}


drawCount = 0;
while(winners.length === 0){
    //draws.forEach(draw => {
    //     newDraw();
    //     checkWinner();
    // });
    let numberDrawn = newDraw();
    winner = checkWinner(numberDrawn);
    //console.log(winner.board);
}

//console.log(winner.board);






// //winningCombos = 
// across = (0,1,2,3,4)
// down = (0,0,0,0,0)
// diagonal(0,1,2,3,4)


