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

const LoadingIndicator = (props) => (
  <View
    style={[props.style, { justifyContent: 'center', alignItems: 'center' }]}>
    <Spinner size="small" />
  </View>
);

const SignUpScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedIndex, setSelectedIndex] = React.useState();
  const { state, authContext } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={styling.form}>
        {state.errorMessage ? (
          <Text status="danger">{state.errorMessage}</Text>
        ) : null}
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
          }}
          accessoryLeft={!state.userToken ? LoadingIndicator : null}>
          SIGN UP
        </Button>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignUpScreen;
