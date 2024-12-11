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
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messages.appendChild(messageDiv);
            messageInput.value = '';
            messages.scrollTop = messages.scrollHeight; // Auto-scroll to the bottom
        }
    });
});
