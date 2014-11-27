module.exports = function WorkerFile(handler) {

    process.on('message',function(message, handle) {
        if (message === 'socket-worker-manager') {
            handler(handle);
            handle.on('disconnect',function() {
                process.send('socketDropped');
            });
        }
    });
};