module.exports=function(app, inverter){
	//All routes are defined here
	
	//main route
	app.get('/', function (req, res) {
	  res.sendfile('./view/index.html');
	});
	
	//get actual pover of the inverter
	app.get('/pover', function (req, res) {
		res.setHeader('Content-Type', 'application/json');
		res.send(inverter.getPover());
	});
	
	//other routes here
}