import React, { useEffect, useState } from 'react';
import '../App.css';
import '../mobile.css';

const Anime = () => {
const [anime, setAnime] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  fetchAnimeRecommendations();
}, []);

const fetchAnimeRecommendations = async () => {
  try {
    setIsLoading(true);
    const id = "1250";
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/recommendations`);
    if (!response.ok) {
      throw new Error('Failed to fetch anime recommendations');
    }
    const data = await response.json();
    setAnime(data.data);
    setIsLoading(false);
  } catch (error) {
    console.error('Error fetching anime recommendations:', error);
    setIsLoading(false);
  }
};
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
    <section className="container_section">
      <h1 className="movies_title">Anime</h1>
      <div id="item_container">
        <div className="resultscontainer">

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            anime.map((Anime, index) => (
              <div key={index} className="movies" id='movies'>
                <img src={Anime.entry.images.jpg.image_url} alt={Anime.entry.title} className="movie_img"/>
                <div className="movieInfo">

                <div className={`ratingCircle ${getColor(Anime.votes)}`}>

              <h4 className="rating">{Anime.votes}</h4>
            </div>
                  <h2 className="movie_name">{Anime.entry.title}</h2>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Anime;
