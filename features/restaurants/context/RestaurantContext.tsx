import React, { useState, createContext, useEffect, useContext } from 'react';
import { restaurantsRequest, restaurantsTransform } from '../api/restaurantsApi';
import { LocationContext } from './LocationContext';
import { RestaurantsResponse, TransformedRestaurant } from '@/utils/type'

interface RestaurantsContextType {
  restaurants: TransformedRestaurant[];
  isLoading: boolean;
  error: string | null;
}

export const RestaurantsContext = createContext<RestaurantsContextType>({
  restaurants: [],
  isLoading: false,
  error: null,
});

export const RestaurantsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [restaurants, setRestaurants] = useState<TransformedRestaurant[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { location } = useContext(LocationContext);

  const retrieveRestaurants = async (location: string) => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const result: RestaurantsResponse = await restaurantsRequest(location);
        setRestaurants(restaurantsTransform(result));
        setIsLoading(false);
      }, 4000);
    } catch (err) {
      setIsLoading(false);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    }
  };

  useEffect(() => {
    if(location) {
      const locationString = `${location?.lat},${location?.lng}`
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};
