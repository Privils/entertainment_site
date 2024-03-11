import React, { useEffect, useState } from "react";
import '../App.css';
import '../mobile.css';
import video from "../components/images/getvid (42).mp4"

const Home = () => {
  const [trending_movies, setTrending_Movies] = useState([]);
  const [trending_shows, setTrending_shows] = useState([]);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const url = "https://entertainment-site-1.onrender.com/movies/top_trending/api_data";
  const trending_url = 'https://entertainment-site-1.onrender.com/watch/tv/shows/all/shows/api_data';
   const image_url = 'https://image.tmdb.org/t/p/w500/';
const mainContainer = document.querySelector('.main');
 
  
  useEffect(() => {
    trendingMovies();
    trendingTvShows();
    trendingAnimeData();
  }, []);
  //for trending movies
  function trendingMovies() {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json(); 
      })
      .then((data) => {
        setTrending_Movies(data);
         })
      .catch((error) => {
        console.error("Error fetching trending movies:", error);
      });
  }
  

  //Trending tv  shows data
  function trendingTvShows() {
    fetch(trending_url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json(); 
      })
      .then((data) => {
        setTrending_shows(data)
      })
      .catch((error) => {
        console.error("Error fetching trending tv shows:", error);
      });
  }


  //TRENDING ANIME CODE
  function trendingAnimeData() {
    fetch('https://kitsu.io/api/edge/trending/anime')
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json(); 
      })
      .then((data) => {
        setTrendingAnime(data.data || []); 
      })
      .catch((error) => {
        console.error("Error fetching trending anime:", error);
      });
  }
 
  function getColor(vote) {
    if (vote >= 8) {
      return 'green';
    } else if (vote >= 5) {
      return 'orange';
    } else {
      return 'red';
    }
  }
  
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
   <main className="main">
    <div className="banner_text">
      <p className="firstContent"></p>
    </div>
   </main>

  
      <section>
  <div className="trendingMovies">

    <h2 className="trending_name">Trending Movies</h2>

    <div className="trendinMovies_container">

      {
        trending_movies.map(trendingValues => (

        <div key={trendingValues.id} className='home'>

          <img src={`${image_url}${trendingValues.backdrop_path}`} alt={trendingValues.title}  className="movie_img" />
          <div className="movieInfo">
            <div className={`ratingCircle ${getColor(trendingValues.vote_average)}`}>
              <h4 className="rating">{trendingValues.vote_average}</h4>
            </div>
            <h2 className="movie_name">{trendingValues.title}</h2>
          </div>
        </div>
      ))
      }
    </div>
  </div>
</section>



      <section className="secondSection">

        <div className="trendingMovies">

          <h2 className="trending_name">trending tv shows</h2>

          <div className="trendinMovies_container">
          {
        trending_shows.map(trendingShowValues => (

        <div key={trendingShowValues.id} className="home">

          <img src={`${image_url}${trendingShowValues.backdrop_path}`} alt={trendingShowValues.title}  className="movie_img" />
          <div className="movieInfo">
            <div className={`ratingCircle ${getColor(trendingShowValues.vote_average)}`}>
              <h4 className="rating">{trendingShowValues.vote_average}</h4>
            </div>
            <h2 className="movie_name">{trendingShowValues.name}</h2>
          </div>
        </div>
      ))
      }
          </div>
        </div>
      </section>


      <section className="thirdSection">
        <div className="trendingMovies">
          <h2 className="trending_name">trending anime</h2>
          <div className="trendinMovies_container">
  
          {
        trendingAnime.map(trendingAnimeShow => (

        <div key={trendingAnimeShow.id} className="home">

          <img src={trendingAnimeShow.attributes.posterImage.medium} alt={trendingAnimeShow.attributes.titles.en}  className="movie_img" />
          <div className="movieInfo">
            <div className={`ratingCircle ${getColor(trendingAnimeShow.vote_average)}`}>
              <h4 className="rating">{trendingAnimeShow.attributes.averageRating}</h4>
            </div>
            <h2 className="movie_name">{trendingAnimeShow.attributes.titles.en}</h2>
          </div>
        </div>
      ))
      }


          </div>
        </div>
      </section>

    
      <footer class="footer">
        <div class="footer-container">
          <div class="footer-column">
            <h3>About Us</h3>
            <p>
              Discover the latest in entertainment! Dive into a world of
              captivating stories with our curated collection of movies, TV
              shows, anime, and books.Explore, indulge, and experience the magic
              of cinema, television, animation, and literature all in one place.
            </p>
          </div>
          <div class="footer-column">
            <h3>Quick Links</h3>
            <ul>
              <li>
              <a href="https://www.themoviedb.org/">TMDB</a>
              </li>
              <li>
                <a href="https://www.fzmovies.net/csearch.php">Fz Movies</a>
              </li>
              <li>
                <a href="https://www.wcofun.net/">watch cartoon online</a>
              </li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy;(2024) Privils Movie Hub designed and developed by Priviledge. All rights reserved with credits to <a href="https://www.themoviedb.org/">TMDB</a>.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
