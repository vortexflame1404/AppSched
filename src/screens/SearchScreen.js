import React from 'react';
import { View, StyleSheet } from 'react-native';
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
  const [searchResults, setSearchResults] = React.useState();
  const { state } = React.useContext(AuthContext);

  const handleSearch = async (id, token, searchKey) => {
    try {
      const response = await axios.get(`users/${id}/search`, {
        params: {
          name: searchKey,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setSearchResults(response.data);
    } catch (e) {
      console.error('error in host search');
    }
  };

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.name} `}
      description={`${item.email} ${index + 1}`}
      onPress={() => navigation.navigate('ProfSched')}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Search" alignment="center" />
      <Divider style={{ borderColor: '#00008b' }} />
      <Layout style={styling.container}>
        <Text category="h3">Search Screen</Text>
        <Input
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
          placeholder="SEARCH"
        />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Button
            onPress={() => {
              handleSearch(state.userId, state.userToken, searchInput);
            }}>
            SEARCH
          </Button>
        </View>
        {searchResults ? (
          <List
            style={{ maxHeight: 350 }}
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
