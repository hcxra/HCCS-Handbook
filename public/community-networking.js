// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMEDyNBPU_65YKz6H6LG9kbF03H-hZsbs",
    authDomain: "web-dev-final-81bfa.firebaseapp.com",
    databaseURL: "https://web-dev-final-81bfa.firebaseio.com",
    projectId: "web-dev-final-81bfa",
    storageBucket: "web-dev-final-81bfa.appspot.com",
    messagingSenderId: "727644770926",
    appId: "1:727644770926:web:b66ff2ca310fc86d690c7f",
    measurementId: "G-2CZEJNEMNY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


    
document.addEventListener('DOMContentLoaded', () => {
    // Render threads on page load
    renderThreads();

    // Handle thread creation
    document.getElementById('createThreadButton').addEventListener('click', () => {
        const username = document.getElementById('username').value.trim();
        const title = document.getElementById('threadTitle').value.trim();
        const content = document.getElementById('threadContent').value.trim();

        if (username && title && content) {
            const newThread = { username, title, content, replies: [] };
            database.ref('threads').push(newThread);

            // Clear form inputs
            document.getElementById('username').value = '';
            document.getElementById('threadTitle').value = '';
            document.getElementById('threadContent').value = '';
        }
    });
});

// Render Threads Function
function renderThreads() {
    const threadsList = document.getElementById('threadsList');
    threadsList.innerHTML = '';

    database.ref('threads').on('value', snapshot => {
        threadsList.innerHTML = '';
        snapshot.forEach(threadSnapshot => {
            const thread = threadSnapshot.val();
            const threadItem = document.createElement('li');
            threadItem.innerHTML = `<strong>${thread.title}</strong> by ${thread.username}`;
            threadsList.appendChild(threadItem);
        });
    });
}



// Display a Thread and Its Replies
function showThread(threadKey) {
    const threadRef = database.ref('threads/' + threadKey);

    threadRef.once('value', snapshot => {
        const thread = snapshot.val();

        // Display Thread Title and Content
        document.getElementById('threadTitleDisplay').textContent = thread.title;
        document.getElementById('threadContentDisplay').textContent = thread.content;

        // Display Replies
        const replyList = document.getElementById('replyList');
        replyList.innerHTML = '';
        (thread.replies || []).forEach(reply => {
            const replyItem = document.createElement('li');
            replyItem.classList.add('reply');
            replyItem.innerHTML = `<strong>${reply.username}:</strong> ${reply.content}`;
            replyList.appendChild(replyItem);
        });

        document.getElementById('replies').style.display = 'block';

        // Handle Reply Submission
        document.getElementById('replyButton').onclick = () => {
            const replyUsername = document.getElementById('replyUsername').value.trim();
            const replyContent = document.getElementById('replyContent').value.trim();

            if (replyUsername && replyContent) {
                // Add Reply to Firebase
                const newReply = { username: replyUsername, content: replyContent };
                threadRef.child('replies').set([...(thread.replies || []), newReply]);

                // Re-render the thread
                showThread(threadKey);

                // Clear form inputs
                document.getElementById('replyUsername').value = '';
                document.getElementById('replyContent').value = '';
            }
        };
    });
}