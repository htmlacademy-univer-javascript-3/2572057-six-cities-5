import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useActions, useAppSelector } from '../../store/hooks';
import { getAuthorizationStatus } from '../../store/selectors';
import type { Offer } from '../../types';
import { AuthorizationStatus } from '../../types/auth';

type OfferCardProps = {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const navigate = useNavigate();
  const { toggleFavorite } = useActions();
  const authStatus = useAppSelector(getAuthorizationStatus);

  const handleFavoriteClick = useCallback(() => {
    if (authStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    try {
      toggleFavorite({
        offerId: offer.id,
        status: offer.isFavorite ? 0 : 1,
      });
    } catch (error) {
      // console.error('Failed to toggle favorite:', error);
    }
  }, [authStatus, navigate, offer.id, offer.isFavorite, toggleFavorite]);

  return (
    <article className="cities__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width="260"
            height="200"
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''
            } button`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">
              {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
            </span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
};

export default React.memo(OfferCard);
