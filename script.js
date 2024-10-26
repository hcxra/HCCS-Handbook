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
  
  