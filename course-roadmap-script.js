document.addEventListener('DOMContentLoaded', () => {
    // Select all year elements
    document.querySelectorAll('.year').forEach(year => {
      year.addEventListener('click', () => {
        // Find the course list within this year
        const courseList = year.querySelector('.course-list');
        
        // Toggle display
        if (courseList.style.display === 'block') {
          courseList.style.display = 'none';
        } else {
          courseList.style.display = 'block';
        }
      });
    });
  });

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
  
  