import { LocationContext } from '@/features/restaurants/context/LocationContext';
import { useContext, useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import { View } from 'react-native';
import { RestaurantsContext } from '@/features/restaurants/context/RestaurantContext';
import { Search } from '../common/Search';

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

export const MapComponent = () => {
  const { location } = useContext(LocationContext);
  const { restaurants } = useContext(RestaurantsContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [latDelta, setLatDelta] = useState(0);

  console.log(location);
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
        {restaurants.map(restaurant => {
          return null;
        })}
      </Map>
    </>
  );
};
