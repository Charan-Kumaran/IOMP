const express = require('express');
const axios = require('axios');

const app = express();
const IP_REPUTATION_API = 'https://ipqualityscore.com/api/json/ip/4O1F84t61x3aaq9RQnmdo8WvwzBlY1oU/';

app.get('/api/reputation/:ip', async (req, res) => {
  const { ip } = req.params;
  try {
    const response = await axios.get(`${IP_REPUTATION_API}${ip}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching IP data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});