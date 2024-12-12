import React, { createContext, useState, useContext, ReactNode } from 'react';
import { TransformedRestaurant } from '@/utils/type';

interface FavouritesContextType {
  favourites: TransformedRestaurant[];
  addToFavourites: (restaurant: TransformedRestaurant) => void;
  removeFromFavourites: (restaurant: TransformedRestaurant) => void;
}

const FavouritesContext = createContext<FavouritesContextType>({
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
});

interface FavouritesContextProviderProps {
  children: ReactNode;
}

export const FavouritesContextProvider = ({ children }: FavouritesContextProviderProps) => {
  const [favourites, setFavourites] = useState<TransformedRestaurant[]>([]);

  const addToFavourites = (restaurant: TransformedRestaurant) => {
    setFavourites([...favourites, restaurant]);
  };

  const removeFromFavourites = (restaurant: TransformedRestaurant) => {
    const newFavourites = favourites.filter(
      (x) => x.place_id !== restaurant.place_id
    );
    setFavourites(newFavourites);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (context === undefined) {
    throw new Error('useFavourites must be used within a FavouritesContextProvider');
  }
  return context;
};
