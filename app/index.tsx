import React from 'react';
import { Platform, StatusBar, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '@/components/RestaurantInfoCard';
import styled, { ThemeProvider } from 'styled-components/native';
import { Restaurant, restaurantData } from '@/utils/restaurants';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { theme } from '@/theme';
import {
  useFonts,
  Oswald_400Regular,
  Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';

const isAndroid = Platform.OS === 'android';

const Container = styled.View`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  background-color: ${props => props.theme.colors.bg.primary};
`;

const SearchContainer = styled.View`
  padding: ${props => props.theme.space[3]};
  background-color: ${props => props.theme.colors.bg.secondary};
`;

const StyledSearchBar = styled(Searchbar)`
  background-color: ${props => props.theme.colors.bg.primary};
`;

const RestaurantList = styled(FlatList<Restaurant>).attrs({
  contentContainerStyle: {
    padding: 16,
    gap: 24
  },
})``;

export default function Index() {
  const { searchQuery, setSearchQuery } = useSearchQuery();
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
      <Container>
        <SearchContainer>
          <StyledSearchBar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </SearchContainer>
        <RestaurantList
          data={restaurantData}
          renderItem={({ item, index }) => (
            <RestaurantInfoCard key={`${item.name}-${index}`} {...item} />
          )}
          keyExtractor={item => item.name}
        />
      </Container>
    </ThemeProvider>
  );
}
