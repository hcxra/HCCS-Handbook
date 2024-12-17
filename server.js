import express from 'express';
import fetch from 'node-fetch'; // Ensure node-fetch v3+ is used with "type": "module"
const app = express();
const PORT = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Route to fetch the Programming Quotes API
app.get('/api/quotes', async (req, res) => {
  try {
    const response = await fetch('https://programming-quotesapi.vercel.app/api/random');
    const data = await response.json();

    // Log the response to confirm
    console.log('API Response:', data);

    res.json(data); // Send the data to the client
  } catch (error) {
    console.error('Error fetching quote:', error.message);
    res.status(500).json({ message: 'Error fetching quote', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

