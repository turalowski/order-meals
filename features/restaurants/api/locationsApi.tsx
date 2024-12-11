import {locations} from '../mock/locations.mock'
import camelize from 'camelize';
import { Viewport, Geometry } from '@/utils/type'

type LocationResult = {
  results: {
    geometry: Geometry;
  }[];
}

type TransformedLocation = {
  lat: number;
  lng: number;
  viewport: Viewport;
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
          },
          viewport: {
            northeast: {
              lat: locationMock.results[0].geometry.viewport.northeast.lat,
              lng: locationMock.results[0].geometry.viewport.northeast.lng
            },
            southwest: {
              lat: locationMock.results[0].geometry.viewport.southwest.lat,
              lng: locationMock.results[0].geometry.viewport.southwest.lng
            }
          }
        }
      }]
    };
    resolve(formattedLocation);
  });
};

export const locationTransform = (result: LocationResult): TransformedLocation => {
  const formattedResponse = camelize(result);
  const { geometry = { 
    location: { lat: 0, lng: 0 }, 
    viewport: {
      northeast: { lat: 0, lng: 0 },
      southwest: { lat: 0, lng: 0 }
    }
  }} = formattedResponse.results[0];
  const { lat, lng } = geometry.location;
  console.log('geometry', geometry)
  return { lat, lng, viewport: geometry.viewport };
};