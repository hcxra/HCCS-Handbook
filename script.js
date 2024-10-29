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

document.addEventListener("DOMContentLoaded", function() {
  
  const toggleTitles = document.querySelectorAll('.toggle-title');

  
  toggleTitles.forEach(title => {
    title.addEventListener('click', function() {
      
      this.classList.toggle('active');
    });
  });
});
