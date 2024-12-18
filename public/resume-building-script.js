document.addEventListener('DOMContentLoaded', () => {
  const dropdownButtons = document.querySelectorAll('.dropdown-btn');

  dropdownButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const isActive = btn.classList.contains('active');

      // Close all open dropdowns
      dropdownButtons.forEach((button) => {
        button.classList.remove('active');
        button.nextElementSibling.style.display = 'none';
      });

      // Toggle the current dropdown
      if (!isActive) {
        btn.classList.add('active');
        content.style.display = 'block';
      }
    });
  });
});
