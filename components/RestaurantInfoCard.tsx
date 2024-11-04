import React from 'react';
import styled from 'styled-components/native';
import { Card, Text } from 'react-native-paper';

interface RestaurantInfoProps {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporary: boolean;
}

const Container = styled(Card)`
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 8px;
`;

const Cover = styled(Card.Cover)`
  height: 200px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Content = styled(Card.Content)`
  padding: 16px;
`;

const Title = styled(Text)`
  margin-bottom: 16px;
  font-weight: bold;
`;

const InfoText = styled(Text)`
  color: #444;
  margin-bottom: 8px;
  font-size: 16px;
`;

const Label = styled(Text)`
  font-weight: bold;
  color: #333;
`;

const TemporaryClosed = styled(Text)`
  color: #d32f2f;
  font-weight: bold;
  margin-top: 8px;
`;

export default function RestaurantInfo({
  name,
  icon,
  photos,
  address,
  isOpenNow,
  rating,
  isClosedTemporary,
}: RestaurantInfoProps) {
  return (
    <Container elevation={5}>
      <Cover source={{ uri: photos[0] }} />
      <Content>
        <Title variant="titleLarge">{name}</Title>
        <InfoText variant="bodyMedium">
          <Label>Rating:</Label> {rating}
        </InfoText>
        <InfoText variant="bodyMedium">
          <Label>Status:</Label> {isOpenNow ? 'Open' : 'Closed'}
        </InfoText>
        <InfoText variant="bodyMedium">
          <Label>Address:</Label> {address}
        </InfoText>
        {isClosedTemporary && (
          <TemporaryClosed variant="bodyMedium">
            Temporarily Closed
          </TemporaryClosed>
        )}
      </Content>
    </Container>
  );
}
