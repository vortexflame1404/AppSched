import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  Input,
  Layout,
  Text,
  TopNavigation,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../navigations';
import Toast from 'react-native-simple-toast';
import { DismissKeyboard } from '../components/DismissKeyboard';
import AsyncStorage from '@react-native-community/async-storage';

const Profile = (props) => {
  const { state, authContext } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState(state.userDetails.email);
  const [name, setName] = React.useState(state.userDetails.name);
  const [password, setPassword] = React.useState('');
  console.log(AsyncStorage.getItem('userToken'));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title="PROFILE" alignment="center" />
      <Divider />
      <Layout style={styling.container}>
        <Text category="h1">Profile</Text>
        <DismissKeyboard>
          <Input
            label="NAME"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </DismissKeyboard>
        <DismissKeyboard>
          <Input
            label="EMAIL"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </DismissKeyboard>
        <DismissKeyboard>
          <Input
            label="PASSWORD"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </DismissKeyboard>
        <Button
          onPress={() => {
            console.log(typeof state.userDetails);
            console.log(state.userDetails.name);
            console.log(AsyncStorage.getAllKeys());
            console.log(AsyncStorage.getItem('userId'));
            console.log(AsyncStorage.getItem('userDetails'));
            Toast.show('save modified', Toast.SHORT);
          }}>
          SAVE INFO
        </Button>
        <Button onPress={() => authContext.signOut({ id: state.userId, token: state.userToken })}>
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
