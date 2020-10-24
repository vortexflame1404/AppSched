import React, { useState, useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Button,
  Input,
  Layout,
  Radio,
  RadioGroup,
  Spinner,
  Text,
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavLink from '../components/NavLink';
import { AuthContext } from '../navigations';
import { DismissKeyboard } from '../components/DismissKeyboard';
import { LoadingIndicator } from '../components/LoadingIndicator';

const SignUpScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedIndex, setSelectedIndex] = React.useState();
  const { state, authContext, dispatch } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styling.form}>
        {state.errorMessage ? (
          <Text status="danger">{state.errorMessage}</Text>
        ) : null}
        <View style={{ padding: 20 }} />
        <DismissKeyboard>
          <Input
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="NAME"
          />
        </DismissKeyboard>
        <DismissKeyboard>
          <Input
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholder="EMAIL"
          />
        </DismissKeyboard>
        <DismissKeyboard>
          <Input
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="PASSWORD"
          />
        </DismissKeyboard>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}>
          <Radio>STUDENT</Radio>
          <Radio>NOT STUDENT</Radio>
        </RadioGroup>
        <Button
          onPress={() => {
            const host = selectedIndex === 0 ? null : true;
            authContext.signUp({ name, email, password, host });
          }}>
          SIGN UP
        </Button>
        {state.isLoading ? <LoadingIndicator /> : null}
        <NavLink
          routeName="Login"
          text="Already have an account? Login instead"
        />
      </Layout>
    </SafeAreaView>
  );
};

const styling = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
  },
});

export default SignUpScreen;
