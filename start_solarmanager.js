var express = require('express');
var app = express();
var path = require('path');

//schickt public verzeichniss an client
app.use(express.static(path.join(__dirname, 'public')));

//Routes werden hier definiert....können auch in separate JS ausgelagert werden
app.get('/', function (req, res) {
  res.sendfile('./view/index.html');
});


//Server starten und port definieren
app.listen(3000, function () {
  console.log('Solarmanager gestartet!');
});
