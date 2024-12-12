import { FavouritesContextProvider } from '@/features/restaurants/context/FavouritesContext';
import { LocationContextProvider } from '@/features/restaurants/context/LocationContext';
import { RestaurantsContextProvider } from '@/features/restaurants/context/RestaurantContext';
import { theme } from '@/theme';
import { Stack } from 'expo-router';
import { ThemeProvider } from 'styled-components/native';

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    </ThemeProvider>
  );
}
