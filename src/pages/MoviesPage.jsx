import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getMoviesByName } from 'utils/apiService';
import css from 'pages/MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const searchQuery = searchParams.get('query') ?? '';
    if (searchQuery === '') {
      return;
    }
    getMoviesByName(searchQuery)
      .then(setMovies)
      .catch(error => console.log(error));
  }, [searchParams]);

  const submitHandler = event => {
    event.preventDefault();
    const form = event.currentTarget;
    setSearchParams(
      form.elements.query.value !== ''
        ? { query: form.elements.query.value }
        : {}
    );
  };

  return (
    <main>
      <div className="Conteiner">
        <form onSubmit={submitHandler} className={css.SearchForm}>
          <input
            type="text"
            placeholder="Search movies..."
            name="query"
            autoComplete="off"
            className={css.SearchInput}
          ></input>
          <button type="submit" className={css.SearchButton}>
            <FaSearch className={css.SearchButtonIcon} />
          </button>
        </form>
        <ul className={css.MoviesList}>
          {movies.map(movie => {
            return (
              <li key={movie.id} className={css.MoviesListItem}>
                <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                  <img
                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                    alt={movie.title}
                  ></img>
                  <p className={css.MovieTitle}>{movie.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
};

export default MoviesPage;
