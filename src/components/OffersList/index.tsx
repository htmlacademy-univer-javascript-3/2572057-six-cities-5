import React, { useState } from 'react';
import OfferCard from '../OfferCard';

import type { Offer } from '../../types';

type OffersListProps = {
  offers: Offer[];
}

const OffersList: React.FC<OffersListProps> = ({ offers }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [, setActiveOffer] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <article
          key={offer.id}
          className="cities__card place-card"
          onMouseEnter={() => setActiveOffer(offer.id)}
          onMouseLeave={() => setActiveOffer(null)}
        >
          <OfferCard offer={offer} />
        </article>
      ))}
    </div>
  );
};

export default OffersList;
