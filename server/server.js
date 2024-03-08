const express = require('express');
const app = express();
const movieRouter = require('./movieData');
const trendingTvShowsRouter = require('./Tv_showsData');
const movieListRouter = require('./movieListData');
const genreDataRouter = require('./GenreData');
const cors = require('cors');

app.use(express.json());
app.use(cors()); 

app.use('/movies/top_trending', movieRouter);
app.use('/watch/tv/shows', trendingTvShowsRouter);
app.use('/movie/list', movieListRouter);
app.use('/data', genreDataRouter);

app.listen(3030, '0.0.0.0', () => {
    console.log('Listening on port 3030');
});

console.log('Server setup completed. Listening on port 3030.');