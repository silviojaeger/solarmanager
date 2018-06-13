//imports
var inverter = require("../app/inverter.js");
var powerMeter = require("../app/powerMeter");

//global variables
var date = new Date();

//functions

//check if its Lower Rate and returns boolean
function checkLowerRate(){
	var h= date.getHours();
	var min = date.getMinutes();
	console.log("Actual Time: "+h+":"+min);
	if(h>=20 || h<7){	
		return true;
	}else{
		return false;
	}
};
//Returns the difference between generated and consumed energy.
function checkEnergySurplus(){
	var difference = inverter.getPower() - powerMeter.getPower();
	console.log(difference);
	return difference;
}

//export everything to the mainJS
module.exports = {checkLowerRate, checkEnergySurplus}; 