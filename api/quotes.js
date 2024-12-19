import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    const response = await fetch('https://programming-quotesapi.vercel.app/api/random');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quote', error: error.message });
  }
}
