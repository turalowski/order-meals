import React, { useEffect, useState } from 'react';
import { locationRequest, locationTransform } from '../api/locationsApi';
import {  Viewport } from '@/utils/type'

type LocationResult = {
  lat: number;
  lng: number;
  viewport: Viewport;
}

interface LocationContextType {
  isLoading: boolean;
  error: string | null;
  location: LocationResult;
  search: (searchKeyword?: string) => void;
  keyword: string;
}

export const LocationContext = React.createContext<LocationContextType>({
  isLoading: false,
  error: null,
  location: {
    lat: 0,
    lng: 0,
    viewport: {
      northeast: { lat: 0, lng: 0 },
      southwest: { lat: 0, lng: 0 }
    }
  },
  search: () => {},
  keyword: '',
});

export const LocationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [keyword, setKeyword] = useState('san francisco');
  const [location, setLocation] = useState<LocationResult>({
    lat: 0,
    lng: 0,
    viewport: {
      northeast: { lat: 0, lng: 0 },
      southwest: { lat: 0, lng: 0 }
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = (searchKeyword = 'Antwerp') => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    if (!searchKeyword.length) {
      return;
    }
    locationRequest(searchKeyword.toLowerCase())
      .then(locationTransform)
      .then(result => {
        setIsLoading(false);
        setLocation(result);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err instanceof Error ? err.message : String(err));
      });
  };

  useEffect(() => {
    onSearch();
  }, [])

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
