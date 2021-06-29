const express = require("express");


const app = express();

const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use(express.static(__dirname + "/public"))


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

// Socket

// We will work with http server
const io = require("socket.io")(http)

io.on('connection', (socket) => {
    // Receiving event
    console.log('Connected');
    socket.on('message', (msg) => {
        //Sending messaging to all the clients
        socket.broadcast.emit('message', msg)
    })
})
