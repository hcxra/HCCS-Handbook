document.addEventListener('DOMContentLoaded', () => {
    // Handle dropdown menus
    document.querySelectorAll('.nav-item').forEach(item => {
        const dropdown = item.querySelector('.dropdown');

        if (dropdown) {
            item.addEventListener('mouseenter', () => dropdown.style.display = 'block');
            item.addEventListener('mouseleave', () => dropdown.style.display = 'none');
        }
    });

    // Render Threads on Page Load
    renderThreads();

    // Thread Creation Handler
    document.getElementById('createThreadButton').addEventListener('click', () => {
        const username = document.getElementById('username').value.trim();
        const title = document.getElementById('threadTitle').value.trim();
        const content = document.getElementById('threadContent').value.trim();

        if (username && title && content) {
            const thread = {
                username,
                title,
                content,
                replies: []
            };

            // Save the thread to localStorage
            const threads = JSON.parse(localStorage.getItem('threads')) || [];
            threads.push(thread);
            localStorage.setItem('threads', JSON.stringify(threads));

            // Render updated threads
            renderThreads();

            // Clear input fields
            document.getElementById('username').value = '';
            document.getElementById('threadTitle').value = '';
            document.getElementById('threadContent').value = '';
        }
    });
});

// Function to Render Threads
function renderThreads() {
    const threads = JSON.parse(localStorage.getItem('threads')) || [];
    const threadsList = document.getElementById('threadsList');
    threadsList.innerHTML = '';

    threads.forEach((thread, index) => {
        const threadItem = document.createElement('li');
        threadItem.innerHTML = `<strong>${thread.title}</strong> by ${thread.username}`;
        threadItem.addEventListener('click', () => {
            showThread(index);
        });
        threadsList.appendChild(threadItem);
    });
}

// Function to Show a Thread and its Replies
function showThread(index) {
    const threads = JSON.parse(localStorage.getItem('threads')) || [];
    const thread = threads[index];

    // Display thread title and content
    document.getElementById('threadTitleDisplay').textContent = thread.title;
    document.getElementById('threadContentDisplay').textContent = thread.content;

    // Render Replies
    const replyList = document.getElementById('replyList');
    replyList.innerHTML = '';
    thread.replies.forEach(reply => {
        const replyItem = document.createElement('li');
        replyItem.classList.add('reply');
        replyItem.innerHTML = `<strong>${reply.username}:</strong> ${reply.content}`;
        replyList.appendChild(replyItem);
    });

    document.getElementById('replies').style.display = 'block';

    // Handle Posting a Reply
    document.getElementById('replyButton').onclick = () => {
        const replyUsername = document.getElementById('replyUsername').value.trim();
        const replyContent = document.getElementById('replyContent').value.trim();

        if (replyUsername && replyContent) {
            thread.replies.push({ username: replyUsername, content: replyContent });
            threads[index] = thread;
            localStorage.setItem('threads', JSON.stringify(threads));

            // Re-render replies
            showThread(index);

            // Clear input fields
            document.getElementById('replyUsername').value = '';
            document.getElementById('replyContent').value = '';
        }
    };
}



