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

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token, id, user;

      try {
        token = await AsyncStorage.getItem('userToken');
        id = await AsyncStorage.getItem('userId');
        user = JSON.stringify(await AsyncStorage.getItem('userDetails'));
        if (id || token) throw new Error('token or id is null');
        const response = await axios.get(`users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          dispatch({
            type: 'RESTORE_TOKEN',
            payload: { user: user, id: id, token: token },
          });
        }
      } catch (e) {
        // Restoring token failed
        dispatch({ type: 'ERROR', payload: { error: 'signed out' } });
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
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
