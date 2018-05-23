//Import node modules
var express = require('express');
var app = express();
var path = require('path');
var request = require('request'); //mayby not used here
var fs = require('fs');

//Import own modules
var inverter = require("./app/inverter");
var rules = require("./app/rules");
var routes = require("./app/routes")(app, inverter);

//global variables
var configJson;
var inverterConfig;
var devicesConfig;

//-------TESTING-------------------------------------------------------------------------
readConfig();
initDevices();

//Interval
setInterval(
	function(){ 
			inverter.requestPower(); 
	}, inverter.getIntervTime()
);

//rules
if(rules.checkLowerRate()){
	console.log("Niedertarif");
}else{
	console.log("Hochtarif");
};

//----------------------------------------------------------------------------------------


//send public folder to client
app.use(express.static(path.join(__dirname, 'public')));


//reads the configuration File
function readConfig(){
	configJson = JSON.parse(fs.readFileSync('./configs/config.json', 'utf8'));	//read config.json and store it to var configJson
	inverterConfig= configJson.inverter;										//read Inverter	
	devicesConfig= configJson.devices;											//read devices
	
	
};

//Initialize inverter and all devices
function initDevices(){
	inverter.setIp(inverterConfig.ip);
	inverter.setApi(inverterConfig.api);
	inverter.setIntervTime(inverterConfig.interval);
	inverter.setJsonPath(inverterConfig.jsonPath);
	
	for(var item in devicesConfig) {
		  console.log(item+": "+devicesConfig[item].name);	//um name zu erhalten: devicesConfig[item].name
		}
}

//starts server on port 3000
app.listen(3000, function () {
  console.log('----------------------------------');
  console.log('|  Solarmanager server started!  |');
  console.log('----------------------------------');
  console.log('');
});


