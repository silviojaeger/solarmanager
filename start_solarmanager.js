//Import node modules
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var fs = require('fs');

//Import own modules
var inverter = require("./app/inverter");
var rules = require("./app/rules");
var routes = require("./app/routes")(app, inverter);

//global variables
var configJson;
var inverterConfig;
var devicesConfig;
var solarmanagerConfig;


//initializing
readConfig();
initDevices();

//Interval to requestPower from Inverter
setInterval(function(){ inverter.requestPower(); }, inverter.getIntervTime());

//send to EmonCMS
setInterval(function(){ sendEmonCMS(); }, 5000);

//rules
if(rules.checkLowerRate()){
	console.log("Niedertarif");
}else{
	console.log("Hochtarif");
};


//send public folder to client
app.use(express.static(path.join(__dirname, 'public')));


//reads the configuration File
function readConfig(){
	configJson = JSON.parse(fs.readFileSync('./configs/config.json', 'utf8'));	//read config.json and store it to var configJson
	inverterConfig= configJson.inverter;										//read Inverter	
	devicesConfig= configJson.devices;											//read devices
	solarmanagerConfig = configJson.solarmanager;
	
	
};

//Initialize inverter and all devices
function initDevices(){
	inverter.setIp(inverterConfig.ip);
	inverter.setApi(inverterConfig.api);
	inverter.setIntervTime(inverterConfig.interval);
	inverter.setJsonPath(inverterConfig.jsonPath);
	
	for(var item in devicesConfig) {
		  console.log(item+": "+devicesConfig[item].name);	//um name zu erhalten: devicesConfig[item].name
		  // not implemented yet
		}
}

//EmonCMS HTTP Post request
function sendEmonCMS(){
	var url = solarmanagerConfig.emonUrl;
	var key = solarmanagerConfig.emonApiKey;
	var data = {			
			"generated": inverter.getPower(),
			"consumed": 100,
			"combined": (inverter.getPower()-100)
	}
	request.post(url+'/input/post?node=emontx&fulljson='+JSON.stringify(data)+'&apikey='+key, function (error, response, body){
		if(error!=null){console.log('error:', error);}
		else{console.log('EmonCMS POST success');}
	});
}

//starts server on port 3000
app.listen(3000, function () {
  console.log('----------------------------------');
  console.log('|  Solarmanager server started!  |');
  console.log('----------------------------------');
  console.log('');
});


