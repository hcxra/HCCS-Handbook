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

ddocument.addEventListener('DOMContentLoaded', () => {
    const threads = JSON.parse(localStorage.getItem('threads')) || [];
    const threadsList = document.getElementById('threadsList');
    const threadCreation = document.getElementById('thread-creation');
    const repliesSection = document.getElementById('replies');
    const threadTitleDisplay = document.getElementById('threadTitleDisplay');
    const threadContentDisplay = document.getElementById('threadContentDisplay');
    const repliesList = document.getElementById('repliesList');
    const backToThreads = document.getElementById('backToThreads');

    function renderThreads() {
        threadsList.innerHTML = '';
        threads.forEach((thread, index) => {
            const li = document.createElement('li');
            li.textContent = thread.title;
            li.dataset.index = index;
            li.addEventListener('click', () => openThread(index));
            threadsList.appendChild(li);
        });
    }

    function openThread(index) {
        const thread = threads[index];
        threadTitleDisplay.textContent = thread.title;
        threadContentDisplay.textContent = thread.content;

        repliesList.innerHTML = '';
        thread.replies.forEach(reply => {
            const li = document.createElement('li');
            li.textContent = reply;
            repliesList.appendChild(li);
        });

        threadCreation.style.display = 'none';
        repliesSection.style.display = 'block';
    }

    document.getElementById('createThreadButton').addEventListener('click', () => {
        const title = document.getElementById('threadTitle').value.trim();
        const content = document.getElementById('threadContent').value.trim();

        if (title && content) {
            threads.push({ title, content, replies: [] });
            localStorage.setItem('threads', JSON.stringify(threads));
            renderThreads();
            document.getElementById('threadTitle').value = '';
            document.getElementById('threadContent').value = '';
        }
    });

    document.getElementById('addReplyButton').addEventListener('click', () => {
        const index = threads.findIndex(thread => thread.title === threadTitleDisplay.textContent);
        const replyContent = document.getElementById('replyContent').value.trim();

        if (replyContent) {
            threads[index].replies.push(replyContent);
            localStorage.setItem('threads', JSON.stringify(threads));
            document.getElementById('replyContent').value = '';
            openThread(index);
        }
    });

    backToThreads.addEventListener('click', () => {
        threadCreation.style.display = 'block';
        repliesSection.style.display = 'none';
    });

    renderThreads();
});
