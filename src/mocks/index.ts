import offers from './offers';
import city from './city';
import type { City, Offer } from '../types';

export type Mocks = {
    offers: Offer[];
    city: City;
}

export default {
  offers,
  city
} as Mocks;
