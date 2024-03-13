const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Endpoint for basic information including hostname, datetime, version, and weather data for Dhaka
app.get('/api/hello', async (req, res) => {
  const hostname = 'server1';
  const currentDatetime = new Date().toISOString().replace(/[^0-9]/g, '').slice(2, -4);
  const version = '1.0';

  // Fetch weather data for Dhaka from a free 3rd party weather API
  try {
    const weatherResponse = await axios.get('http://api.weatherapi.com/v1/current.json', {
      params: {
        key: '27ff968d5e0e4683814153933241303',
        q: 'Dhaka',
      },
    });

    const temperature = weatherResponse.data.current.temp_c;
    const tempUnit = 'c';

    const responseData = {
      hostname,
      datetime: currentDatetime,
      version,
      weather: {
        dhaka: {
          temperature,
          temp_unit: tempUnit,
        },
      },
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint for health checks
app.get('/api/health', (req, res) => {
  res.send('OK');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
