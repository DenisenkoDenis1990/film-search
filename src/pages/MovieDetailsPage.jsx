import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { getMovieDetails } from 'utils/apiService';
import css from 'pages/MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [film, setFilm] = useState(null);
  const location = useLocation();
  const backUrlPath = useRef(location.state?.from ?? '/');
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails(movieId)
      .then(setFilm)
      .catch(error => {
        console.log(error);
        navigate(backUrlPath.current, { replace: true });
      });
  }, [movieId, navigate]);
  if (!film) {
    return;
  }

  console.log(film.production_companies);
  return (
    <main>
      <section>
        <div className={css.MovieDetailsContainer}>
          <div
            className={css.FilmPoster}
            style={{
              backgroundImage: `linear-gradient(
    180deg,
    rgba(43, 43, 47, 0) 0%,
    #1a1a1d 100%
  ), url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${film.backdrop_path})`,
            }}
          >
            <Link to={backUrlPath.current}>
              <IoMdArrowRoundBack className={css.GoBackButton} />
            </Link>
          </div>
          <h1 className={css.FilmTitle}>{film.title}</h1>
          <p className={css.Info}>Release Date: {film.release_date}</p>
          <p className={css.Info}>
            Duration: {Math.floor(film.runtime / 60)} hrs {film.runtime % 60}{' '}
            min
          </p>

          <ul className={css.GenresList}>
            {film.genres.map(genre => {
              return (
                <li key={genre.id} className={css.Genre}>
                  {genre.name}
                </li>
              );
            })}
          </ul>

          <p className={css.FilmOverview}>{film.overview}</p>
        </div>
      </section>
      <div className={css.MovieDetailsContainer}>
        <ul className={css.OptionsList}>
          <li className={css.Option}>
            <Link to="cast">Cast</Link>
          </li>
          <li className={css.Option}>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
        <Outlet></Outlet>
      </div>
    </main>
  );
};

export default MovieDetailsPage;
