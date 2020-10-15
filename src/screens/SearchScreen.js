import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Button,
  Text,
  Input,
  TopNavigation,
  Divider,
  Layout,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const hostsList = [
  {
    id: 'h123123j',
    name: 'Duc',
  },
  {
    id: 'hdffwn',
    name: 'student affair',
  },
  {
    id: 'onf2o',
    name: 'cse office',
  },
];

const SearchScreen = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="Search" alignment="center" />
      <Divider />
      <Layout style={styling.container}>
        <Text style={style.titleText}>Search Screen</Text>
        <Button onPress={() => props.navigation.navigate('ProfSched')}>
          go to professor's schedule
        </Button>
        <Button>testing button</Button>
        <Text category="label">testing h1</Text>
      </Layout>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const styling = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  // set width to fit text
  buttonOuterLayout: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLayout: {
    marginBottom: 10,
  },
});

export default SearchScreen;
