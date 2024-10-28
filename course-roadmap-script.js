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
  