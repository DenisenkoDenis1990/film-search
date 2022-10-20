import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from 'utils/apiService';
import css from '../Reviews/Reviews.module.css';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(movieId)
      .then(setReviews)
      .catch(function (error) {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.ReviewsWrapper}>
      <h2 className={css.Title}>REVIEWS</h2>
      {reviews === [] ? (
        <p className={css.AuthorName}>There is no reviews</p>
      ) : (
        reviews.map(({ author, content, updated_at }) => {
          return (
            <div className={css.ReviewWrapper}>
              <p className={css.AuthorName}>{author}</p>
              <p className={css.ReviewText}>{content}</p>
              <p className={css.ReviewDate}>{updated_at}</p>
            </div>
          );
        })
      )}
    </div>
  );
};
