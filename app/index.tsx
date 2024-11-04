import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '@/components/RestaurantInfoCard';
import styled from 'styled-components/native';
import { restaurantData } from '@/utils/restaurants';
import { useSearchQuery } from '@/hooks/useSearchQuery';

const isAndroid = Platform.OS === 'android';

const Container = styled.View`
  flex: 1;
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
`;

const SearchContainer = styled.View`
  background-color: #e8f5e9;
  padding: 16px;
`;

const StyledSearchBar = styled(Searchbar)`
  background-color: white;
`;
1;

const ListContainer = styled.ScrollView`
  background-color: #ffebee;
  padding: 16px;
`;

export default function Index() {
  const { searchQuery, setSearchQuery } = useSearchQuery();

  return (
    <Container>
      <SearchContainer>
        <StyledSearchBar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </SearchContainer>
      <ListContainer>
        {restaurantData.map((restaurant, index) => (
          <RestaurantInfoCard
            key={`${restaurant.name}-${index}`}
            {...restaurant}
          />
        ))}
      </ListContainer>
    </Container>
  );
}
