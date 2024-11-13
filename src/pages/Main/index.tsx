// src/pages/Main/index.tsx
import React from 'react';
import OfferCard from '../../components/OfferCard';
import Map from '../../components/Map';
import type { Offer } from '../../types';
import mocks from '../../mocks';

import './style.css';

type MainPageProps = {
  offersCount: number;
  offers: Offer[];
};

const MainPage: React.FC<MainPageProps> = ({ offersCount, offers }) => (
  <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active" href="#">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
        </div>
      </div>
    </header>

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersCount} places to stay in Amsterdam</b>
            <div className="cities__places-list places__list tabs__content">
              {offers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map city={mocks.city} offers={offers} />
            </section>
          </div>
        </div>
      </div>
    </main>
  </div>
);

export default MainPage;
