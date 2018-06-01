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
var device = require("./app/device.js");

//global variables
var configJson;
var inverterConfig;
var devicesConfig;
var solarmanagerConfig;
var devices = [];


//initializing
readConfig();
initDevices();

//Interval to requestPower from Inverter
setInterval(function(){ inverter.requestPower(); }, inverter.getIntervTime());

//send to EmonCMS
setInterval(function(){ sendEmonCMS(); test();}, 5000); //Achtung hier nocht testfunktion löschen

//-----------------------------------------------------------------------------------------------------
function test(){
	
	devices[0].turnOnOff(false);
	devices[1].turnOnOff(true);
}
//-----------------------------------------------------------------------------------------------------


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
		  console.log(item+": "+devicesConfig[item].name);
		  //initialize one device
		  //var obj = new device;
		  device.setName(devicesConfig[item].name);
		  device.setBrand(devicesConfig[item].brand);
		  device.setType(devicesConfig[item].type);
		  device.setIp(devicesConfig[item].ip);
		  device.setApiOnOff(devicesConfig[item].apiOnOff);
		  device.setApiGetInfo(devicesConfig[item].apiGetInfo);
		  device.setJsonPathOnOff(devicesConfig[item].jsonPathOnOff);
		  device.setJsonPathGetInfo(devicesConfig[item].jsonPathGetInfo);

		  //Put device into devices array
		  devices.push(device);
		  
		  
		  
		  
	}
	console.log(devices);
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
app.listen(80, function () {
  console.log('----------------------------------');
  console.log('|  Solarmanager server started!  |');
  console.log('----------------------------------');
  console.log('');
});


