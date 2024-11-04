import { Text, View, Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: 'green',
          padding: 16,
          marginTop: isAndroid ? StatusBar.currentHeight : 0,
        }}
      >
        <Text>Search</Text>
      </View>
      <View style={{ flex: 9, backgroundColor: 'red', padding: 16 }}>
        <Text>List</Text>
      </View>
    </View>
  );
}
