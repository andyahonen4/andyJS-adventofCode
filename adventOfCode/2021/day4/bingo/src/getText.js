import rawTextFile from './input.txt'

//let fileContents;
let rawText;

async function loadData(t) {
  await fetch('./input.txt')
  .then(function(response) {return response})
  .then(function(data) {
  console.log(data);
  t = data.text();
  console.log(t);
  return 'promise resolved??'});
}


  
loadData(rawText);

export default rawText;