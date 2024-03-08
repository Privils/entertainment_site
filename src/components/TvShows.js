import React, { useEffect, useState } from "react";
import '../App.css';
import '../mobile.css';
const image_url = "https://image.tmdb.org/t/p/w500/";

const TvShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [genre, setGenre] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState(10);
  const [selectedGenre, setSelectedGenre] = useState(null);
  useEffect(() => {
    getTvShowsData();
    getGenre();
  }, []);
  //tv shows data
  async function getTvShowsData() {
    const tvUrl = "http://localhost:3030/watch/tv/shows/all/shows/api_data";
    try {
      const response = await fetch(tvUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data)
      setTvShows(data);
    } catch (error) {
      console.log("Error fetching your data:", error);
    }
  }
  //genre data
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
    const filteredTvShows = tvShows.filter(show => show.genre_ids.includes(selectedGenreId));
    setTvShows(filteredTvShows);
  }
}


  const loadMore = () => {
    setDisplayedMovies(displayedMovies + 20); 
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
  <h1 className="movies_title">TV Shows</h1>
  <div className="item_container">
    
    <div className="genres">
      <h1>Genres</h1>
      <div className="genre_container">
        {genre.map((genreValue, index) => (
          <button key={index} id="genreBtn" onClick={() => filterByGenre(genreValue.id)}>
            {genreValue.name}
          </button>
        ))}
        <button className="btn"  id="genreBtn" onClick={() => filterByGenre(null)}>All</button>
      </div>
    </div>

    <div className="resultscontainer">

      {tvShows.slice(0, displayedMovies).map((TvData, index) => (
        <div className="forOverview">
        <div key={index} className="movies">

          <img src={`${image_url}${TvData.poster_path}`} alt="" className="movie_img" />

          <div className="movieInfo">

            <div className={`ratingCircle ${getColor(TvData.vote_average)}`}>

              <h4 className="rating">{TvData.vote_average}</h4>
            </div>
            <h2 className="movie_name">{TvData.name}</h2>
            <p className="releaseDate">{TvData.first_air_date}</p>
          </div>
        </div>
        <p className="overview">{TvData.overview}</p>
</div>

      ))}
    </div>
  </div>
  <div className="loadmore">
            <button className="load_more_btn" onClick={loadMore}>
              Load More
            </button>
        </div>
</section>

    </>
  );
};

export default TvShows;
