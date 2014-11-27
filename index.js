module.exports = (function(){

    var Manager = require('./lib/Manager'),
        Worker = require('./lib/Worker'),
        WorkerFile = require('./lib/WorkerFile');

    var SocketManager = {};

    Object.defineProperty(SocketManager, 'createManager', {
        value : function (filename, max, keepAlive) {
            return new Manager(filename, max, keepAlive, Worker); 
        }
    });
    Object.defineProperty(SocketManager, 'createWorker', {
        value : function (handler) { return new WorkerFile(handler); }
    });

    return SocketManager;
})();
