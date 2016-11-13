function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

module.exports = {
    newGame: function() {
        var g = {
        	players: [],
            playerConns: []
        };
        g.code = randomString(5)
        // initialize other game attributes here

        return g
    },
    games: []
}
