//imports
var request = require('request');

//global variables
var ip=null;
var api=null;
var actualPover=null;
var intervTime=5000;

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

//HTTP requests
function requestPover(){
	var reqUrl = this.ip+this.api;
	console.log('Start request to: '+reqUrl);
	
	console.log('Ip: '+ip);
	console.log('API: '+api);
	console.log('Pover: '+actualPover);
	console.log('Interval Time: '+intervTime);
	
	
	request(reqUrl, function (error, response, body) {
	  if(error!=null){console.log('error:', error);} 				// Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); 	// Print the response status code if a response was received
	  console.log('body:', body); 	  								
	  this.actualPover= body;
	})
}

//Interval
var interval = setInterval(
		function(){ 
			requestPover();
		}, intervTime
);

//export everything to the mainJS
module.exports = {setApi, getApi, setIp, getIp, getPover, requestPover, setIntervTime}; 