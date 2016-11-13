var game = require('./game')

module.exports = function(http) {
    var io = require('socket.io')(http)
    console.log('sdfsdf')
    io.on('connection', function(socket) {
        console.log('a user connected');
        socket.on('disconnect', function() {
            console.log('user disconnected');
        });
        socket.on('newGame', function(msg) {
            // generate code
            var g = game.newGame();
            g.conn = socket
            game.games.push(g);
            socket.emit("newGame" + msg, g);
            console.log("Created new game, host is " + msg)
        });
        socket.on('joinGame', function(code) {
            if (game.games.filter(function(g) {
                    return g.code === code.code
                }).length < 1) {
                return;
            }
            console.log(code, "wants to join game")
            var g = game.games.filter(function(g) {
                return g.code === code.code
            })[0]
            g.players.push({ name: code.name, id: code.client })
            socket.emit("joinGame" + code.client, g)
        });
        socket.on("gesture", function(msg) {
            if (game.games.filter(function(g) {
                    return g.code === code.code
                }).length < 1) {
                return;
            }
            var g = game.games.filter(function(g) {
                return g.code === msg.code
            })[0]
            g.conn.emit("newGesture", msg)
        })
    });


}
