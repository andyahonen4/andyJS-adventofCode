//import getDepths from './fileRead.js';

function getList() {

    const fs = require("fs");

    const file = fs.readFileSync("input.csv", 'utf8');
    //const depths = fileText.toString('utf8').split("\n");
    let fileText = file.toString('utf8');
    
    fileText = fileText.split("\n");
    //console.log(depths);
    return fileText;
}

const depths = getList();
console.log(depths.length);
//const depths = [178, 179, 187, 196, 199, 200, 201, 210, 209];

let increases = 0;
let firstDepth, nextDepth;
let increase_list = [];

for(let i = 0; i <= depths.length; i++) {
    
    if(i == 0) {
        firstDepth = depths[i];
        //console.log('first if ran on: ' + depths[i]);
    } else {
        //console.log('else ran on: ' + depths[i]);
        nextDepth = depths[i];
        if(nextDepth > firstDepth) {
            //console.log('else if ran: ' + depths[i]);
            increase_list.push(nextDepth);
            increases++;
            firstDepth = nextDepth;
        }
        firstDepth = nextDepth;
    }
}

console.log(increases);
console.log(increase_list.slice(1658,1687));