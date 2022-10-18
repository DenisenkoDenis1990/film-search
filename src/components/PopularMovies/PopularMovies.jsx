import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const PopularMovies = ({ movies }) => {
  const location = useLocation();
  console.log(location);
  return (
    <div>
      <ul>
        {movies.map(({ id, poster_path, title }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                <img
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
                  alt={title}
                ></img>
                <p>{title}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PopularMovies;
