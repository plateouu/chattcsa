// Import dependencies
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Create an Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io with the server
const io = socketIo(server);

// Serve static files (e.g., your chatbox.js file)
app.use(express.static('public'));

// Set up the Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for messages from clients
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg); // Broadcast the message to all connected clients
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
