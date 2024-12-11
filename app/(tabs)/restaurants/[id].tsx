import { LocationContextProvider } from '@/features/restaurants/context/LocationContext';
import { RestaurantsContextProvider } from '@/features/restaurants/context/RestaurantContext';
import { theme } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import styled, { ThemeProvider } from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: ${props => props.theme.space[1]};
`;

const Title = styled.Text`
  font-size: ${props => props.theme.fontSizes.body};
  font-family: ${props => props.theme.fonts.heading};
`;

export default function RestaurantDetails() {
  const { id } = useLocalSearchParams();

  return (
    <ThemeProvider theme={theme}>
      <LocationContextProvider>
        <RestaurantsContextProvider>
          <Container>
            <Title>Restaurant Details {id}</Title>
          </Container>
        </RestaurantsContextProvider>
      </LocationContextProvider>
    </ThemeProvider>
  );
}
