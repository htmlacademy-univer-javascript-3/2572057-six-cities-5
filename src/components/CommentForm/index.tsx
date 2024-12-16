import React, { FormEvent, useState } from 'react';
import { useActions, useAppSelector } from '../../store/hooks';
import { getAuthorizationStatus } from '../../store/selectors';
import { AuthorizationStatus } from '../../types/auth';

const CommentRating = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly'
} as const;

type CommentFormProps = {
  offerId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ offerId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { postComment } = useActions();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (comment.length >= 50 && rating > 0) {
      setIsSubmitting(true);
      try {
        postComment({
          offerId,
          commentData: { comment, rating }
        });
        setComment('');
        setRating(0);
      } catch (error) {
        // console.error('Failed to post comment:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (authorizationStatus !== AuthorizationStatus.Auth) {
    return null;
  }

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.keys(CommentRating).reverse().map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              checked={rating === Number(star)}
              onChange={() => setRating(Number(star))}
            />
            <label
              htmlFor={`${star}-stars`}
              className="reviews__rating-label form__rating-label"
              title={CommentRating[star as keyof typeof CommentRating]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={comment.length < 50 || rating === 0 || isSubmitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
