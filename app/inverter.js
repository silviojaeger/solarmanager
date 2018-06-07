//imports
var request = require('request');

//global variables
var Settings=
{
	"ip":"",
	"api":"",
	"actualPower":"",
	"intervTime":"",
	"jsonPath":""
}

//Basic configurations
function setApi(api){
	Settings.api = api;
	console.log('set API to: '+Settings.api);
}

function setIp(ip){
	Settings.ip = ip;
	console.log('set IP to: '+Settings.ip);
}

function setIntervTime(time){
	Settings.intervTime = time;
	console.log('set interval Time to: '+Settings.intervTime+'ms');
}

function setJsonPath(path){
	Settings.jsonPath = path;
	console.log('set JSON-Path to: '+Settings.jsonPath);
}

function getIntervTime(){
	return Settings.intervTime;
}

function getApi(){
	return Settings.api;
}

function getIp(){
	return Settings.ip;
}

function getPower(){
	return Settings.actualPower;
}

function getJsonPath(){
	return Settings.jsonPath;
}

//HTTP requests
function requestPower(){

	var SettingsRequest=Settings;
	var reqUrl = SettingsRequest.ip+SettingsRequest.api;
	console.log('----Inverter--HTTP--Request--------------------');
	console.log('Start request to: '+reqUrl);
	console.log('JSON Path: '+SettingsRequest.jsonPath)
	
	request.get(reqUrl, function (error, response, body) {
	  if(error!=null){console.log('error:', error);} 				// Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); 	// Print the response status code if a response was received	  								
	  console.log('Response: '+body);
	  console.log('-----------------------------------------------');

	  var json=JSON.parse(body);
	  SettingsRequest.actualPower = eval("json"+SettingsRequest.jsonPath) //eval() makes code out of String
	  console.log('Power set to: ' + SettingsRequest.actualPower);
	});	
}

//export everything to start_solarmanager.js
module.exports = {setApi, getApi, setIp, getIp, getPower, requestPower, setIntervTime, getIntervTime, setJsonPath, getJsonPath}; 