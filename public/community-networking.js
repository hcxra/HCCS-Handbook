import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Wait for Firebase to be initialized
const waitForDb = () =>
  new Promise((resolve) => {
    const interval = setInterval(() => {
      if (window.firebaseDb) {
        clearInterval(interval);
        resolve(window.firebaseDb);
      }
    }, 50); // Check every 50ms
  });

waitForDb().then((db) => {
  // Now `db` is guaranteed to be initialized
  renderThreads(db);

  // Handle thread creation
  document.getElementById('createThreadButton').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const title = document.getElementById('threadTitle').value.trim();
    const content = document.getElementById('threadContent').value.trim();

    if (username && title && content) {
      const threadRef = ref(db, 'threads');
      console.log('Attempting to write thread to firebase:', { username, title, content});
      push(threadRef, {
        username,
        title,
        content,
        replies: []
      }).then(() => {
        console.log('Thread created successfully!');
      }).catch((error) => {
        console.error('Error creating thread:', error);
      });

      // Clear form inputs
      document.getElementById('username').value = '';
      document.getElementById('threadTitle').value = '';
      document.getElementById('threadContent').value = '';
    } else {
      alert('All fields are required to create a thread.');
    }
  });
});

// Render Threads Function
function renderThreads(db) {
  const threadsList = document.getElementById('threadsList');
  threadsList.innerHTML = '';

  const threadsRef = ref(db, 'threads');
  onValue(threadsRef, (snapshot) => {
    threadsList.innerHTML = ''; // Clear the list
    snapshot.forEach((threadSnapshot) => {
      const threadKey = threadSnapshot.key;
      const thread = threadSnapshot.val();
      const threadItem = document.createElement('li');
      threadItem.innerHTML = `<strong>${thread.title}</strong> by ${thread.username}`;
      threadItem.addEventListener('click', () => showThread(db, threadKey));
      threadsList.appendChild(threadItem);
    });
  });
}

// Display a Thread and Its Replies
function showThread(db, threadKey) {
  const threadRef = ref(db, `threads/${threadKey}`);

  onValue(threadRef, (snapshot) => {
    const thread = snapshot.val();

    if (thread) {
      document.getElementById('threadTitleDisplay').textContent = thread.title;
      document.getElementById('threadContentDisplay').textContent = thread.content;

      // Display Replies
      const replyList = document.getElementById('replyList');
      replyList.innerHTML = '';
      (thread.replies || []).forEach((reply) => {
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
          const newReply = { username: replyUsername, content: replyContent };
          const updatedReplies = [...(thread.replies || []), newReply];

          set(ref(db, `threads/${threadKey}/replies`), updatedReplies)
            .then(() => {
              console.log('Reply added successfully!');
            })
            .catch((error) => {
              console.error('Error adding reply:', error);
            }); // <-- Closing the catch block properly here

          // Clear form inputs
          document.getElementById('replyUsername').value = '';
          document.getElementById('replyContent').value = '';
        } else {
          alert('Both username and reply content are required.');
        }
      };
    } else {
      console.error('Thread data is not available.');
    }
  });
}