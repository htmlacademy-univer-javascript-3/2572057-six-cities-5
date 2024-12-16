import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { getCommentsLoadingSelector, getCommentsSelector } from '../../store/selectors';
import Review from '../Review';
import Spinner from '../Spinner';

const ReviewsList: React.FC = () => {
  const reviews = useAppSelector(getCommentsSelector);
  const isLoading = useAppSelector(getCommentsLoadingSelector);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews?.length || 0}</span>
      </h2>
      <ul className="reviews__list">
        {Array.isArray(reviews) && reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
};

export default ReviewsList;
