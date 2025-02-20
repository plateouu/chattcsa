// server.js (Socket.io server)
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
