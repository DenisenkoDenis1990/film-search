import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdContact } from 'react-icons/io';
import { getCast } from 'utils/apiService';

export const Cast = () => {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);

  useEffect(() => {
    getCast(movieId)
      .then(setActors)
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2>CAST</h2>
      <ul>
        {actors.map(actor => {
          return (
            <li key={actor.id}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w400${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <IoMdContact />
              )}
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
