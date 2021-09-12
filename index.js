const path = require('path')
const fs = require('fs');

let csvFile  =  __dirname + '/Assignment.csv';
console.log(csvFile)

const csv = require('csvtojson')

async function csvtoJosn(){
    const jsonArray = await csv().fromFile(csvFile);
    console.log("jsonArray" , jsonArray);    
    //add json data to json file
    fs.writeFile('assignment.json', JSON.stringify(jsonArray), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });


} 

csvtoJosn();

