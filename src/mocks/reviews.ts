import type { Review } from '../types';

export default [
  {
    id: '72f08b08-50f7-420a-9503-2591a9007b56',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 4,
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2024-03-19T21:00:00.000Z',
  },
  {
    id: 'd9214372-df02-4dc3-8164-4f391f9b26f0',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true,
    },
    rating: 5,
    comment:
      'Beautiful location, very comfortable apartment with all necessary amenities.',
    date: '2024-03-18T21:00:00.000Z',
  },
] as Review[];
