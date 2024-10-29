
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.style.display = 'none';
  });
  
  
  document.querySelectorAll('.nav-item').forEach(item => {
    const dropdown = item.querySelector('.dropdown');
  
    
    item.addEventListener('mouseenter', () => {
      if (dropdown) dropdown.style.display = 'block';
    });
  
    
    item.addEventListener('mouseleave', () => {
      if (dropdown) dropdown.style.display = 'none';
    });
  });
    

document.querySelectorAll('.expandable-title').forEach(title => {
    title.addEventListener('click', () => {
      const box = title.closest('.box');
      box.classList.toggle('open'); // Toggles the 'open' class
    });
  });
  