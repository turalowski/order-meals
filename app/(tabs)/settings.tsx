import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export default function Settings() {
  return (
    <Container>
      <Title>Settings</Title>
    </Container>
  );
}
