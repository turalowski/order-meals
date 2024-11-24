import React, { useState, createContext, useEffect } from 'react';

import { restaurantsRequest, restaurantsTransform } from './api';

interface RestaurantsContextType {
  restaurants: any[];
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
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const retrieveRestaurants = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const result: any = await restaurantsRequest();
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
    retrieveRestaurants();
  }, []);

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
