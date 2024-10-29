document.addEventListener('DOMContentLoaded', () => {
    
    document.querySelectorAll('.year').forEach(year => {
      year.addEventListener('click', () => {
        
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
    
    document.querySelectorAll('.nav-item').forEach(item => {
      const dropdown = item.querySelector('.dropdown');
  
      
      dropdown.style.display = 'none';
  
      
      item.addEventListener('mouseenter', () => {
        dropdown.style.display = 'block';
      });
  
      
      item.addEventListener('mouseleave', () => {
        dropdown.style.display = 'none';
      });
    });
  });
  
  