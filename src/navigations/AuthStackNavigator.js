import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();
const AuthStackNavigator = ({ route, navigation }) => {
  // console.log('at AuthStackNavigator');
  return (
    <Navigator headerMode={'none'}>
      <Screen name={'Login'} component={LoginScreen} />
      <Screen name={'Register'} component={SignUpScreen} />
    </Navigator>
  );
};

export default AuthStackNavigator;
