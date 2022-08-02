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
})

let increases = 0;
let increase_list = [];

for(let i = 1; i < (depths.length); i++) {
    
    if(depths[i - 1] < depths[i]) {
            increase_list.push(depths[i]);
            increases++;
        }
}

console.log(increases);