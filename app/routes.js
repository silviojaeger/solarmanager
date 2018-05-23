module.exports=function(app, inverter){
	//All routes are defined here
	
	//gat at root directory
	app.get('/', function (req, res) {
	  res.sendfile('./view/index.html');
	});
	
	//get actual power of the inverter
	app.get('/power', function (req, res) {
		console.log('Incoming HTTP request at: /power');
		res.setHeader('Content-Type', 'application/json');
		res.send("Power: "+inverter.getPower());
	});
	
	//other routes here
}