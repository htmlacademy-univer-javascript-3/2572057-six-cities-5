import React, {useState} from 'react';
import OfferCard from '../OfferCard';

import type { Offer } from '../../types';

type OffersListProps = {
    offers: Offer[];
}

const OffersList: React.FC<OffersListProps> = ({offers}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeOffer, setActiveOffer] = useState<string | null>(null);

  return (
    <div className="places__list">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={() => setActiveOffer(offer.id)}
          onMouseLeave={() => setActiveOffer(null)}
        >
          <OfferCard offer={offer} />
        </div>
      ))}
    </div>
  );
};

export default OffersList;
