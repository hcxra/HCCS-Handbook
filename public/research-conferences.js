document.addEventListener('DOMContentLoaded', () => {
    // Handle dropdown menus
    document.querySelectorAll('.nav-item').forEach(item => {
        const dropdown = item.querySelector('.dropdown');

        // Ensure dropdown is hidden on page load
        if (dropdown) {
            dropdown.style.display = 'none';
        }

        // Show dropdown on mouseenter
        item.addEventListener('mouseenter', () => {
            if (dropdown) dropdown.style.display = 'block';
        });

        // Hide dropdown on mouseleave
        item.addEventListener('mouseleave', () => {
            if (dropdown) dropdown.style.display = 'none';
        });
    });

    // Handle fetching conference data
    async function fetchConferences() {
        const conferenceList = document.getElementById('conference-list');
        try {
            const response = await fetch('https://confs.tech/api');
            const conferences = await response.json();
            conferenceList.innerHTML = '<ul>' +
                conferences.map(conference => `<li>${conference.name} - ${conference.date}</li>`).join('') +
                '</ul>';
        } catch (error) {
            console.error("Error fetching conferences:", error);
            conferenceList.innerHTML = '<p>Error loading conferences. Please try again later.</p>';
        }
    }
    document.addEventListener('DOMContentLoaded', fetchConferences);