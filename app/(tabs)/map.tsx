import { MapComponent } from '@/components/restaurant/Map';
import { LocationContext } from '@/features/restaurants/context/LocationContext';
import React, { useContext } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

export default function MapScreen() {
  return (
      <Container>
        <MapComponent />
      </Container>
  );
}
