import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CommentForm from '../../components/CommentForm';
import Header from '../../components/Header';
import Map from '../../components/Map';
import OffersList from '../../components/OffersList';
import ReviewsList from '../../components/ReviewsList';
import Spinner from '../../components/Spinner';
import { useActions, useAppSelector } from '../../store/hooks';
import {
  getAllOffersSelector,
  getAuthorizationStatus,
  getCurrentOfferSelector,
  getOfferErrorSelector,
  getOfferLoadingSelector,
} from '../../store/selectors';
import type { Offer } from '../../types.d';
import { AuthorizationStatus } from '../../types/auth';

const OfferPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentOffer = useAppSelector(getCurrentOfferSelector);
  const allOffers = useAppSelector(getAllOffersSelector);
  const isLoading = useAppSelector(getOfferLoadingSelector);
  const error = useAppSelector(getOfferErrorSelector);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { fetchOffer, fetchComments, toggleFavorite } = useActions();

  useEffect(() => {
    if (id) {
      Promise.all([
        fetchOffer(id),
        fetchComments(id)
      ]).catch((err) => {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          navigate('/404');
        } else {
          // console.error('Error fetching offer:', err);
        }
      });
    }
  }, [id, fetchOffer, fetchComments, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!currentOffer) {
    return null;
  }

  // Get nearby offers from the same city
  const nearbyOffers: Offer[] = allOffers
    .filter(
      (offer) =>
        offer.city.name === currentOffer.city.name && offer.id !== currentOffer.id
    )
    .slice(0, 3);

  if (error) {
    return <Navigate to="/404" />;
  }

  const handleFavoriteClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
      return;
    }

    try {
      toggleFavorite({
        offerId: currentOffer.id,
        status: currentOffer.isFavorite ? 0 : 1,
      });
    } catch (err) {
      // console.error('Failed to toggle favorite:', err);
    }
  };

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images?.map((image, index) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={`Photo ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button
                  className={`offer__bookmark-button ${currentOffer.isFavorite ? 'offer__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${(currentOffer.rating / 5) * 100}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">3 Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max 4 adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods?.map((item) => (
                    <li key={item} className="offer__inside-item">{item}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">Angelina</span>
                  <span className="offer__user-status">Pro</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                    building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where
                    the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <ReviewsList />
              <CommentForm offerId={id ?? ''} />
            </div>
          </div>
          <section className="map container" style={{ margin: '30px auto' }}>
            <Map
              city={currentOffer.city}
              offers={[currentOffer, ...nearbyOffers]}
              selectedOffer={currentOffer}
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersList offers={nearbyOffers} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default OfferPage;
