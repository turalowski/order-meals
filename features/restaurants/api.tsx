import { mockImages, mocks } from './mock';

export const restaurantsRequest = (location = '37.7749295,-122.4194155') => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location as keyof typeof mocks];
    if (!mock) {
      reject('not found');
    }
    resolve(mock);
  });
};

interface Restaurant {
  opening_hours?: {
    open_now: boolean;
  };
  business_status?: string;
  photos: string[];
}

interface TransformResults {
  results: Restaurant[];
}

export const restaurantsTransform = ({ results = [] }: TransformResults) => {
  const mappedResults = results.map((restaurant: Restaurant) => {
    restaurant.photos = restaurant.photos.map(p => {
      return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
    });
    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return mappedResults;
};
