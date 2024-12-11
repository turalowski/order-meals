import { mockImages, mocks } from '../mock';
import { RestaurantsResponse, TransformedRestaurant} from '@/utils/type'

export const restaurantsRequest = (
  location = '37.7749295,-122.4194155'
): Promise<RestaurantsResponse> => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location as keyof typeof mocks];
    if (!mock) {
      reject('not found');
      return;
    }
    resolve(mock as RestaurantsResponse);
  });
};

export const restaurantsTransform = ({
  results = [],
}: RestaurantsResponse): TransformedRestaurant[] => {
  const mappedResults = results.map(restaurant => {
    const photoUrls = restaurant.photos ? restaurant.photos.map(() => {
      return mockImages[Math.ceil(Math.random() * mockImages.length - 1)];
    }) : [];

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
  title: string,
  location: string
): Promise<TransformedRestaurant | null> => {
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
    html_attributions: [],
    next_page_token: '',
    results: [filteredRestaurant],
    status: ''
  });

  console.log('aaa', transformed);
  return transformed[0];
};
