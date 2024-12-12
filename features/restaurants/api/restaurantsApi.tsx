import { mockImages, mocks } from '../mock';
import { RestaurantsResponse, TransformedRestaurant } from '@/utils/type';

export const restaurantsRequest = (
  location = '37.7749295,-122.4194155'
): Promise<RestaurantsResponse> => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location as keyof typeof mocks];
    if (!mock) {
      reject(new Error('not found'));
      return;
    }
    resolve(mock as RestaurantsResponse);
  });
};

export const restaurantsTransform = ({
  results = [],
}: RestaurantsResponse): TransformedRestaurant[] => {
  const mappedResults = results.map(restaurant => {
    const photoUrls = restaurant.photos
      ? restaurant.photos.map(() => {
          return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
        })
      : [];

    return {
      ...restaurant,
      photos: photoUrls,
      isOpenNow: restaurant.opening_hours?.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
      address: restaurant.vicinity,
    };
  });

  return mappedResults;
};

export const findRestaurantByTitle = async (
  id: string,
  location: string
): Promise<TransformedRestaurant | null> => {
  try {
    const result = await restaurantsRequest(location);
    const restaurants = result.results;
    const filteredRestaurant = restaurants.find(
      restaurant => restaurant.place_id === id
    );

    if (!filteredRestaurant) {
      return null;
    }

    const transformed = restaurantsTransform({
      html_attributions: [],
      next_page_token: '',
      results: [filteredRestaurant],
      status: '',
    });

    return transformed[0];
  } catch (error) {
    console.error('Error finding restaurant:', error);
    return null;
  }
};
