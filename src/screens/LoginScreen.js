import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Button,
  Divider,
  Input,
  Layout,
  Spinner,
  Text,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavLink from '../components/NavLink';
import { AuthContext } from '../navigations';
import { DismissKeyboard } from '../components/DismissKeyboard';

const LoadingIndicator = (props) => (
  <View style={props.style}>
    <Spinner size="large" />
  </View>
);

const LoginScreen = ({ route, navigation }) => {
  const { state, authContext } = React.useContext(AuthContext);
  const [email, setEmail] = useState('student6@example.org');
  const [password, setPassword] = useState('student6');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styling.form}>
        <Text category="h1">APP SCHED</Text>
        {state.errorMessage ? (
          <Text status="danger">{state.errorMessage}</Text>
        ) : null}
        <Divider style={{ margin: 10 }} />
        <DismissKeyboard>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="EMAIL"
          />
        </DismissKeyboard>
        <Divider style={{ margin: 10 }} />
        <DismissKeyboard>
          <Input
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="PASSWORD"
          />
        </DismissKeyboard>
        <Divider style={{ margin: 10 }} />
        <Button
          onPress={() => {
            console.log(email + '   ' + password);
            authContext.signIn({ email, password });
          }}>
          SIGN IN
        </Button>
        {!state.userToken ? null : <Spinner size="large" />}
        <Divider style={{ margin: 20 }} />
        <NavLink
          routeName="Register"
          text="Don't have an account? Register instead"
        />
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    alignSelf: 'baseline',
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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
