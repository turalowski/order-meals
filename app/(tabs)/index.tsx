import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { theme } from '@/theme';
import {
  useFonts,
  Oswald_400Regular,
  Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { RestaurantsContextProvider } from '../../features/restaurants/context/RestaurantContext';
import Restaurants from '@/features/restaurants';
import { LocationContextProvider } from '@/features/restaurants/context/LocationContext';

export default function Index() {
  const [fontsLoaded] = useFonts({
    Oswald_400Regular,
    Oswald_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Restaurants />
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </ThemeProvider>
  );
}
