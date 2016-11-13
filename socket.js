var game = require('./game')
var _ = require('lodash')

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
            socket.emit("newGame" + msg, _.omit(g, "conn", "playerConns"));
            console.log("Created new game, host is " + msg)
        });
        socket.on('joinGame', function(code) {
            if (!game.games.filter(function(g) {
                    return g.code === code.code
                }).length < 1) {


                console.log(code, "wants to join game")
                var g = game.games.filter(function(g) {
                    return g.code === code.code
                })[0]
                g.players.push({ name: code.name, id: code.client })
                socket.emit("joinGame" + code.client, _.omit(g, "conn", "playerConns"))
                g.playerConns.push(socket);
                g.conn.emit("newPlayer", g.players);
            }
        });
        socket.on("gesture", function(msg) {
            if (game.games.filter(function(g) {
                    return g.code === msg.code
                }).length === 1) {

                var g = game.games.filter(function(g) {
                    return g.code === msg.code
                })[0]

                g.conn.emit("newGesture", msg)
            }
        });
        socket.on("score", function(msg) {
            if (game.games.filter(function(g) {
                    return g.code === msg.code
                }).length === 1) {

                var g = game.games.filter(function(g) {
                    return g.code === msg.code
                })[0]

                g.playerConns.forEach(function(a) {
                    a.emit("score", msg.score);
                });
            }
        });
        socket.on("health", function(msg) {
            if (game.games.filter(function(g) {
                    return g.code === msg.code
                }).length === 1) {

                var g = game.games.filter(function(g) {
                    return g.code === msg.code
                })[0]

                g.playerConns.forEach(function(a) {
                    a.emit("health", msg.health);
                });
            }
        });
    });


}
