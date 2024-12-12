import { useFavourites } from '@/features/restaurants/context/FavouritesContext';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TransformedRestaurant } from '@/utils/type';

export const Favourite = ({
  restaurant,
}: {
  restaurant: TransformedRestaurant;
}) => {
  const { addToFavourites, favourites, removeFromFavourites } = useFavourites();
  
  const isFavourite = favourites.find(
    (item) => item.place_id === restaurant.place_id
  );

  const handlePress = () => {
    if (isFavourite) {
      removeFromFavourites(restaurant);
    } else {
      addToFavourites(restaurant);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <AntDesign 
        name={isFavourite ? "heart" : "hearto"} 
        size={24} 
        color={isFavourite ? "red" : "white"} 
      />
    </TouchableOpacity>
  );
};
