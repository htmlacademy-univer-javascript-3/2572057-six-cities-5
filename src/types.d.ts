export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: string;
  location: Location;
};

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Review = {
  id: string;
  user: User;
  rating: number;
  comment: string;
  date: string;
};

export const Endpoints = {
  root: '/',
  login: '/login',
  favorites: '/favorites',
  'offer/:id': '/offer/:id',
  '*': '*',
} as const;

export const CitiesEnum = {
  Paris: 'Paris',
  Amsterdam: 'Amsterdam',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export type Cities = (typeof CitiesEnum)[keyof typeof CitiesEnum];
