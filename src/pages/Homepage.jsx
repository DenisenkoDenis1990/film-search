import { useState, useEffect } from 'react';
import { getPopularMovies } from 'utils/apiService';
import PopularMovies from 'components/PopularMovies/PopularMovies';
import css from 'pages/Homepage.module.css';
const Homepage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getPopularMovies()
      .then(setMovies)
      .catch(error => console.log(error));
  }, []);
  return (
    <main>
      <div className={css.Slider}></div>
      <PopularMovies movies={movies} />
    </main>
  );
};

export default Homepage;
