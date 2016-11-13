window.mobilecheck = function() {
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

function randomString(length) {
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
}

var start = function() {
    if (window.mobilecheck()) { // if mobile
        console.info("Mobile device!")
        client()
    } else {
        console.info('Not a mobile device!');
        document.getElementById('client-host-selector').style = "opacity: 1; transform: scale(1, 1); display: block"
        document.getElementById('shadow').style = "display: block; opacity: 0.5;"
    }
}
window.clientCode = randomString(9)

var client = function() {
    document.getElementById('pregame').style = "display: none;"
    document.getElementById('client-host-selector').style = "opacity: 0; transform: scale(0, 0); display: block"
    document.getElementById('shadow').style = "display: block; opacity: 0;"
    document.getElementById('game').style = "display: block";
    var socket = io();
    var joinCode = prompt("code: ")
    var name = prompt("whats ur name") || "guest"
    socket.emit("joinGame", { code: joinCode, name: name, client: clientCode })
    socket.on("joinGame" + clientCode, function(g) {
        console.log(g);
        window.slkdfklsdfjcode = joinCode;
    })

    function sendGesture(name, percent) {
        if (percent > 0.7) {
            console.log('sending gesture');
            socket.emit("gesture", { name: name, score: percent, id: clientCode, code: slkdfklsdfjcode });
            document.getElementById("gesture").innerHTML = name + " " + Math.round(percent * 100) + "%"
            return true
        } else {
            return false
        }


    }

    var oldX;
    var oldY;
    var canvas;
    var ctx;
    var _r = new DollarRecognizer();
    var _points = [];
    var isMouseDown = false; // mouse only bool
    var threshold = 3; // number of pixels required to be moved for a movement to count


    canvas = document.getElementById("game-canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.addEventListener('touchstart', function(e) {
        e.preventDefault();
        _points = [];
        var touch = e.touches[0];
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 6;
        oldX = touch.pageX;
        oldY = touch.pageY;
    }, false);

    document.addEventListener('touchmove', function(e) {
        if (oldX - e.pageX < 3 && oldX - e.pageX > -3) {
            return;
        }
        if (oldY - e.pageY < 3 && oldY - e.pageY > -3) {
            return;
        }
        var touch = e.touches[0];
        ctx.moveTo(oldX, oldY);
        oldX = touch.pageX;
        oldY = touch.pageY;
        ctx.lineTo(oldX, oldY);
        ctx.stroke();
        _points[_points.length] = new Point(oldX, oldY);
    }, false);

    document.addEventListener('touchend', function(e) {
        ctx.closePath();
        if (_points.length >= 10) {
            var result = _r.Recognize(_points);
            ctx.strokeStyle = sendGesture(result.Name, result.Score) ? "#00FF00" : "#FF0000";
            ctx.stroke();
        }
        _points = [];
        setTimeout(function() { ctx.clearRect(0, 0, canvas.width, canvas.height); }, 100);

    }, false);

    document.addEventListener('mousedown', function(e) {
        isMouseDown = true;
        e.preventDefault();
        _points = [];
        ctx.beginPath();
        ctx.strokeStyle = "#000000";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = 6;
        oldX = e.pageX;
        oldY = e.pageY;
    }, false);



    document.addEventListener('mousemove', function(e) {
        if (!isMouseDown) {
            return;
        }
        if (oldX - e.pageX < 3 && oldX - e.pageX > -3) {
            return;
        }
        if (oldY - e.pageY < 3 && oldY - e.pageY > -3) {
            return;
        }
        ctx.moveTo(oldX, oldY);
        oldX = e.pageX;
        oldY = e.pageY;
        ctx.lineTo(oldX, oldY);
        ctx.stroke();
        _points[_points.length] = new Point(oldX, oldY);
    }, false);

    document.addEventListener('mouseup', function(e) {
        isMouseDown = false;
        ctx.closePath();
        if (_points.length >= 10) {
            var result = _r.Recognize(_points);
            var result = _r.Recognize(_points);
            ctx.strokeStyle = sendGesture(result.Name, result.Score) ? "#00FF00" : "#FF0000";
            ctx.stroke();
        }

        _points = [];
        setTimeout(function() { ctx.clearRect(0, 0, canvas.width, canvas.height); }, 100);
    }, false);

}

