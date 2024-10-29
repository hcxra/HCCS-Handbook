// Ensure all dropdowns are hidden on page load
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.style.display = 'none';
  });
  
  // Add hover event listeners to each navigation item
  document.querySelectorAll('.nav-item').forEach(item => {
    const dropdown = item.querySelector('.dropdown');
  
    // Show dropdown on mouseenter
    item.addEventListener('mouseenter', () => {
      if (dropdown) dropdown.style.display = 'block';
    });
  
    // Hide dropdown on mouseleave
    item.addEventListener('mouseleave', () => {
      if (dropdown) dropdown.style.display = 'none';
    });
  });
    
// Toggle the visibility of hidden content in each box with a single click
document.querySelectorAll('.expandable-title').forEach(title => {
    title.addEventListener('click', () => {
      const box = title.closest('.box');
      box.classList.toggle('open'); // Toggles the 'open' class
    });
  });
  