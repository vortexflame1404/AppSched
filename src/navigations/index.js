import React, { useReducer, useEffect, useMemo } from 'react';
import axios from 'axios';
import AppTabNavigator from './AppTabNavigator';
import { authReducer, initialState } from '../reducers/reducer';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import * as action from '../reducers/actions';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = React.createContext(null);

const AppNavigator = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  console.log('in AppNavigator');

  axios.defaults.baseURL = 'http://192.168.1.120:3000/';
  axios.defaults.timeout = 3000;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  if (typeof state.userToken === 'string')
    axios.defaults.headers.common['Authorization'] = state.userToken;

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const id = await AsyncStorage.getItem('userId');
        const userJSON = await AsyncStorage.getItem('userDetails');
        const user = userJSON === null ? null : JSON.parse(userJSON);
        const response = axios.get(`users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status >= 400) {
          throw new Error('restore token failed');
        }
        dispatch({
          type: 'RESTORE_TOKEN',
          payload: { token: token, user: user, id: id },
        });
        console.log('restore token from async storage');
      } catch (e) {
        console.log('error retrieving token', e.message);
        dispatch({
          type: 'ERROR',
          payload: { error: 'error retrieving token' },
        });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => action.signInUser(data, dispatch),
      // TODO: do sign out
      signOut: async (data) => action.signOutUser(data, dispatch),
      signUp: async (data) => action.signUpUser(data, dispatch),
    }),
    [],
  );

  return (
    <AuthContext.Provider value={{ state, authContext }}>
      <NavigationContainer>
        {state.userToken === null ? (
          <AuthStackNavigator />
        ) : (
          <AppTabNavigator />
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigator;
