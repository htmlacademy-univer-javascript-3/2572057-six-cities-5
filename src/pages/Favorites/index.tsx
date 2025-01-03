import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useActions, useAppSelector } from '../../store/hooks';
import { getAuthorizationStatus, getFavoritesSelector } from '../../store/selectors';
import type { Offer } from '../../types';
import { AuthorizationStatus } from '../../types/auth';

const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector(getFavoritesSelector);
  const authStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();
  const { toggleFavorite } = useActions();

  const handleFavoriteClick = (offer: Offer) => {
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
      // Handle error if needed
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  const offersByCity = favorites.reduce<{ [key: string]: Offer[] }>((acc, offer) => {
    if (offer.isFavorite) {
      const cityName = offer.city.name;
      if (!acc[cityName]) {
        acc[cityName] = [];
      }
      acc[cityName].push(offer);
    }
    return acc;
  }, {});

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.entries(offersByCity).map(([cityName, cityOffers]) => (
                <li className="favorites__locations-items" key={cityName}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="/">
                        <span>{cityName}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <article className="favorites__card place-card" key={offer.id}>
                        {offer.isPremium && (
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div>
                        )}
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <Link to={`/offer/${offer.id}`}>
                            <img
                              className="place-card__image"
                              src={offer.previewImage}
                              width="150"
                              height="110"
                              alt={offer.title}
                            />
                          </Link>
                        </div>
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{offer.price}</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>
                            <button
                              className={`place-card__bookmark-button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''
                              } button`}
                              type="button"
                              onClick={() => handleFavoriteClick(offer)}
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
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
};

export default FavoritesPage;
