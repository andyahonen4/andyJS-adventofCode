function getList() {

    const fs = require("fs");

    const file = fs.readFileSync('testInput.txt', 'utf8');
    let fileText = file.toString('utf8');
    
   //fileText = fileText.split("\n");
    return fileText;
}

const reading = getList();

let [draws, ...rest] = reading.split(/\r\n|\r|\n/);

rest = rest.filter(element => element.length > 1);

let restText = '';
rest.forEach(element => {
    let elementSpaced = element + ' ';
    restText += elementSpaced;
});

let boardTextSpaced = restText.split(' ');
boardText = boardTextSpaced.filter(element => element !== '');

console.log(boardText);


//add each number to its row and then to its own board
let boards = [];
let row = [];
let cellCount = 0;
let rowCount = 0;

for (let i = 0; i < (boardText.length); i++) {
    row.push(boardText[i]);
    if(cellCount == 4) {
        rowCount++
        cellCount = 0;
        console.log(row)
    } else {
        cellCount++
    }
}


//split numbers into integers

// then put back into arrays so we still have rows & columns