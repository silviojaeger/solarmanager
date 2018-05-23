module.exports=function(app, inverter){
	//All routes are defined here
	
	//gat at root directory
	app.get('/', function (req, res) {
	  res.sendfile('./view/index.html');
	});
	
	//get actual pover of the inverter
	app.get('/pover', function (req, res) {
		console.log('Incoming HTTP request at: /pover');
		res.setHeader('Content-Type', 'application/json');
		res.send(inverter.getPover());
		console.log(inverter.getPover());
	});
	
	//other routes here
}