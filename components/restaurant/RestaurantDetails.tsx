import {
  findRestaurantByTitle,
} from '@/features/restaurants/api/restaurantsApi';
import { LocationContext } from '@/features/restaurants/context/LocationContext';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { SvgXml } from 'react-native-svg';
import { List, Text } from 'react-native-paper';
import star from '@/assets/star';
import { TransformedRestaurant } from '@/utils/type'

const Container = styled.View`
  flex: 1;
  padding: ${props => props.theme.space[3]};
  background-color: ${props => props.theme.colors.bg.primary};
`;

const RestaurantImage = styled.Image`
  width: 100%;
  height: 300px;
  border-radius: ${props => props.theme.space[2]};
`;

const Title = styled(Text)`
  font-size: ${props => props.theme.fontSizes.body};
  font-family: ${props => props.theme.fonts.heading};
  font-weight: ${props => props.theme.fontWeights.bold};
  margin-top: ${props => props.theme.space[3]};
`;

const Stars = styled.View`
  flex-direction: row;
`;

export const RestaurantDetails = ({ id }: { id: string }) => {

  const { location } = useContext(LocationContext);
  const [restaurant, setRestaurant] = useState<TransformedRestaurant | null>(null);

  useEffect(() => {
    if(id && location) {
        const fetchRestaurants = async () => {
            const restaurant = await findRestaurantByTitle(
              id,
              `${location?.lat},${location?.lng}`
            );
            if (restaurant) {
              setRestaurant(restaurant);
            }
          };
      
          fetchRestaurants();
    }
  }, [location, id]);

  if(!id) {
    return <Title>{id} is not a valid restaurant id</Title>
}

  if (!restaurant) {
    return <Title>Restaurant not found</Title>;
  }

  const ratingArray = Array.from(new Array(Math.ceil(restaurant.rating || 0)));

  return (
    <Container>
      <RestaurantImage source={{ uri: restaurant.photos[0] }} />
      <Title variant="headlineMedium">{restaurant.name}</Title>
      
      <Stars>
        {ratingArray.map((_, index) => (
          <SvgXml key={index} xml={star} width={20} height={20} />
        ))}
      </Stars>

      <List.Accordion
        title="Restaurant Info"
        left={props => <List.Icon {...props} icon="information" />}
      >
        <List.Item
          title="Rating"
          description={restaurant.rating}
          left={props => <List.Icon {...props} icon="star" />}
        />
        <List.Item
          title="Status"
          description={restaurant.isOpenNow ? 'Open' : 'Closed'}
          left={props => <List.Icon {...props} icon="clock" />}
        />
        <List.Item
          title="Address"
          description={restaurant.address}
          left={props => <List.Icon {...props} icon="map-marker" />}
        />
      </List.Accordion>
    </Container>
  );
};
