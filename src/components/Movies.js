import React, { useEffect, useState } from "react";
import '../App.css';
import '../mobile.css';


const image_url = "https://image.tmdb.org/t/p/w500/";

const Movies = ({ listType }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [genre, setGenre] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState(12);

  useEffect(() => {
    fetchMovies();
    getGenre();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "http://localhost:3030/movie/list/moviedata/api_data"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError("Failed to fetch data");
    }
  };

  const getGenre = async () => {
    const genreUrl = "http://localhost:3030/data/genre/api_data";
    try {
      const res = await fetch(genreUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch genres");
      }
      const data = await res.json();
      console.log(data)
      setGenre(data); 
    } catch (error) {
      console.error("Error fetching genre data:", error);
    }
  };

//selected genre data
function filterByGenre(selectedGenreId) {
  if (selectedGenreId === null) {
    setDisplayedMovies(10); 
  } else {
    const filteredTvShows = movies.filter(show => show.genre_ids.includes(selectedGenreId));
    setMovies(filteredTvShows);
  }
}

  const loadMore = () => {
    setDisplayedMovies(displayedMovies + 12); 
  };
  function getColor(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }
  return (
    <>
     <section className="container_section">
  <h1 className="movies_title">{listType} movies</h1>
  {error && <p className="error">{error} please refresh page!!</p>}
  <div className="item_container">
    <div className="genres">
      <h1>Genres</h1>
      <div className="genre_container">
        {genre.map((genreValue, index) => (
          <button key={index} id="genreBtn" onClick={() => filterByGenre(genreValue.id)}>
            {genreValue.name}
          </button>
        ))}
        <button className="btn" id="genreBtn" onClick={() => filterByGenre(null)}>All</button>
      </div>
    </div>
    <div className="resultscontainer">
      {movies.slice(0, displayedMovies).map((movie, index) => (
<div className="forOverview">
        <div key={index} className="movies">
          <img
            src={`${image_url}${movie.poster_path}`}
            alt=""
            className="movie_img"
          />

          <div className="movieInfo">
            <div
              className={`ratingCircle ${getColor(movie.vote_average)}`}
            >
              <h4 className="rating">{movie.vote_average}</h4>
            </div>
            <h2 className="movie_name">{movie.title}</h2>
            <p className="releaseDate">{movie.release_date}</p>
          </div>
        </div>
        <p className="overview">{movie.overview}</p>
      
</div>
      ))}
    </div>
  </div>

  <div className="loadmore">
    {displayedMovies < movies.length && (
      <button className="load_more_btn" onClick={loadMore}>
        Load More
      </button>
    )}
  </div>
</section>

    </>
  );
};

export default Movies;
