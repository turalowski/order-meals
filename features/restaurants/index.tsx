import React, { useContext } from 'react';
import { Platform, StatusBar, FlatList } from 'react-native';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '@/components/RestaurantInfoCard';
import styled from 'styled-components/native';
import { Restaurant } from '@/utils/restaurants';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import {
  useFonts,
  Oswald_400Regular,
  Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { RestaurantsContext } from './context';
import { colors } from '@/theme/colors';

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

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1; 
`;

const StyledActivityIndicator = styled(ActivityIndicator)`
margin-left: -25px;
`;

const RestaurantList = styled(FlatList<Restaurant>).attrs({
  contentContainerStyle: {
    padding: 16,
    gap: 24,
  },
})``;

export default function Restaurants() {
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const restaurantContext = useContext(RestaurantsContext);
  const { isLoading, restaurants } = restaurantContext;
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
    <Container>
      <SearchContainer>
        <StyledSearchBar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </SearchContainer>
      {isLoading && (
        <LoadingContainer>
          <StyledActivityIndicator size={50} animating={true} color={colors.ui.primary} />
        </LoadingContainer>
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => <RestaurantInfoCard {...item} />}
        keyExtractor={(item, index) => `${item.name}-${index}`}
      />
    </Container>
  );
}
