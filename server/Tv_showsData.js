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
const apiUrl = `https://api.themoviedb.org/3/trending/tv/week?language=en-US&api_key=${API_KEY}`;

router.get('/all/shows/api_data', async (req, res) => {
   try {
      const response = await axios.get(apiUrl);
      const data = response.data.results;
      await insertDataIntoDatabase(data);

     // console.log('Data from API inserted into database successfully');
      res.json(data);
   } catch (error) {
      //console.error('Error fetching data from API:', error);
      res.status(500).json({ error: 'Internal server error' });
   }
});

async function insertDataIntoDatabase(data) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const item of data) {
      const query = {
        text: 'INSERT INTO  trending_shows (title, release_date, overview) VALUES ($1, $2, $3)',
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
