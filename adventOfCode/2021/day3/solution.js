function getList() {

    const fs = require("fs");

    const file = fs.readFileSync('input.txt', 'utf8');
    let fileText = file.toString('utf8');
    
    fileText = fileText.split("\n");
    return fileText;
}

const reading = getList();

let gammaBin = '';
let epsilonBin = '';
let index = 0;

//run for loop for each "row" of byte numbers
for(i = 0; i < reading[0].length; i++) {
    let numGroup = [];
    
    // for each input, or "column", push the number at index 'j' to a list
    for (j = 0; j < reading.length; j++) {
        let num = reading[j][index];
        numGroup.push(num);
    }

    // filter a list of 1's and list of 0's
    const oneGroup = numGroup.filter(num => num === '1');
    const zeroGroup = numGroup.filter(num => num === '0');
    
    // add a 1 or 0 according to gamma and epsilon rules
    if(oneGroup.length > zeroGroup.length) {
        gammaBin += '1';
        epsilonBin += '0';
    } else {
        gammaBin += '0';
        epsilonBin += '1';
    }

    index += 1;
};

//then convert binary to base 10 and multiply them
const gammaRate = parseInt(gammaBin, 2);
const epsilonRate = parseInt(epsilonBin, 2);

const result = gammaRate * epsilonRate;

console.log(result);