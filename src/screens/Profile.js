import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../navigations';

const Profile = (props) => {
  const { state, authContext } = React.useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="PROFILE" alignment="center" />
      <Divider />
      <Layout style={styling.container}>
        <Text category="h1">Profile</Text>
        <Text>{state.userId}</Text>
        <Button onPress={() => authContext.signOut({ id: state.userId })}>
          SIGN OUT
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    alignItems: 'center',
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

export default Profile;
