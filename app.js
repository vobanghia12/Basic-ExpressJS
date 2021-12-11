const fs = require('fs') // fs is also object 
//Express structure
//  First step to dive deeper into NodeJS
const path = require('path');
const express = require("express");

const app = express();
//app also help us to handle incoming request like post and get, but difference is thtat it's not caring what kind of request is coming
app.use(express.urlencoded({extended: false})); // extended: false just avoid warnning
// express.urlencode will help us extract the incoming request data

//handle get request
app.get("/currenttime", function (req, res) {
  res.send("<h1> " + new Date().toISOString() + " </h1>");
}); // allow us to define a request handler
//handle request / that will be sent to localhost:3000/currentttime

app.get("/", function (req,res) {
  res.send("<form action='/store-user' method='POST'><label>Your Name</label><input type='text' name ='username'><button>Submit</button></form>");
});
//using method POST to sending data to the server

//handling the post request
app.post('/store-user', function(req, res){
    const userName = req.body.username;
    //request object has body object on it to get username value
    const filePath = path.join(__dirname, 'data','users.json'); // descride the path and it need to be absolute path, we need to use the path of our repository
    const fileData = fs.readFileSync(filePath); // read file 
    const existingUsers = JSON.parse(fileData); // translate to javascript array
    // because we use JSON so we use JSON to translate it to JS
    existingUsers.push(userName);
    fs.writeFileSync(filePath, JSON.stringify(existingUsers)); // this is the method to convert to text
    //send back to browser
    res.send('<h1>All Username stored!</h1>') // the second argument should be raw text
})
app.get('/returndata',function(req,res){
    const filePath = path.join(__dirname, 'data', 'users.json');
    const fileData = fs.readFileSync(filePath);
    const existingUsers = JSON.parse(fileData);
    let responseData = "<ul>";
    for(user of existingUsers)
    {
        responseData += "<li>" + user + '</li>';
    }
    res.send(responseData + '</ul>')
})

app.listen(3000);





// //NodeJS structure
// const http = require("http"); // creatte http object

// function handleRequest(request, response) {
//    if (request.url === "/currentime") {
//      //if after the domain / === currentime execute this code
//      response.statusCode = 200;
//      response.end("<h1> " + new Date().toISOString() + " </h1>");
//    } else if ((request.url = "/")) {
//      response.statusCode = 200;
//      response.end("<h1>Hello World</h1>");
//    }

//    //localhost: 3000/currenttime
// //   //localhostt: 3000
// //   //end response and send the data
//  } // whenever request reaching server, nodeJS will exdcute this function for us

//  const server = http.createServer(handleRequest); // create server by using createServer function

// server.listen(3000); //set port: 3000
