document.addEventListener('DOMContentLoaded', () => {
  // Dropdown Menu
  document.querySelectorAll('.nav-item').forEach(item => {
    const dropdown = item.querySelector('.dropdown');
    item.addEventListener('mouseenter', () => {
      dropdown.style.display = 'block';
    });
    item.addEventListener('mouseleave', () => {
      dropdown.style.display = 'none';
    });
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
  });
});

