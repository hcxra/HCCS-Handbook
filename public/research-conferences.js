document.addEventListener('DOMContentLoaded'), () => {
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
}