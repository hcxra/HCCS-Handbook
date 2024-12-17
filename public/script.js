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

document.addEventListener('DOMContentLoaded', () => {
  // Function to fetch the quote
  async function fetchQuote() {
    try {
      const response = await fetch('/api/quotes');
      const data = await response.json();

      if (data.quote && data.author) {
        // Save the fetched quote and today's date in Local Storage
        localStorage.setItem('quote', data.quote);
        localStorage.setItem('author', data.author);
        localStorage.setItem('quoteDate', new Date().toDateString());

        // Display the quote
        displayQuote(data.quote, data.author);
      } else {
        displayError();
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      displayError();
    }
  }

  // Function to display a quote
  function displayQuote(quote, author) {
    document.getElementById('quote-text').innerText = `"${quote}"`;
    document.getElementById('quote-author').innerText = `- ${author}`;
  }

  // Function to display an error message
  function displayError() {
    document.getElementById('quote-text').innerText = 'Failed to load quote.';
    document.getElementById('quote-author').innerText = '';
  }

  // Check Local Storage for a quote
  const storedQuote = localStorage.getItem('quote');
  const storedAuthor = localStorage.getItem('author');
  const storedDate = localStorage.getItem('quoteDate');
  const today = new Date().toDateString();

  if (storedQuote && storedDate === today) {
    // If a quote exists for today, display it
    displayQuote(storedQuote, storedAuthor);
  } else {
    // Otherwise, fetch a new quote
    fetchQuote();
  }
});



