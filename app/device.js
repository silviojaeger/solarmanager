//imports
var request = require('request');

class Device {
	constructor(){
		this.Settings=
		{
			"name":"",
			"brand":"",
			"type":"",
			"ip":"",
			"apiOnOff":"",
			"apiGetInfo":"",
			"jsonPathGetInfo":	"",
			"infoContent"	:	""
		}
	}
	
	//Basic configurations "setters"
	 setName(name){
		this.Settings.name = name;
		console.log('set name to: '+this.Settings.name);
	}
	
	setBrand(brand){
		this.Settings.brand = brand;
		console.log('set brand to: '+this.Settings.brand);
	}
	
	setType(type){
		this.Settings.type = type;
		console.log('set type to: '+this.Settings.type);
	}
	
	setIp(ip){
		this.Settings.ip = ip;
		console.log('set IP to: '+this.Settings.ip);
	}
	
	setApiOnOff(apiOnOff){
		this.Settings.apiOnOff = apiOnOff;
		console.log('set apiOnOff to: '+this.Settings.apiOnOff);
	}
	
	setApiGetInfo(apiGetInfo){
		this.Settings.apiGetInfo = apiGetInfo;
		console.log('set apiGetInfo to: '+this.Settings.apiGetInfo);
	}
	
	setJsonPathGetInfo(jsonPathGetInfo){
		this.Settings.jsonPathGetInfo = jsonPathGetInfo;
		console.log('set jsonPathGetInfo to: '+this.Settings.jsonPathGetInfo);
	}
	//Basic configurations "getters"
	getName(){
		return this.Settings.name;
	}
	
	getBrand(){
		return this.Settings.brand;
	}
	
	getType(){
		return this.Settings.type;
	}
	
	getIp(){
		return this.Settings.ip;
	}
	
	getApiOnOff(){
		return this.Settings.apiOnOff;
	}
	
	getApiGetInfo(){
		return this.Settings.apiGetInfo;
	}
	
	getJsonPathOnOff(){
		return this.Settings.jsonPathOnOff;
	}
	
	getJsonPathGetInfo(){
		return this.Settings.jsonPathGetInfo;
	}
	
	//functional functions
	turnOnOff(on){ 		//true==on, false==off
		var SettingsRequest=this.Settings;
		var reqUrl = SettingsRequest.ip+SettingsRequest.apiOnOff;
		
		request(reqUrl, function (error, response, body) {
			  if(error!=null){console.log('error:', error);} 				// Print the error if one occurred
			  else{
				  if(on){console.log("Device turned on");}else{console.log("Device turned off")}
			  }
		});	
	}
	
	getInfo(){ 		//true==on, false==off
		var SettingsRequest=this.Settings;
		var reqUrl = SettingsRequest.ip+SettingsRequest.apiGetInfo;
		
		request(reqUrl, function (error, response, body) {
			  if(error!=null){
				  console.log('error:', error);			// Print the error if one occurred
			  }else{
				  var json=JSON.parse(body);
				  SettingsRequest.infoContent = eval("json"+SettingsRequest.jsonPathGetInfo) //eval makes code out of String
				  console.log('Device Info Content: ' + SettingsRequest.infoContent);
			  }
		});	
	}
}


//export to the mainJS
module.exports.Device =  Device;