
const ActiveDirectory = require('activedirectory');
const http = require("http");
const fs = require("fs");
const url = require("url");
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Active Directory Config
var config = {  
  "url": "ldap://test.domain.com",
  "baseDN": "dc=test,dc=domain,dc=com"
  }

// Web Port
const port = 8001

// // Make HTTP server with Node

// http.createServer(function(req,res){

//   var pathname = url.parse(req.url).pathname;


//   if (req.method === "GET"){
      
//     console.log("Request for " + pathname + " received.");

//     fs.readFile(pathname.substr(1), function(err, data){

//         if (err) {
//           console.log(err);
//           res.writeHead(404, {'Content-Type': 'text/html'});
//         }else{
//           res.writeHead(200, {'Content-Type': 'text/html'});
//           res.write(data);	
//         }
//         res.end();
//     });
//   }
//   else if (req.method === "POST"){
//         var body = "";
//         req.on("data", function (chunk) {
//             body += chunk;
//             console.log(body)
//         });

//         // req.on("end", function(){
//         //     res.writeHead(200, { "Content-Type": "text/html" });
//         //     res.end(body);
//         // });
//   }
// }).listen(port);

//HTTP server with express

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use('/static', express.static('public'));
app.get('/',(req, res) => {

  res.sendFile(__dirname + 'static/index.html');

});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + 'static/login.html');
});

app.post('login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username + password);
});

app.listen(port, () => console.log(`This app is listening on port ${port}`));

console.log('Server running at http://127.0.0.1:8001/index.html');

// var username = 'test@test.domain.com';
// var password = 'Password1!';
    
// var ad = new ActiveDirectory(config);
    
// ad.authenticate(username, password, function (err, auth) {
//   if (err) {
//     console.log('ERROR: '+JSON.stringify(err));
//     return;
//   }
//   if (auth) {
//     console.log('Authenticated from Active directory!');
//   }
//   else{

//     console.log('Not Authenticated')

//   }
// });
