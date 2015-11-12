var express = require('express');
var app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/node_modules'));

var server = app.listen(1337, function() {
	console.log('Estamos oyendo en el puerto 1337');
});