var host = function() {
    document.getElementById('client-host-selector').style = "opacity: 0; transform: scale(0, 0); display: block"
    document.getElementById('pregame').style = "display: none;"
    document.getElementById('shadow').style = "display: block; opacity: 0;"
    document.getElementById('game').style = "display: block";
    document.getElementById("game-canvas").width = window.innerWidth;
    document.getElementById("game-canvas").height = window.innerHeight;

    var socket = io();
    console.info('Hosting a game');
    socket.emit("newGame", clientCode);
    socket.on("newGame" + clientCode, function(msg) {

        alert("code is " + msg.code);
        game.code = msg.code;
        document.getElementById("code").innerHTML = "Join code: " + msg.code;

    })

    socket.on("newPlayer", function(g) {
        document.getElementById("connected").innerHTML = "Connected: " + g.map(function(e) {
            return e.name
        }).join(", ");
    });

    var enemyTypes = {
        triangle: { health: 3, speed: 5, damage: 3 },
        pentagon: { health: 9, speed: 2 },
        star: { health: 15, speed: 0.5, damage: 10 },
        circle: { health: 1, speed: 7, damage: 1 }
    }

    window.game = {
        health: 100,
        turrets: [],
        income: 1, //income per wave
        ink: 20, //how many times you can draw something
        wave: 1,
        enemies: [],
        // numofenemies: wave * wave,
    }

    var canvas = document.getElementById('game-canvas');
    var translate_x = canvas.width / 2
    var translate_y = canvas.height / 2

    socket.on("newGesture", function(gesture) {
        if (gesture.name == "triangle") {
            // new Turret
            game.turrets.push({
                id: randomString(5),
                speed: 3,
                damage: 3,
                x: Math.floor(Math.random() * 320) - 160 + translate_x,
                y: Math.floor(Math.random() * 200) - 120 + translate_y,
                ready: true, // if the turret is ready to shoot, false if it is currently shooting
                bullet: { x: 0, y: 0, target: null }
            })
        }
    })

    function drawEnemy(enemy) {
        if (enemy.health <= 0) {
            return;
        }
    	ctx.fillStyle = "rgb(0,0,0)"
    	ctx.beginPath();
    	ctx.arc(enemy.x, enemy.y, 30, 0, Math.PI * 2, true);
    	ctx.stroke();
        // if (enemy.type === "triangle") {
        //     ctx.fillStyle = "rgb(255,255,0)";
        //     tipX = enemy.x + 10 * Math.cos(enemy.angle) - ((enemy.y) - enemy.y) * Math.sin(enemy.angle);
        //     tipY = enemy.y + 10 * Math.sin(enemy.angle) + ((enemy.y) - enemy.y) * Math.cos(enemy.angle);
        //     leftX = enemy.x + -5 * Math.cos(enemy.angle) - 5 * Math.sin(enemy.angle);
        //     leftY = enemy.y + -5 * Math.sin(enemy.angle) + 5 * Math.cos(enemy.angle);
        //     rightX = enemy.x + 5 * Math.cos(enemy.angle) - ((enemy.y - 5) - enemy.y) * Math.sin(enemy.angle);
        //     rightY = enemy.y + 5 * Math.sin(enemy.angle) + ((enemy.y - 5) - enemy.y) * Math.cos(enemy.angle);

        //     ctx.moveTo(tipX, tipY);
        //     ctx.lineTo(leftX, leftY);
        //     ctx.lineTo(rightX, rightY);
        //     ctx.lineTo(tipX, tipY);
        //     ctx.fill();

        //     ctx.fillStyle = "rgb(0,0,0)";
        //     ctx.moveTo(tipX, tipY);
        //     ctx.beginPath();
        //     ctx.lineTo(leftX, leftY);
        //     ctx.lineTo(rightX, rightY);
        //     ctx.lineTo(tipX, tipY);
        //     ctx.stroke();

        // }
        // if (enemy.type === "pentagon") {
        //     ctx.fillStyle = "rgb(255,255,0)";
        //     tipX = enemy.x + 10 * Math.cos(enemy.angle) - ((enemy.y) - enemy.y) * Math.sin(enemy.angle);
        //     tipY = enemy.y + 10 * Math.sin(enemy.angle) + ((enemy.y) - enemy.y) * Math.cos(enemy.angle);
        //     leftX = enemy.x + -5 * Math.cos(enemy.angle) - 5 * Math.sin(enemy.angle);
        //     leftY = enemy.y + -5 * Math.sin(enemy.angle) + 5 * Math.cos(enemy.angle);
        //     rightX = enemy.x + 5 * Math.cos(enemy.angle) - ((enemy.y - 5) - enemy.y) * Math.sin(enemy.angle);
        //     rightY = enemy.y + 5 * Math.sin(enemy.angle) + ((enemy.y - 5) - enemy.y) * Math.cos(enemy.angle);

        //     ctx.moveTo(tipX, tipY);
        //     ctx.lineTo(leftX, leftY);
        //     ctx.lineTo(rightX, rightY);
        //     ctx.lineTo(tipX, tipY);
        //     ctx.fill();

        //     ctx.fillStyle = "rgb(0,0,0)";
        //     ctx.moveTo(tipX, tipY);
        //     ctx.beginPath();
        //     ctx.lineTo(leftX, leftY);
        //     ctx.lineTo(rightX, rightY);
        //     ctx.lineTo(tipX, tipY);
        //     ctx.stroke();

        // }
        // if (enemy.type === "star") {
        //     ctx.fillStyle = "rgb(255,255,0)";
        //     tipX = enemy.x + 10 * Math.cos(enemy.angle) - ((enemy.y) - enemy.y) * Math.sin(enemy.angle);
        //     tipY = enemy.y + 10 * Math.sin(enemy.angle) + ((enemy.y) - enemy.y) * Math.cos(enemy.angle);
        //     leftX = enemy.x + -5 * Math.cos(enemy.angle) - 5 * Math.sin(enemy.angle);
        //     leftY = enemy.y + -5 * Math.sin(enemy.angle) + 5 * Math.cos(enemy.angle);
        //     rightX = enemy.x + 5 * Math.cos(enemy.angle) - ((enemy.y - 5) - enemy.y) * Math.sin(enemy.angle);
        //     rightY = enemy.y + 5 * Math.sin(enemy.angle) + ((enemy.y - 5) - enemy.y) * Math.cos(enemy.angle);

        //     ctx.moveTo(tipX, tipY);
        //     ctx.lineTo(leftX, leftY);
        //     ctx.lineTo(rightX, rightY);
        //     ctx.lineTo(tipX, tipY);
        //     ctx.fill();

        //     ctx.fillStyle = "rgb(0,0,0)";
        //     ctx.moveTo(tipX, tipY);
        //     ctx.beginPath();
        //     ctx.lineTo(leftX, leftY);
        //     ctx.lineTo(rightX, rightY);
        //     ctx.lineTo(tipX, tipY);
        //     ctx.stroke();

        // }
        // if (enemy.type === "circle") {
        //     ctx.fillStyle = "rgb(255,255,0)";
        //     tipX = enemy.x + 10 * Math.cos(enemy.angle) - ((enemy.y) - enemy.y) * Math.sin(enemy.angle);
        //     tipY = enemy.y + 10 * Math.sin(enemy.angle) + ((enemy.y) - enemy.y) * Math.cos(enemy.angle);
        //     leftX = enemy.x + -5 * Math.cos(enemy.angle) - 5 * Math.sin(enemy.angle);
        //     leftY = enemy.y + -5 * Math.sin(enemy.angle) + 5 * Math.cos(enemy.angle);
        //     rightX = enemy.x + 5 * Math.cos(enemy.angle) - ((enemy.y - 5) - enemy.y) * Math.sin(enemy.angle);
        //     rightY = enemy.y + 5 * Math.sin(enemy.angle) + ((enemy.y - 5) - enemy.y) * Math.cos(enemy.angle);

        //     ctx.moveTo(tipX, tipY);
        //     ctx.lineTo(leftX, leftY);
        //     ctx.lineTo(rightX, rightY);
        //     ctx.lineTo(tipX, tipY);
        //     ctx.fill();

        //     ctx.fillStyle = "rgb(0,0,0)";
        //     ctx.moveTo(tipX, tipY);
        //     ctx.beginPath();
        //     ctx.lineTo(leftX, leftY);
        //     ctx.lineTo(rightX, rightY);
        //     ctx.lineTo(tipX, tipY);
        //     ctx.stroke();

        // }
    }

    function draw(t) {
        if (canvas.getContext) {
            window.ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            /*  -   Draw Castle   -  */
            ctx.fillStyle = "rgb(211,211,211)";
            ctx.fillRect(translate_x - 160, translate_y - 50, 320, 200);
            ctx.fillStyle = "rgb(0,0,0)";
            ctx.lineWidth = 2;
            ctx.strokeRect(translate_x - 160, translate_y - 50, 320, 200);
            ctx.beginPath();
            ctx.moveTo(translate_x - 160, translate_y - 100);
            ctx.lineTo(translate_x + 160, translate_y - 100);
            ctx.lineTo(translate_x + 160, translate_y + 100);
            ctx.lineTo(translate_x - 160, translate_y + 100);
            ctx.lineTo(translate_x + 160, translate_y - 100);

            /* Draw enemies */
            // for enemy in enemies, drawEnemy(enemy)

            for (var i = game.enemies.length - 1; i >= 0; i--) {
                drawEnemy(game.enemies[i])
            }

            //draw turrets
            for (var i = game.turrets.length - 1; i >= 0; i--) {
                ctx.beginPath();
                ctx.moveTo(game.turrets[i].x, game.turrets[i].y);
                ctx.arc(game.turrets[i].x, game.turrets[i].y, 10, 0, Math.PI * 2, true);
                ctx.stroke();
                if (!game.turrets[i].ready) {
                    //draw bullet
                    ctx.beginPath();
                    ctx.arc(game.turrets[i].bullet.x, game.turrets[i].bullet.y, 3, 0, Math.PI * 2, true);
                    ctx.stroke();
                }
            }

            /* Shoot guns (calculate positions) */

            for (var i = game.turrets.length - 1; i >= 0; i--) {
                var turret = game.turrets[i];
                if (turret.ready) { // if it is ready to shoot
                    // see which enemy is closest
                    var closestDist = 9999;
                    var closest;
                    if (game.enemies.length === 0) { //nothing to shoot
                        continue;
                    }
                    for (var i = game.enemies.length - 1; i >= 0; i--) {
                        var dist = Math.sqrt(Math.pow(turret.x - game.enemies[i].x, 2) + Math.pow(turret.y - game.enemies[i].y, 2));
                        if (dist < closestDist) {
                            closestDist = dist;
                            closest = game.enemies[i]
                            console.log('found closer enemy: ', closest);
                        }
                    }
                    // set it as the target
                    turret.bullet.target = closest || game.enemies[0];
                    // fire 
                    turret.ready = false;
                    turret.bullet.x = turret.x;
                    turret.bullet.y = turret.y;
                    var angle = Math.atan2(turret.bullet.target.y - turret.y, turret.bullet.target.x - turret.x);
                    turret.angle = angle;
                    console.log('fired bullet')
                } else { // just animate the bullet
                    var bullet = turret.bullet
                    var target = bullet.target;
                    if (target.health === 0) { // if the target is dead somehow
                        // make the bullet disappear
                        turret.ready = true;
                    }
                    var angle = Math.atan2(bullet.y - target.y, bullet.x - target.x);
                    var angleDelta = angle - turret.angle;
                    if (angleDelta <= -Math.PI / 10) {
                        angleDelta = -Math.PI / 10
                    } else if (angleDelta >= Math.PI / 10) {
                        angleDelta = Math.PI / 10
                    }
                    turret.angle = Math.atan2(turret.bullet.target.y - turret.y, turret.bullet.target.x - turret.x);;
                    angle = angle + angleDelta;
                    var xSpeed = turret.speed * Math.cos(angle);
                    var ySpeed = turret.speed * Math.sin(angle);
                    bullet.x -= xSpeed;
                    bullet.y -= ySpeed;

                    // check if bullet hit enemy, if so, decrease enemy health and reset bullet

                    if (Math.sqrt(Math.pow(turret.x - target.x, 2) + Math.pow(turret.y - target.y, 2)) < 15) { //within 15 of enemy, so it probably hit it lol
                        target.health -= turret.damage;
                        turret.ready = true;
                    }
                }
            }

            /* Move enemies */

            for (var i = game.enemies.length - 1; i >= 0; i--) {
                var enemy = game.enemies[i];
                var target = enemy.target;
                var angle = Math.atan2(enemy.y - target.y, enemy.x - target.x)
                var xSpeed = enemy.speed * Math.cos(angle);
                var ySpeed = enemy.speed * Math.sin(angle);
                console.log("enemy speed", xSpeed, ySpeed)
                enemy.x -= xSpeed;
                enemy.y -= ySpeed;
                // rotate enemies
            }

            /* Spawn enemies */
            if (++counter % 500 == 0) {
                var rand = Math.random();
                var enemy = {
                    angle: 0,
                    target: { x: translate_x, y: translate_y }
                }
                var edge = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
                switch (edge) {
                    case "up":
                        enemy.x = Math.random() * translate_x * 2
                        enemy.y = Math.random() * 10
                    case "down":
                        enemy.x = Math.random() * translate_x * 2
                        enemy.y = translate_y * 2 - Math.random() * 10
                    case "left":
                        enemy.y = Math.random() * translate_y * 2
                        enemy.x = Math.random() * 10
                    case "right":
                        enemy.y = Math.random() * translate_y * 2
                        enemy.x = translate_x * 2 - Math.random() * 10
                }
                if (rand > 0.9) {
                    enemy.type = "star"
                } else if (rand > 0.65) {
                    enemy.type = "pentagon"
                } else if (rand > 0.4) {
                    enemy.type = "circle"
                } else {
                    enemy.type = "triangle"
                }
                enemy.health = enemyTypes[enemy.type].health;
                enemy.speed = enemyTypes[enemy.type].speed;
                game.enemies.push(enemy);
                console.log('made enemy', enemy);
            }

        }
        window.requestAnimationFrame(draw)
    }
    window.counter = 0;
    draw();
}
