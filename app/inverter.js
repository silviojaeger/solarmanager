//imports
var request = require('request');

//global variables
var ip;
var api;
var actualPover;
var intervTime;
var jsonPath;

//Basic configurations
function setApi(api){
	this.api = api;
	console.log('set API to: '+this.api);
}

function setIp(ip){
	this.ip = ip;
	console.log('set IP to: '+this.ip);
}

function setIntervTime(time){
	this.intervTime = time;
	console.log('set interval Time to: '+this.intervTime+'ms');
}

function setJsonPath(path){
	this.jsonPath = path;
	console.log('set JSON-Path to: '+this.jsonPath);
}

function getIntervTime(){
	return this.intervTime;
}

function getApi(){
	return this.api;
}

function getIp(){
	return this.ip;
}

function getPover(){
	return this.actualPover;
}

function getPover(){
	return this.actualPover;
}

function getJsonPath(){
	return this.jsonPath;
}

//HTTP requests
function requestPover(){

		var reqUrl = this.ip+this.api;
	console.log('------HTTP--Request----------------------------');
	console.log('Start request to: '+reqUrl);
	console.log('Interval Time: '+ this.intervTime);
	console.log('JSON Path: '+this.jsonPath)
	
	
	request.get(reqUrl, function (error, response, body) {
	  if(error!=null){console.log('error:', error);} 				// Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); 	// Print the response status code if a response was received	  								
	  console.log('Response: '+body);
	  console.log('-----------------------------------------------');
	  console.log('Test: '+ this.jsonPath);
	  
	  handleJson(JSON.parse(body));  //calls handleJson function to read the right key/value from the Json file
	  
	  //Hier weiter!!!!!!!!! da request in anderem "thread" läuft kann nicht auf variabel jsonPath zugegriffen werden
	  
	});
	
}




//handle the JSON response file
function handleJson(json){
	//has to make: json.value.id    (getJsonPath returns string ".value.id")
	actualPover=json.value.id;
	
	console.log('Test: '+ this.jsonPath);
	
	console.log('Pover set to: ' + actualPover);
}

//export everything to the mainJS
module.exports = {setApi, getApi, setIp, getIp, getPover, requestPover, setIntervTime, getIntervTime, setJsonPath, getJsonPath, handleJson}; 