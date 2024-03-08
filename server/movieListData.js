const express = require('express');
const router = express.Router();
const axios = require('axios');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const API_KEY = process.env.API_KEY;
const listTypes = ['popular', 'top_rated', 'now_playing', 'upcoming'];
const BASE_URL = 'https://api.themoviedb.org/3/movie';

router.get('/moviedata/api_data', async (req, res) => {
  try {
    // Array to store promises for each API request
    const requests = listTypes.map(async (listType) => {
      const apiUrl = `${BASE_URL}/${listType}?language=en-US&page=1&api_key=${API_KEY}`;
      const response = await axios.get(apiUrl);
      return response.data.results;
    });

    // Waiting for all API requests to finish
    const movieListsData = await Promise.all(requests);

    // to Flatten movieListsData array
    const allMoviesData = movieListsData.flat();

    await insertDataIntoDatabase(allMoviesData);

    res.json(allMoviesData);
  } catch (error) {
    console.error('Error fetching movie data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function insertDataIntoDatabase(data) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const item of data) {
      const query = {
        text: 'INSERT INTO moviesList (title, release_date, overview) VALUES ($1, $2, $3)',
        values: [item.title, item.release_date, item.overview]
      };

      await client.query(query);
    }

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

module.exports = router;
