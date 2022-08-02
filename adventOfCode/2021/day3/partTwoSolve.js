function getList() {

    const fs = require("fs");

    const file = fs.readFileSync('input.txt', 'utf8');
    let fileText = file.toString('utf8');
    
    fileText = fileText.split("\n");
    return fileText;
}

const reading = getList();
// give a list of binary nums and 'oxygen' or 'carbon' as a measurement
function whittle(nums, measurement) {
       
    // oxygen should use 1 as tiebreaker, but carbon measure uses 0
    let tiebreaker = measurement == 'oxygen' ? '1' : '0'
    let nonTie = tiebreaker === '1' ? '0' : '1';

    let whittledGroup = nums;
    // for each item remaining
    for(let i = 0; whittledGroup.length > 1; i++) {
        
        // filter those with 1's in index position. do same with 0's
        const tieGroup = whittledGroup.filter(element => element[i] === tiebreaker);
        const nonTieGroup = whittledGroup.filter(element => element[i] === nonTie);

        //oxygen: if ones list is greater or equal to zero's, then axe the zero inputs. otherwise we go with the zero inputs
        //carbon: if zero's less than or equal to 1's axe the one inputs. otherwise go with one inputs

        if(measurement == 'oxygen') {
            whittledGroup = (tieGroup.length >= nonTieGroup.length ? tieGroup : nonTieGroup);
            //console.log(i +' is the index. ' + 'whittledGroup contains ' + whittledGroup);
        } else{
            whittledGroup = (tieGroup.length <= nonTieGroup.length ? tieGroup : nonTieGroup);
            //console.log(i +' is the index. ' + 'whittledGroup contains ' + whittledGroup);
        }
        
    }
    // one input will remain
    return whittledGroup[0];
}

const oxygenBin = whittle(reading, 'oxygen');
const carbonmonoBin = whittle(reading, 'carbon');

const oxygenRate = parseInt(oxygenBin,2);
const carbonmonoRate = parseInt(carbonmonoBin,2);

const result = oxygenRate * carbonmonoRate;
console.log(result);