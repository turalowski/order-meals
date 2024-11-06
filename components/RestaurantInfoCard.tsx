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
  margin-bottom: ${props => props.theme.space[4]};
  background-color: ${props => props.theme.colors.bg.primary};
  border-radius: ${props => props.theme.space[2]};
`;

const Cover = styled(Card.Cover)`
  height: ${props => props.theme.sizes[5]};
  border-top-left-radius: ${props => props.theme.space[2]};
  border-top-right-radius: ${props => props.theme.space[2]};
`;

const Content = styled(Card.Content)`
  padding: ${props => props.theme.space[4]};
`;

const Title = styled(Text)`
  font-family: ${props => props.theme.fonts.heading};
  margin-bottom: ${props => props.theme.space[3]};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const InfoText = styled(Text)`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.body};
  margin-bottom: ${props => props.theme.space[1]};
  font-size: ${props => props.theme.fontSizes.body};
  font-family: ${props => props.theme.fonts.body};
`;

const Label = styled(Text)`
  font-weight: ${props => props.theme.fontWeights.bold};
  color: ${props => props.theme.colors.ui.primary};
`;

const TemporaryClosed = styled(Text)`
  color: ${props => props.theme.colors.ui.error};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-top: ${props => props.theme.space[2]};
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
