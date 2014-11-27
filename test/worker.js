var path = require('path');
var worker = require(path.resolve(__dirname,'../index.js')).createWorker(handler);

function handler(socket) {
	socket.on('hello',function(data) {
		console.log('got data from manager', data);
	});
}