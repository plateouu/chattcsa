(function() {
    // Check if the chatbox already exists on the page
    if (document.getElementById('chatbox')) return; // If it exists, don't create a new one
    
    // HTML structure for the chatbox
    const chatboxHTML = `
    <div id="chatbox" style="position: fixed; bottom: 20px; right: 20px; width: 250px; height: 300px; background: rgba(0, 0, 0, 0.8); border: none; display: flex; flex-direction: column; font-family: Arial, sans-serif; z-index: 9999; border-radius: 8px;">
        <div id="chat-messages" style="flex: 1; padding: 5px; overflow-y: auto; color: white; font-size: 12px; background-color: rgba(0, 0, 0, 0.6);"></div>
        <div style="padding: 5px;">
            <input type="text" id="chat-input" placeholder="Type a message..." style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px; background: rgba(255, 255, 255, 0.8); font-size: 12px; color: black;">
        </div>
    </div>
    `;
    
    // Inject the chatbox HTML into the page
    document.body.insertAdjacentHTML('beforeend', chatboxHTML);

    // Function to add a message to the chat
    function addMessage(name, message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.innerHTML = `<strong>${name}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to the bottom
    }

    // Set up Socket.io client-side
    const socket = io();

    // Handle sending messages
    const chatInput = document.getElementById('chat-input');
    
    const username = 'User'; // You can customize this to something else if you wish.

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(username, message); // Display locally
                socket.emit('chatMessage', { username, message }); // Send to server
                chatInput.value = ''; // Clear the input field
            }
        }
    });

    // Listen for incoming messages
    socket.on('chatMessage', (msg) => {
        addMessage(msg.username, msg.message); // Display the message
    });

    // Hide the chatbox when "P" is pressed
    let isChatboxVisible = true; // Track visibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'p' || e.key === 'P') {
            isChatboxVisible = !isChatboxVisible; // Toggle visibility
            document.getElementById('chatbox').style.display = isChatboxVisible ? 'flex' : 'none';
        }
    });
})();
