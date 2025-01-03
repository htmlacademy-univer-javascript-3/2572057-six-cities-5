// src/pages/Main/index.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Map from '../../components/Map';
import OfferCard from '../../components/OfferCard';
import { CITIES } from '../../mocks/city';
import { useActions, useAppSelector } from '../../store/hooks.ts';
import { getCitySelector, getLoadingSelector, getOffersSelector } from '../../store/selectors';
import type { Cities, Offer } from '../../types';

import CitiesList from '../../components/CitiesList';
import Header from '../../components/Header/index.tsx';
import MainEmpty from '../../components/MainEmpty';
import SortingOptions from '../../components/SortingOptions';
import Spinner from '../../components/Spinner';
import './style.css';

type MainPageProps = {
  cities: Cities[];
}

const MainPage: React.FC<MainPageProps> = ({ cities }) => {
  const location = useLocation() as {state: {city: string}};
  const { changeCity, fetchOffers } = useActions();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const cityOffers = useAppSelector(getOffersSelector);
  const currentCity = useAppSelector(getCitySelector);
  const isLoading = useAppSelector(getLoadingSelector);

  useEffect(() => {
    if (location.state?.city) {
      const cityName = location.state.city;
      const selectedCity = CITIES[cityName as keyof typeof CITIES];
      if (selectedCity) {
        changeCity(selectedCity);
      }
    }
  }, [location.state, changeCity]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList citiesNames={cities} />
          </section>
        </div>
        {cityOffers.length === 0 ? (
          <MainEmpty />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
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
                  <Map city={currentCity} offers={cityOffers} selectedOffer={selectedOffer} />
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>);
};

export default MainPage;
