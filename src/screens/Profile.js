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
import { LoadingIndicator } from '../components/LoadingIndicator';

const Profile = (props) => {
  const { state, authContext } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState(state.userDetails.email);
  const [name, setName] = React.useState(state.userDetails.name);
  const [password, setPassword] = React.useState('');
  // console.log(AsyncStorage.getItem('userToken'));

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
        <View style={{ flexDirection: 'row' }}>
          <Button
            style={{ margin: 10 }}
            onPress={() => {
              authContext.modifyUser({
                email: email,
                password: password,
                name: name,
                id: state.userId,
              });
            }}>
            SAVE INFO
          </Button>
          <Button
            style={{ margin: 10 }}
            onPress={() =>
              authContext.signOut({ id: state.userId, token: state.userToken })
            }>
            SIGN OUT
          </Button>
        </View>
        {state.isLoading ? <LoadingIndicator /> : null}
        {state.errorMessage.length > 0 ? (
          <Text status={'danger'}>{state.errorMessage}</Text>
        ) : null}
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
