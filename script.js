document.addEventListener('DOMContentLoaded', () => {
    // Select all dropdown toggles
    document.querySelectorAll('.nav-item').forEach(item => {
      const dropdown = item.querySelector('.dropdown');
  
      // Ensure dropdown is hidden on page load
      dropdown.style.display = 'none';
  
      // Show dropdown on mouseenter
      item.addEventListener('mouseenter', () => {
        dropdown.style.display = 'block';
      });
  
      // Hide dropdown on mouseleave
      item.addEventListener('mouseleave', () => {
        dropdown.style.display = 'none';
      });
    });
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with the class "toggle-title"
    const toggleTitles = document.querySelectorAll('.toggle-title');
  
    // Loop over each title and add an event listener
    toggleTitles.forEach(title => {
      title.addEventListener('click', function() {
        // Toggle the active class on the clicked title
        this.classList.toggle('active');
      });
    });
  });
  