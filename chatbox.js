(function() {
    // HTML structure for the chatbox
    const chatboxHTML = `
    <div id="chatbox" style="position: fixed; bottom: 20px; right: 20px; width: 250px; height: 300px; background: rgba(0, 0, 0, 0.7); border: none; display: flex; flex-direction: column; font-family: Arial, sans-serif; z-index: 9999; border-radius: 8px;">
        <div id="chat-messages" style="flex: 1; padding: 5px; overflow-y: auto; color: white; font-size: 12px;"></div>
        <div style="padding: 5px;">
            <input type="text" id="chat-input" placeholder="Type a message..." style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px; background: rgba(255, 255, 255, 0.8); font-size: 12px;">
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

    // Handle sending messages
    const chatInput = document.getElementById('chat-input');
    
    // You can change the name if you want, or keep it static like 'User'
    const username = 'User'; // You can customize this to something else if you wish.

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                addMessage(username, message); // Use the fixed username here
                chatInput.value = ''; // Clear the input field after sending the message
            }
        }
    });
})();
