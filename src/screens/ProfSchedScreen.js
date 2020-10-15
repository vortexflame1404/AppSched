import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  TopNavigation,
  Icon,
  TopNavigationAction,
  Divider,
  Layout,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const ProfSchedScreen = ({ route, navigation }) => {
  const navigateBack = () => navigation.goBack();

  const BackAction = (props) => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation
        title="Host's schedule"
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styling.container}>
        <Text category="h1">Prof Schedule Screen</Text>
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

export default ProfSchedScreen;
