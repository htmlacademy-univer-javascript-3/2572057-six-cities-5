import React from 'react';
import OfferCard from '../../components/OfferCard';

type MainPageProps = {
  offersCount: number;
};

const MainPage: React.FC<MainPageProps> = ({ offersCount }) => {
  const offers = [
    {
      id: '1a2b3c4d-1e6f-4a12-9bca-d4f5e5c12345',
      image: 'img/apartment-01.jpg',
      price: 120,
      isPremium: true,
      rating: 4,
      title: 'Beautiful & luxurious apartment at great location',
      type: 'Apartment'
    },
    {
      id: '2b3c4d5e-2f7g-4b23-9cde-d5f6e6c23456',
      image: 'img/room.jpg',
      price: 80,
      isPremium: false,
      rating: 4,
      title: 'Wood and stone place',
      type: 'Room'
    },
    {
      id: '3c4d5e6f-3g8h-4c34-9def-e6f7e7c34567',
      image: 'img/apartment-02.jpg',
      price: 132,
      isPremium: false,
      rating: 4,
      title: 'Canal View Prinsengracht',
      type: 'Apartment'
    },
    {
      id: '4d5e6f7g-4h9i-4d45-9efg-f7g8f8c45678',
      image: 'img/apartment-03.jpg',
      price: 180,
      isPremium: true,
      rating: 5,
      title: 'Nice, cozy, warm big bed apartment',
      type: 'Apartment'
    },
    {
      id: '5e6f7g8h-5i0j-4e56-9fgh-g8h9g9c56789',
      image: 'img/room.jpg',
      price: 80,
      isPremium: false,
      rating: 4,
      title: 'Wood and stone place',
      type: 'Room'
    }
  ];

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active" href="#">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'].map((city) => (
                <li className="locations__item" key={city}>
                  <a className={`locations__item-link tabs__item ${city === 'Amsterdam' ? 'tabs__item--active' : ''}`} href="#">
                    <span>{city}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                {offers.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    image={offer.image}
                    price={offer.price}
                    isPremium={offer.isPremium}
                    rating={offer.rating}
                    title={offer.title}
                    type={offer.type}
                  />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map"></section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
