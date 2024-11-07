import React from 'react';
import styled from 'styled-components/native';
import { Card, Text } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';
import star from '../assets/star';
import open from '../assets/open';
import { Spacing } from './Spacer';

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

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Stars = styled.View`
  flex-direction: row;
`;

const Title = styled(Text)`
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
`;

const InfoText = styled(Text)`
  color: ${props => props.theme.colors.text.primary};
  font-family: ${props => props.theme.fonts.body};
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
  const ratingArray = Array.from(new Array(Math.ceil(rating)));

  return (
    <Container elevation={5}>
      <Cover source={{ uri: photos[0] }} />
      <Content>
        <Spacing position="bottom" size={'medium'}>
          <Title variant="titleLarge">{name}</Title>
        </Spacing>
        <Spacing position="bottom" size={'medium'}>
          <Row>
            <Stars>
              {ratingArray.map((_, index) => (
                <SvgXml key={index} xml={star} width={20} height={20} />
              ))}
            </Stars>
            {isClosedTemporary ? (
              <TemporaryClosed variant="bodyMedium">
                Temporarily Closed
              </TemporaryClosed>
            ) : (
              <SvgXml xml={open} width={20} height={20} />
            )}
          </Row>
        </Spacing>
        <InfoText variant="bodyMedium">
          <Label>Rating:</Label> {rating}
        </InfoText>
        <InfoText variant="bodyMedium">
          <Label>Status:</Label> {isOpenNow ? 'Open' : 'Closed'}
        </InfoText>
        <InfoText variant="bodyMedium">
          <Label>Address:</Label> {address}
        </InfoText>
      </Content>
    </Container>
  );
}
