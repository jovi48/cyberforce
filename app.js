
var ActiveDirectory = require('activedirectory');
var http = require("http")
var fs = require("fs")
var url = require("url")


var config = {  
  "url": "ldap://test.domain.com",
  "baseDN": "dc=test,dc=domain,dc=com"
  }


// Make HTTP server

http.createServer(function(req,res){

  var pathname = url.parse(req.url).pathname;

  console.log("Request for " + pathname + " received.");

  fs.readFile(pathname.substr(1), function(err, data){

      if (err) {
         console.log(err);
         res.writeHead(404, {'Content-Type': 'text/html'});
      }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data.toString());	
      }
      res.end();

  });
}).listen(8001);

console.log('Server running at http://127.0.0.1:8001/index.html');

var username = 'test@test.domain.com';
var password = 'Password1!';
    
var ad = new ActiveDirectory(config);
    
ad.authenticate(username, password, function (err, auth) {
  if (err) {
    console.log('ERROR: '+JSON.stringify(err));
    return;
  }
  if (auth) {
    console.log('Authenticated from Active directory!');
  }
  else{

    console.log('Not Authenticated')

  }
});
