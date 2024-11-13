import { useEffect } from 'react';
import L from 'leaflet';

import type {Offer} from '../../types';

type MapProps = {
  offers: Offer[];
};

const Map: React.FC<MapProps> = ({ offers }: MapProps) => {
  useEffect(() => {
    const map = L.map('map', {
      center: [52.35514938496378, 4.673877537499948],
      zoom: 8,
      scrollWheelZoom: false,
    });

    // добавление слоя карты от OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // добавление маркеров для предложений
    offers.forEach((offer) => {
      L.marker([offer.location.latitude, offer.location.longitude]).addTo(map)
        .bindPopup(`Offer ID: ${offer.id}`);
    });

    return () => {
      map.remove(); // очистка карты при размонтировании компонента
    };
  }, [offers]);

  // return <div id="map" className="cities__map" style={{ height: '100%', width: '100%' }} />;
  return <div id="map" style={{ height: '100%', width: '100%' }} />;
};

export default Map;
