//imports
var request = require('request');

//global variables
var Settings=
{
	"name":"",
	"brand":"",
	"type":"",
	"ip":"",
	"apiOnOff":"",
	"apiGetInfo":"",
	"jsonPathOnOff": "",
	"jsonPathGetInfo":	""
}

//Basic configurations "setters"
function setName(name){
	Settings.name = name;
	console.log('set name to: '+Settings.name);
}

function setBrand(brand){
	Settings.brand = brand;
	console.log('set brand to: '+Settings.brand);
}

function setType(type){
	Settings.type = type;
	console.log('set type to: '+Settings.type);
}

function setIp(ip){
	Settings.ip = ip;
	console.log('set IP to: '+Settings.ip);
}

function setApiOnOff(apiOnOff){
	Settings.apiOnOff = apiOnOff;
	console.log('set apiOnOff to: '+Settings.apiOnOff);
}

function setApiGetInfo(apiGetInfo){
	Settings.apiGetInfo = apiGetInfo;
	console.log('set apiGetInfo to: '+Settings.apiGetInfo);
}

function setJsonPathOnOff(jsonPathOnOff){
	Settings.jsonPathOnOff = jsonPathOnOff;
	console.log('set jsonPathOnOff to: '+Settings.jsonPathOnOff);
}

function setJsonPathGetInfo(jsonPathGetInfo){
	Settings.jsonPathGetInfo = jsonPathGetInfo;
	console.log('set jsonPathGetInfo to: '+Settings.jsonPathGetInfo);
}
//Basic configurations "getters"
function getName(){
	return Settings.name;
}

function getBrand(){
	return Settings.brand;
}

function getType(){
	return Settings.type;
}

function getIp(){
	return Settings.ip;
}

function getApiOnOff(){
	return Settings.apiOnOff;
}

function getApiGetInfo(){
	return Settings.apiGetInfo;
}

function getJsonPathOnOff(){
	return Settings.jsonPathOnOff;
}

function getJsonPathGetInfo(){
	return Settings.jsonPathGetInfo;
}

//functional functions
function turnOnOff(on){ 		//true==on, false==off
	var SettingsRequest=Settings;
	var reqUrl = SettingsRequest.ip+SettingsRequest.apiOnOff;
	
	request(reqUrl, function (error, response, body) {
	  if(error!=null){console.log('error:', error);} 				// Print the error if one occurred
	  else{
		  if(on){console.log("Device turned on");}else{console.log("Device turned off")}
	  }
	});	
}



//export everything to the mainJS
module.exports = {setName, setBrand, setType, setIp, setApiOnOff, setApiGetInfo, setJsonPathOnOff, setJsonPathGetInfo, getName, getBrand, getType, getIp, getApiOnOff, getApiGetInfo, getJsonPathOnOff, getJsonPathGetInfo, turnOnOff}; 