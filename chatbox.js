// chatbox.js
(function() {
    // Create the chatbox container
    const chatbox = document.createElement('div');
    chatbox.style.position = 'fixed';
    chatbox.style.bottom = '10px';
    chatbox.style.right = '10px';
    chatbox.style.width = '300px';
    chatbox.style.height = '200px';
    chatbox.style.backgroundColor = '#f1f1f1';
    chatbox.style.border = '1px solid #ccc';
    chatbox.style.borderRadius = '5px';
    chatbox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    chatbox.style.display = 'flex';
    chatbox.style.flexDirection = 'column';
    chatbox.style.zIndex = '1000';

    // Create the message display area
    const messages = document.createElement('div');
    messages.style.flex = '1';
    messages.style.padding = '10px';
    messages.style.overflowY = 'auto';
    messages.style.borderBottom = '1px solid #ccc';

    // Create the input box
    const input = document.createElement('input');
    input.style.padding = '10px';
    input.style.border = 'none';
    input.style.borderTop = '1px solid #ccc';
    input.style.outline = 'none';

    // Append elements to the chatbox
    chatbox.appendChild(messages);
    chatbox.appendChild(input);
    document.body.appendChild(chatbox);

    // Connect to the server
    const socket = io('http://localhost:3000');

    // Handle incoming messages
    socket.on('chat message', (data) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `User ${data.id}: ${data.message}`;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    });

    // Send messages on Enter key
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && input.value.trim()) {
            socket.emit('chat message', input.value.trim());
            input.value = '';
        }
    });

    // Close chatbox on P key (if input is not focused)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'p' && document.activeElement !== input) {
            document.body.removeChild(chatbox);
        }
    });

    // Load Socket.IO client library
    const script = document.createElement('script');
    script.src = 'https://cdn.socket.io/4.5.4/socket.io.min.js';
    document.head.appendChild(script);
})();
