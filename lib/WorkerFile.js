module.exports = function WorkerFile(handler) {

    process.on('message',function(message, socket) {
        if (message === 'socket-worker-manager') {
            handler(socket);
            socket.on('disconnect',function() {
                process.send('socketDropped');
            });
        }
    });
};