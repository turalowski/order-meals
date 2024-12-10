import {locations} from './mock/locations.mock'
import camelize from 'camelize';

type Coordinates = {
  lat: number;
  lng: number;
}

type LocationResult = {
  results: [{
    geometry: {
      location: Coordinates
    }
  }]
}

export const locationRequest = (searchTerm: string): Promise<LocationResult> => {
    return new Promise((resolve, reject) => {
      const locationMock = locations[searchTerm as keyof typeof locations];
      if (!locationMock) {
        reject("not found");
        return;
      }
      // Transform the mock data to match LocationResult type
      const formattedLocation: LocationResult = {
        results: [{
          geometry: {
            location: {
              lat: locationMock.results[0].geometry.location.lat,
              lng: locationMock.results[0].geometry.location.lng
            }
          }
        }]
      };
      resolve(formattedLocation);
    });
  };
  
  export const locationTransform = (result: LocationResult) => {
    const formattedResponse = camelize(result);
    const { geometry = { location: { lat: 0, lng: 0 } } } = formattedResponse.results[0];
    const { lat, lng } = geometry.location;
  
    return { lat, lng };
  };