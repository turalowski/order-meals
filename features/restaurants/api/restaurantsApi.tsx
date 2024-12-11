import { mockImages, mocks } from '../mock';

export interface RestaurantType {
  name: string;
  opening_hours?: {
    open_now: boolean;
  };
  business_status?: string;
  photos: string[];
  vicinity: string;
  address: string;
  isOpenNow: boolean | undefined;
  isClosedTemporarily: boolean | undefined;
  rating: number;
}

interface TransformResults {
  results: RestaurantType[];
}

export const restaurantsRequest = (
  location = '37.7749295,-122.4194155'
): Promise<{
  results: RestaurantType[];
}> => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location as keyof typeof mocks];
    if (!mock) {
      reject('not found');
      return;
    }
    resolve(mock as never);
  });
};

export const restaurantsTransform = ({
  results = [],
}: TransformResults): RestaurantType[] => {
  const mappedResults = results.map(restaurant => {
    restaurant.photos = restaurant.photos.map(p => {
      return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
    });

    return {
      ...restaurant,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
      address: restaurant.vicinity,
    };
  });

  return mappedResults;
};

export const findRestaurantByTitle = async (
  title: string,
  location: string
): Promise<RestaurantType | null> => {
  const result = await restaurantsRequest(location);
  const restaurants = result.results;
  const filteredRestaurant = restaurants.find(restaurant =>
    restaurant.name.toLowerCase().includes(title.toLowerCase())
  );

  console.log('filteredRestaurant', filteredRestaurant);

  if (!filteredRestaurant) {
    return null;
  }

  const transformed = restaurantsTransform({
    results: [filteredRestaurant],
  });

  console.log('aaa', transformed);
  return transformed[0];
};
