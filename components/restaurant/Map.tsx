import { LocationContext } from '@/features/restaurants/context/LocationContext';
import { useContext, useEffect, useState } from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import styled from 'styled-components/native';
import { View, Text, Image } from 'react-native';
import { RestaurantsContext } from '@/features/restaurants/context/RestaurantContext';
import { Search } from '../common/Search';
import { router } from 'expo-router';

const Map = styled(MapView)`
  width: 100%;
  height: 100%;
`;

const SearchContainer = styled(View)`
  position: absolute;
  z-index: 999;
  width: 100%;
  padding: 16px;
`;

const CalloutContainer = styled(View)`
  padding: 8px;
  max-width: 160px;
`;

const CalloutText = styled(Text)`
  font-size: 14px;
  font-weight: bold;
`;

const CalloutAddress = styled(Text)`
  font-size: 12px;
  color: #666;
  margin-top: 4px;
`;

const CalloutImage = styled(Image)`
  width: 120px;
  height: 100px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

export const MapComponent = () => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);
  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    const latDelta = northeastLat - southwestLat;
    setLatDelta(latDelta);
  }, [location]);

  return (
    <>
      <SearchContainer>
        <Search />
      </SearchContainer>
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
        initialRegion={{
          latitude: location?.lat ?? 0,
          longitude: location?.lng ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.name}
            coordinate={{
              latitude: restaurant.geometry.location.lat,
              longitude: restaurant.geometry.location.lng,
            }}
          >
            <Callout onPress={() => router.push(`/restaurants/${restaurant.name}`)}>
              <CalloutContainer>
                <CalloutImage source={{ uri: restaurant.photos[0] }} />
                <CalloutText>{restaurant.name}</CalloutText>
                <CalloutAddress>{restaurant.vicinity}</CalloutAddress>
              </CalloutContainer>
            </Callout>
          </Marker>
        ))}
      </Map>
    </>
  );
};
