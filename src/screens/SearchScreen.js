import React from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import {
  Button,
  Text,
  Input,
  TopNavigation,
  Divider,
  Layout,
  List,
  ListItem,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import { AuthContext } from '../navigations';

const SearchScreen = ({ route, navigation }) => {
  const [searchInput, setSearchInput] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const { state } = React.useContext(AuthContext);
  const id = state.userId;

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`users/${id}/search`, {
        params: {
          name: query,
        },
      });
      setSearchResults(response.data);
    } catch (e) {
      console.log('error in host search', e.message);
      setSearchResults([]);
    }
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.name} `}
      description={`${item.email}`}
      onPress={() => navigation.navigate('ProfSched', item)}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Search" alignment="center"/>
      <Divider style={{ borderColor: '#00008b' }}/>
      <Layout style={styling.container}>
        <Text category="h3">Search Screen</Text>
        <Divider style={{ borderColor: '#00008b', height: 30 }}/>
        <Input
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          placeholder="SEARCH"
        />
        <View style={{ alignItems: 'center', flex: 1, padding: 10 }}>
          <Button
            onPress={() => {
              Keyboard.dismiss();
              handleSearch(searchInput);
            }}>
            SEARCH
          </Button>
        </View>
        {searchResults ? (
          <List
            style={{ maxHeight: 300 }}
            data={searchResults}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
          />
        ) : null}
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

export default SearchScreen;
