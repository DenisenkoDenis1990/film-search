import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdContact } from 'react-icons/io';
import { getCast } from 'utils/apiService';
import css from '../Cast/Cast.module.css';

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
    <div className={css.CastWrapper}>
      <h2 className={css.Title}>CAST</h2>
      <ul className={css.ActorsList}>
        {actors.map(actor => {
          return (
            <li key={actor.id} className={css.ActorsListItem}>
              <div className={css.ActorWrapper}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w400${actor.profile_path}`}
                    alt={actor.name}
                    className={css.ActorImage}
                  />
                ) : (
                  <img
                    src={`https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930`}
                    alt={actor.name}
                    className={css.ActorImage}
                  />
                )}
                <p className={css.ActorName}>{actor.name}</p>
                <p className={css.ActorCharacter}>{actor.character}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
