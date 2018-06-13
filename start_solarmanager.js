//Import node modules
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var fs = require('fs');

//Import own modules
var inverter = require("./app/inverter");
var powerMeter = require("./app/powerMeter");
var rules = require("./app/rules");
var routes = require("./app/routes")(app, inverter);
var device = require("./app/device.js");

//global variables
var configJson;
var inverterConfig;
var powerMeterConfig;
var devicesConfig;
var solarmanagerConfig;
var devices = [];


//initializing
readConfig();
initDevices();

//Interval to requestPower from Inverter
setInterval(function(){ inverter.requestPower(); }, inverter.getIntervTime());

//Interval to requestPower from powerMeter
setInterval(function(){ powerMeter.requestUsedPower(); }, powerMeter.getIntervTime());

//send to EmonCMS
setInterval(function(){ sendEmonCMS();}, 5000); 

//----EXAMPLE------------------------------------------------------------------------------------------
setInterval(function(){ test();}, 15000); 
function test(){
	
	//Get Info from the first device
	devices[0].getInfo();
	
	//turn on device if there is energy surplus, else turn it off
	if(rules.checkEnergySurplus()>0){
		devices[0].turnOnOff(true);
	}else{
		devices[0].turnOnOff(false);
	}
	
	//Check lower rate
	if(rules.checkLowerRate()){
		console.log("Niedertarif");
	}else{
		console.log("Hochtarif");
	};
}
//-----------------------------------------------------------------------------------------------------

//send public folder to client
app.use(express.static(path.join(__dirname, 'public')));


//reads the configuration File
function readConfig(){
	configJson = JSON.parse(fs.readFileSync('./configs/config.json', 'utf8'));	//read config.json and store it to var configJson
	inverterConfig= configJson.inverter;										//read Inverter	
	powerMeterConfig= configJson.powerMeter;									//read powerMeter
	devicesConfig= configJson.devices;											//read devices
	solarmanagerConfig = configJson.solarmanager;								//read basic Solarmanager configs
};

//Initialize inverter and all devices
function initDevices(){
	inverter.setIp(inverterConfig.ip);
	inverter.setApi(inverterConfig.api);
	inverter.setIntervTime(inverterConfig.interval);
	inverter.setJsonPath(inverterConfig.jsonPath);
	
	powerMeter.setIp(powerMeterConfig.ip);
	powerMeter.setApi(powerMeterConfig.api);
	powerMeter.setIntervTime(powerMeterConfig.interval);
	powerMeter.setJsonPath(powerMeterConfig.jsonPath);
	
	//Initialize all devices who are in the devicesConfig
	for(var item in devicesConfig) {
		  console.log(item+": "+devicesConfig[item].name);
		  //initialize one device
		  var obj = new device.Device();
		  obj.setName(devicesConfig[item].name);
		  obj.setBrand(devicesConfig[item].brand);
		  obj.setType(devicesConfig[item].type);
		  obj.setIp(devicesConfig[item].ip);
		  obj.setApiOnOff(devicesConfig[item].apiOnOff);
		  obj.setApiGetInfo(devicesConfig[item].apiGetInfo);
		  obj.setJsonPathGetInfo(devicesConfig[item].jsonPathGetInfo);

		  //Put device into devices array
		  devices.push(obj);	  
	}
}

//EmonCMS HTTP Post request
function sendEmonCMS(){
	var url = solarmanagerConfig.emonUrl;
	var key = solarmanagerConfig.emonApiKey;
	var generated = inverter.getPower();
	var consumed = powerMeter.getPower();
	var data = {			
			"generated": generated,
			"consumed": consumed,
			"combined": (generated-consumed)
	}
	request.post(url+'/input/post?node=emontx&fulljson='+JSON.stringify(data)+'&apikey='+key, function (error, response, body){
		if(error!=null){console.log('error:', error);}
		else{console.log('EmonCMS POST success');}
	});
}

//starts server on port 80
app.listen(80, function () {
  console.log('----------------------------------');
  console.log('|  Solarmanager server started!  |');
  console.log('----------------------------------');
  console.log('');
});


