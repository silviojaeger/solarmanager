//global variables
var date = new Date();

//functions
function checkLowerRate(){
	var h= date.getHours();
	var min = date.getMinutes();
	console.log("Actual Time: "+h+":"+min);
	if(h>=20 || h<7){	//check if its Lower Rate and returns boolean
		return true;
	}else{
		return false;
	}
};

//export everything to the mainJS
module.exports = {checkLowerRate}; 