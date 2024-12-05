// src/pages/Main/index.tsx
import React, { useEffect, useState } from 'react';
import Map from '../../components/Map';
import OfferCard from '../../components/OfferCard';
import mocks from '../../mocks';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { getCitySelector, getOffersSelector } from '../../store/selectors';
import type { Cities, Offer } from '../../types';

import { NavLink } from 'react-router-dom';
import CitiesList from '../../components/CitiesList';
import SortingOptions from '../../components/SortingOptions';
import './style.css';

type MainPageProps = {
  cities: Cities[];
}

const MainPage: React.FC<MainPageProps> = ({ cities }) => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const cityOffers: Offer[] = useAppSelector(getOffersSelector);
  const currentCity = useAppSelector(getCitySelector);
  const { getOffers } = useActions();

  useEffect(() => {
    getOffers(currentCity);
  }, [getOffers, currentCity]);

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <NavLink className="header__logo-link header__logo-link--active" to={'/'}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink>
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
            <CitiesList citiesNames={cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {currentCity}</b>
              <SortingOptions />
              <div className="cities__places-list places__list tabs__content">
                {cityOffers.map((offer) => (
                  <div
                    key={offer.id}
                    onMouseEnter={() => setSelectedOffer(offer)}
                    onMouseLeave={() => setSelectedOffer(null)}
                  >
                    <OfferCard offer={offer} />
                  </div>
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={mocks.city} offers={cityOffers} selectedOffer={selectedOffer} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>);
};

export default MainPage;
