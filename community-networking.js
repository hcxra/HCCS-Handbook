document.addEventListener('DOMContentLoaded', () => {
    // Handle dropdown menus
    document.querySelectorAll('.nav-item').forEach(item => {
        const dropdown = item.querySelector('.dropdown');

        if (dropdown) {
            item.addEventListener('mouseenter', () => dropdown.style.display = 'block');
            item.addEventListener('mouseleave', () => dropdown.style.display = 'none');
        }
    });

    // Chat room click functionality
    const chatRoom = document.querySelector('.chat-room');
    if (chatRoom) {
        chatRoom.addEventListener('click', () => {
            alert('Engage with other students in the chat room feature!');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // Handle send button click
    sendButton.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (text) {
            const outgoingMessage = document.createElement('div');
            outgoingMessage.classList.add('outgoing-chats');

            const messageContent = document.createElement('div');
            messageContent.classList.add('outgoing-msg');
            const messageText = document.createElement('p');
            messageText.textContent = text;
            messageContent.appendChild(messageText);

            outgoingMessage.appendChild(messageContent);
            messages.appendChild(outgoingMessage);
            messageInput.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    });

    // Handle pressing Enter key
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });
});
