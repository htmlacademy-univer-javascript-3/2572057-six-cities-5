import React from 'react';
import type { Review as ReviewType } from '../../types';
import Review from '../Review';

type ReviewsListProps = {
    reviews: ReviewType[];
}

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => (
  <section className="offer__reviews reviews">
    <h2 className="reviews__title">
            Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
    </h2>
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </ul>
  </section>
);

export default ReviewsList;
