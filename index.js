const express = require('express'); 
const app = express();
var Request = require("request");

const port = 5000;

// app.get('/', function (req, res) {
//    // res.send('GET request to homepage')
//     Request.get("https://opentdb.com/api.php?amount=10&category=12", (error, response, body) => {
//         if(error) {
//             return console.dir(error);
//         }
//         let k = JSON.parse(body);
//         //console.dir(k['Madhya Pradesh']['Bhind']);
//         res.send(k)
//     });
//     //res.sendFile('index.html', {root: __dirname});
// });

app.get('/', function (req, res) {
    // res.send('GET request to homepage')
     Request.get("http://www.omdbapi.com/?apikey=3ac35760&t=Dilwa", (error, response, body) => {
         if(error) {
             return console.dir(error);
         }
         let k = JSON.parse(body);
         //console.dir(k['Madhya Pradesh']['Bhind']);
         res.send(k)
     });
     //res.sendFile('index.html', {root: __dirname});
 });



app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});