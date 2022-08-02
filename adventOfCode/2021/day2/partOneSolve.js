function getList() {

    const fs = require("fs");

    const file = fs.readFileSync("input.txt", 'utf8');
    let fileText = file.toString('utf8');
    
    fileText = fileText.split("\n");
    return fileText;
}

const moveText = getList();
const moves = [];

moveText.forEach((element) => {
    
    let splitElement = element.split(' ');
    let instruction = {
        direction: splitElement[0],
        units: parseInt(splitElement[1]),
    };
    //let parsed = parseInt(element);
    moves.push(instruction);
   // console.log(instruction)
});


let depth = 0;
let horizontal = 0;

function moveSub(d, u) {
    if (d == 'forward') {
        horizontal += u;
    }
    if (d == 'down') {
        depth += u;
    }
    if (d == 'up') {
        depth -= u;
    }
}

const map1 = moves.map((key, value) => moveSub(key, value));
let count = 0;
for (i = 0; i < moves.length; i++) {
    let d = moves[i].direction;
    let u = moves[i].units;
    moveSub(d,u);
    count += 1    
}

const travel = depth * horizontal;

console.log(count);
console.log(depth);
console.log(horizontal);
console.log(travel);
