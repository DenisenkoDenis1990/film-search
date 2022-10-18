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
        <Link to={backUrlPath.current}>
          <IoMdArrowRoundBack />
        </Link>
        <div></div>
        <h1>{film.title}</h1>
        <p>Release Date:{film.release_date}</p>
        <p>
          Duration:{Math.floor(film.runtime / 60)} hrs {film.runtime % 60} min
        </p>

        <ul>
          {film.genres.map(genre => {
            return <li key={genre.id}>{genre.name}</li>;
          })}
        </ul>

        <p>{film.overview}</p>
      </section>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Outlet></Outlet>
    </main>
  );
};

export default MovieDetailsPage;
