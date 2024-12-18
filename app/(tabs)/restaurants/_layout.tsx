import { Stack } from 'expo-router';

export default function RestaurantLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal'
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Restaurants',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Restaurant Details',
        }}
      />
    </Stack>
  );
}