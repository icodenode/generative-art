const fs = require('fs');
const ndjson = require('ndjson');
const path = require('path');
var cors = require('cors');

let bees = [];
fs.createReadStream(path.join(__dirname,'bee.ndjson'))
  .pipe(ndjson.parse())
  .on('data', function(obj) {
    bees.push(obj);
  });

const express = require('express');
const { count } = require('console');
const app = express();
app.use(cors());
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.get('/bee', (request, response) => {
  let numberOfBees = request.query.number;
  console.log(numberOfBees);
  let beeDrawings = [];
  let count = 0 ;
  while(count < numberOfBees){
    const index = Math.floor(Math.random() * bees.length);
    console.log(bees[index]);
    if(bees[index].recognized) {

      beeDrawings.push(bees[index]); 
      count++;
    }
  }
  response.send(beeDrawings);
});

app.use(express.static('public'));
