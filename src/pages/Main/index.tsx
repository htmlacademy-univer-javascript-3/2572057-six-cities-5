// src/pages/Main/index.tsx
import React, {useEffect} from 'react';
import OfferCard from '../../components/OfferCard';
import Map from '../../components/Map';
import type { Offer, Cities } from '../../types';
import mocks from '../../mocks';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { getCitySelector, getOffersSelector } from '../../store/selectors';

import './style.css';
import { CitiesList } from '../../components/CitiesList';

type MainPageProps = {
  cities: Cities[];
};

const MainPage: React.FC<MainPageProps> = ({ cities }) => {
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
            <CitiesList citiesNames={cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{cityOffers.length} places to stay in {currentCity}</b>
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
                {cityOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={mocks.city} offers={cityOffers} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>);
};

export default MainPage;
