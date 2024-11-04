import React from 'react';
import { Text, View, Platform, StatusBar, StyleSheet, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RestaurantInfoCard from '@/components/RestaurantInfoCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const isAndroid = Platform.OS === 'android';

const restaurantData = [
  {
    name: "Sample Restaurant",
    icon: "",
    photos: [
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.foodiesfeed.com%2Fwp-content%2Fuploads%2F2017%2F07%2Fshakshuka-1.jpg&f=1&nofb=1&ipt=9e9f003e3ecca4ad82c964263a9183e63334d72272d22c873919421c07e5dc59&ipo=images',
    ],
    address: "123 Main Street, City",
    isOpenNow: true,
    rating: 4.5,
    isClosedTemporary: false
  },
  {
    name: "Italian Bistro",
    icon: "",
    photos: [
      'https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made.jpg',
    ],
    address: "456 Pasta Lane, Downtown",
    isOpenNow: true,
    rating: 4.7,
    isClosedTemporary: false
  },
  {
    name: "Sushi Express",
    icon: "",
    photos: [
      'https://www.foodiesfeed.com/wp-content/uploads/2023/08/sushi-roll-macro.jpg'
    ],
    address: "789 Ocean Drive, Seaside",
    isOpenNow: false,
    rating: 4.3,
    isClosedTemporary: true
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer]}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
      </View>
      <ScrollView style={styles.listContainer}>
        {restaurantData.map((restaurant, index) => (
          <RestaurantInfoCard
            key={`${restaurant.name}-${index}`}
            {...restaurant}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: isAndroid ? StatusBar.currentHeight : 0,
  },
  searchContainer: {
    backgroundColor: '#e8f5e9',
    padding: 16,
  },
  searchBar: {
    backgroundColor: 'white',
  },
  listContainer: {
    backgroundColor: '#ffebee',
    padding: 16,
  },
});
