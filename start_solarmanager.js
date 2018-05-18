//Import node modules
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var fs = require('fs');

//Import own modules
var inverter = require("./app/inverter");
var routes = require("./app/routes")(app, inverter);

//global variables
var configJson;
var inverterConfig;

//-------TESTING-------------------------------------------------------------------------
readConfig();

inverter.setIp(inverterConfig.ip);
inverter.setApi(inverterConfig.api);
inverter.setIntervTime(inverterConfig.interval);

//----------------------------------------------------------------------------------------


//send public folder to client
app.use(express.static(path.join(__dirname, 'public')));


//reads the configuration File and initialize all devices
function readConfig(){
	configJson = JSON.parse(fs.readFileSync('./configs/config.json', 'utf8'));	//read config.json and store it to var configJson
	inverterConfig= configJson.inverter;										//read Inverter	
}

//Server starten und Port definieren
app.listen(3000, function () {
  console.log('Solarmanager server started!');
});


