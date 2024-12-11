import React, { useEffect, useState } from 'react';

import { locationRequest, locationTransform } from './locations';

interface LocationContextType {
  isLoading: boolean;
  error: string | null;
  location: { lat: number; lng: number } | null;
  search: (searchKeyword?: string) => void;
  keyword: string;
}

export const LocationContext = React.createContext<LocationContextType>({
  isLoading: false,
  error: null,
  location: null,
  search: () => {},
  keyword: '',
});

export const LocationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [keyword, setKeyword] = useState('san francisco');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSearch = (searchKeyword = 'Antwerp') => {
    console.log(searchKeyword);
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
        console.log(result);
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
