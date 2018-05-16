var express = require('express');
var app = express();
var path = require('path');
var request = require('request');


var trbmbContent= null;

//schickt public verzeichniss an client
app.use(express.static(path.join(__dirname, 'public')));

//--------------------------------------------------------------------------------------------------------------------
//Get Text everey 5 seconds
var interval = setInterval(
		function(){ 
			requestSomething('http://api.chew.pro/trbmb') 
		}, 5000
);

//--------------------------------------------------------------------------------------------------------------------

//Routes werden hier definiert....können auch in separate JS ausgelagert werden---------------------------------------
app.get('/', function (req, res) {
  res.sendfile('./view/index.html');
});

app.get('/trbmb', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(trbmbContent);
});


//---------------------------------------------------------------------------------------------------------------------

//Server starten und Port definieren
app.listen(3000, function () {
  console.log('Solarmanager gestartet!');
});


//Einfache HTTP Request Methode----------------------------------------------------------------------------------------
function requestSomething(url){
	request(url, function (error, response, body) {
	  if(error!=null){console.log('error:', error);} 				// Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); 	// Print the response status code if a response was received
	  console.log('body:', body); 	  								
	  trbmbContent= body;
	})
}



