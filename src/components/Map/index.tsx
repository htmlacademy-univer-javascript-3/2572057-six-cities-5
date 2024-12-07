import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import type { Offer, City } from '../../types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: Offer[];
  selectedOffer: Offer | null;
};

const iconUrls = {
  regular: 'img/pin.svg',
  selected: 'img/pin-active.svg'
} as const;

const regularIcon = new Icon({
  iconUrl: iconUrls.regular,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedIcon = new Icon({
  iconUrl: iconUrls.selected,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Map: React.FC<MapProps> = ({ city, offers, selectedOffer }: MapProps) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        city.location.zoom
      );

      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOffer && offer.id === selectedOffer.id ? selectedIcon : regularIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, city]);

  return <div style={{ height: '500px' }} ref={mapRef}></div>;
};

export default Map;
