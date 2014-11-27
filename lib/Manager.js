module.exports = function Manager(filename, max, keepAlive, Worker) {
    'use strict';
    max = typeof max === 'number' ? max : 5;
    var workers = [],
        send = function (name, handle) {
            var sort = function(a,b) {
                return a.activeSockets - b.activeSockets;
            };
            workers.sort(sort);
            workers[0].send(name, handle);
        },
        createWorkers = function () {
            var i,
                onerror = function (err) {
                    throw err;
                };
            for (i = 0; i < max; i += 1) {
                workers[i] = new Worker(filename, keepAlive);
                workers[i].onerror = onerror;
            }
        };

    createWorkers();

    Object.defineProperty(this, 'send', {value: send});
};