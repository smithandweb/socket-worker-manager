module.exports = function Worker(filename, keepAlive) {
    'use strict';
    
    var cp = require('child_process'),
        activeSockets = 0,
        worker,

    send = function(msg, handle) {
        worker.send(msg, handle);
        activeSockets++;
    },
    kill = function() {
        worker && worker.kill();
        activeSockets = 0;
    },
    restart = function () {
        worker = cp.fork(filename);
        worker.on('message',function(data){
            if (data === 'socketDropped') {
                activeSockets--;
            }
        });
    };

    Object.defineProperty(this, 'send', {value:send});
    Object.defineProperty(this, 'kill', {value:kill});
    Object.defineProperty(this, 'restart', {value:restart});
};