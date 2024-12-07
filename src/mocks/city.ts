import type { City } from '../types';

export const CITIES = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.856663,
      longitude: 2.351556,
      zoom: 11,
    },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37403,
      longitude: 4.88969,
      zoom: 10,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 9,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.850346,
      longitude: 4.351721,
      zoom: 9,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 9,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.227741,
      longitude: 6.773456,
      zoom: 9,
    },
  },
} as const;

export default CITIES.Amsterdam as City;
