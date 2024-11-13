import React, { useState } from 'react';

const CommentRating = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly'
} as const;

const CommentForm: React.FC = () => {
  type State = Partial<{
    comment: string;
    rating: number;
  }>;

  const [state, _setState] = useState({
    comment: '',
    rating: 0
  });
  const setState = (data: State) => _setState({...state, ...data});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line no-console
    console.log(state);
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.keys(CommentRating).map((star) => (
          <React.Fragment key={star}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={star}
              id={`${star}-stars`}
              type="radio"
              onChange={() => setState({rating: Number.parseInt(star, 10)})}
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
        value={state.comment}
        onChange={(e) => setState({comment: e.target.value})}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={state.comment.length < 50 || state.rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
