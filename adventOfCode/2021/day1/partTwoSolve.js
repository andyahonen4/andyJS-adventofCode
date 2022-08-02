const { group } = require("console");
const { type } = require("os");
const internal = require("stream");

function getList() {

    const fs = require("fs");

    const file = fs.readFileSync("input.csv", 'utf8');
    let fileText = file.toString('utf8');
    
    fileText = fileText.split("\n");

    return fileText;
}

const depthsText = getList();
const depths = [];

depthsText.forEach((element) => {
    let parsed = parseInt(element);
    depths.push(parsed);
});

let increases = 0;
let increase_list = [];

for(let i = 0; i < (depths.length - 3); i++) {
   
    let groupOneSum = depths[i] + depths[i+1] + depths[i+2];
    let groupTwoSum = depths[i+1] + depths[i+2] + depths[i+3];

    if(groupOneSum < groupTwoSum) {
            increases++;
    }
}

console.log(increases);