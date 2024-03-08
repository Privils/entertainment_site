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
const apiUrl = `https://api.themoviedb.org/3/genre/tv/list?language=en&api_key=${API_KEY}`;

router.get('/genre/api_data', async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        const genresData = response.data.genres; 

        // Inserting my fetched data into the database
        await insertDataIntoDatabase(genresData);

      //  console.log('Data from API inserted into database successfully');
        res.json(genresData);
    } catch (error) {
       // console.error('Error fetching data from API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function insertDataIntoDatabase(genresData) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const genre of genresData) {
            const query = {
                text: 'INSERT INTO genre (name) VALUES ($1)',
                values: [genre.name]
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