import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import css from '../PopularMovies/PopularMovies.module.css';
const PopularMovies = ({ movies }) => {
  const location = useLocation();
  console.log(location);
  return (
    <section>
      <ul className={css.PopularMoviesList}>
        {movies.map(({ id, poster_path, title }) => {
          return (
            <li key={id} className={css.PopularMovie}>
              <Link
                to={`/movies/${id}`}
                state={{ from: location }}
                className={css.PopularMovieLink}
              >
                <img
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
                  alt={title}
                  className={css.PopularMoviePoster}
                ></img>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default PopularMovies;
