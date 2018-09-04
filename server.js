var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url).pathname;
  
  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */


    //stream functions
    function writeCallback(data){
        response.write(data);
    }

    function closeCallback(){
        response.end();
    } 

  
  //check GET request
  if (parsedUrl == '/listings') {

    response.writeHead(200, {'Content-Type': 'text/plain'});
    var read_stream = fs.createReadStream('newListings.json');
    read_stream.on('data', writeCallback);
    read_stream.on('close', closeCallback);


  } else {
    response.statusCode = 404;
    response.write('Bad gateway error');
    response.end();
  }

  



};



fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */

  //read JSON
  if (err) throw err;
  let myData = JSON.parse(data);

  //write JSON to file
  let listingData = JSON.stringify(myData, null, 2);
  fs.writeFile('newListings.json', data, (err) => {
    if (err) throw err;
  });

  //Start server
  http.createServer(requestHandler).listen(8080);

})

console.log('server listening on: http://localhost:8080');
