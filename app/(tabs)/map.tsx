import { MapComponent } from '@/components/restaurant/Map';
import React from 'react';
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
