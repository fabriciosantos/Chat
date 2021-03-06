var app = require('./config/server');

var server = app.listen(process.env.PORT || 80, function () {
    console.log('servidor online');
})

var io = require('socket.io').listen(server);
app.set('io', io);

io.on('connection', function (socket) {


    socket.on('disconnect', function () {
        console.log('Usuario desconectou');
    });

    socket.on('sendMsgServer', function (data) {
        socket.emit('sendMsg', { apelido: data.apelido, mensagem: data.mensagem });
        socket.broadcast.emit('sendMsg', { apelido: data.apelido, mensagem: data.mensagem });

        if (parseInt(data.control) == 0) {
            socket.emit('novoUsuario', { apelido: data.apelido, mensagem: data.mensagem });
            socket.broadcast.emit('novoUsuario', { apelido: data.apelido, mensagem: data.mensagem });
        }
    });
});
