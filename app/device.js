//imports
var request = require('request');

//global variables
var Settings=
{
	"ip":"",
	"api":"",
	"actualPover":"",
	"intervTime":"",
	"jsonPathOnOff":""
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

function getPover(){
	return Settings.actualPover;
}

function getPover(){
	return Settings.actualPover;
}

function getJsonPath(){
	return Settings.jsonPath;
}

//HTTP requests


//export everything to the mainJS
module.exports = {setApi, getApi, setIp, getIp, getPover, requestPover, setIntervTime, getIntervTime, setJsonPath, getJsonPath}; 