const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Set up socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg); // Broadcast the message to all clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Listen on the provided port (Vercel will automatically handle the port)
server.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
});
