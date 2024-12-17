ddocument.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-item').forEach(item => {
        const dropdown = item.querySelector('.dropdown');

        if (dropdown) {
            // Remove all default `display` logic
            item.addEventListener('mouseenter', () => {
                dropdown.style.display = 'block';
            });

            item.addEventListener('mouseleave', () => {
                dropdown.style.display = 'none';
            });
        }
    });
});

    // Render threads on page load
    renderThreads();

    // Handle thread creation
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

            // Append the new thread to the list (localStorage for simplicity)
            const threads = JSON.parse(localStorage.getItem('threads')) || [];
            threads.push(thread);
            localStorage.setItem('threads', JSON.stringify(threads));

            // Render threads
            renderThreads();

            // Clear form inputs
            document.getElementById('username').value = '';
            document.getElementById('threadTitle').value = '';
            document.getElementById('threadContent').value = '';
        }
    });
});

// Render Threads Function
function renderThreads() {
    const threads = JSON.parse(localStorage.getItem('threads')) || [];
    const threadsList = document.getElementById('threadsList');

    // Clear the threads list
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

// Display a Thread and Its Replies
function showThread(index) {
    const threads = JSON.parse(localStorage.getItem('threads')) || [];
    const thread = threads[index];

    // Display thread title and content
    document.getElementById('threadTitleDisplay').textContent = thread.title;
    document.getElementById('threadContentDisplay').textContent = thread.content;

    // Display replies
    const replyList = document.getElementById('replyList');
    replyList.innerHTML = '';
    thread.replies.forEach(reply => {
        const replyItem = document.createElement('li');
        replyItem.classList.add('reply');
        replyItem.innerHTML = `<strong>${reply.username}:</strong> ${reply.content}`;
        replyList.appendChild(replyItem);
    });

    document.getElementById('replies').style.display = 'block';

    // Handle posting a reply
    document.getElementById('replyButton').onclick = () => {
        const replyUsername = document.getElementById('replyUsername').value.trim();
        const replyContent = document.getElementById('replyContent').value.trim();

        if (replyUsername && replyContent) {
            // Add the new reply
            thread.replies.push({ username: replyUsername, content: replyContent });
            threads[index] = thread;

            // Update local storage
            localStorage.setItem('threads', JSON.stringify(threads));

            // Re-render replies
            showThread(index);

            // Clear form inputs
            document.getElementById('replyUsername').value = '';
            document.getElementById('replyContent').value = '';
        }
    };
}
