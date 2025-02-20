(function() {
    const chatboxHTML = `
    <div id="chatbox" style="position: fixed; bottom: 20px; right: 20px; width: 200px; height: 200px; background: transparent; border: none; display: flex; flex-direction: column; font-family: Arial, sans-serif;">
        <div id="chat-messages" style="flex: 1; padding: 5px; overflow-y: auto; color: white; font-size: 12px;"></div>
        <div style="padding: 5px;">
            <input type="text" id="chat-input" placeholder="Type a message..." style="width: 100%; padding: 5px; border: 1px solid #ccc; border-radius: 4px; background: rgba(255, 255, 255, 0.8); font-size: 12px;">
        </div>
    </div>
    `;
    
    // Inject the chatbox into the page
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
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                const name = 'User'; // You can adjust this as needed
                addMessage(name, message);
                chatInput.value = ''; // Clear the input
            }
        }
    });
})();
