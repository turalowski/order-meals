import { RestaurantDetails } from '@/components/restaurant/RestaurantDetails';
import { theme } from '@/theme';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';

export default function Restaurant() {
  const { id } = useLocalSearchParams();

  if (typeof id === 'object') {
    return null;
  }

  return (
      <RestaurantDetails id={id} />
  );
}
