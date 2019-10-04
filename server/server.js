const express = require("express");
const socket = require('socket.io');
const app = express();
const GameEngine = require("./GameEngine");
const axios = require('axios')


const gameEngine = new GameEngine();
let server = app.listen(4000);

app.use(express.static("public"));

let io = socket(server);

setInterval(updateGame, 16);

app.get("/success", function (req, res) {
    console.log(req);

    let authorisationCode = req.query.code;

    const clientId = "0ebd20dd11e06586d4b8";
    const clientSecret = process.env.clientSecret;
    let url = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${authorisationCode}&scope=user`;
    axios({
        method: "post",
        url,
        headers: {
            accept: "application/json"
        }
    }). then((response) => {
        console.log(response);
        const accessToken = response.data.access_token;
        grabUserData(accessToken);
    });
});


function grabUserData(accessToken) {
    axios({
        method: "get",
        url: "https://api.github.com/user",
        headers: {
            accept: "application/json",
            Authorization: `token ${accessToken}`
        }
    }).then((response) => {
        console.log(response);
    }).catch((err) => {
        console.log(err);
    })
}


io.sockets.on("connection", socket => {
    console.log(`New connection ${socket.id}`);
    gameEngine.createNewPlayer(socket);

    socket.on("disconnect", () => {
        io.sockets.emit("disconnect", socket.id);
        gameEngine.removePlayer(socket.id);
    });

    socket.on("keyPressed", (key) => {
        if (!gameEngine.correctKeyPressed(key, socket.id)) {
            if (!isModifierKey(key)) {
                socket.emit("wrongLetter")
            }
        }
    });


    function isModifierKey(key) {
        return key === "Shift" || key === "Control" || key === "Alt"
    }
});


function updateGame() {
    gameEngine.updatePlayers();
    io.sockets.emit("heartbeat", gameEngine.players);
    io.sockets.emit("sentence", gameEngine.sentence);
}




