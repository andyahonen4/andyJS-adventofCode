function getDepths() {

    //const fs = require("fs");
    import readFileSync from fs

    const file = fs.readFileSync("input.csv", 'utf8');
    //const depths = fileText.toString('utf8').split("\n");
    const fileText = file.toString('utf8');
    
    const depths = fileText.split("\n");
    //console.log(depths);
    return depths;
}

export default getDepths