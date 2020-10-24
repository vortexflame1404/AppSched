import React, { useReducer, useEffect, useMemo } from 'react';
import { YellowBox } from 'react-native';
import axios from 'axios';
import AppTabNavigator from './AppTabNavigator';
import { authReducer, initialState } from '../reducers/reducer';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './AuthStackNavigator';
import * as action from '../reducers/actions';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = React.createContext(null);

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

const AppNavigator = () => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // console.log('in AppNavigator');

  // axios.defaults.baseURL = 'https://powerful-depths-46182.herokuapp.com/';
  axios.defaults.baseURL = 'http://127.0.0.1:3000';
  axios.defaults.timeout = 4000;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  if (typeof state.userToken === 'string') {
    axios.defaults.headers.common.Authorization = state.userToken;
  }

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        dispatch({ type: 'LOADING' });
        const token = await AsyncStorage.getItem('userToken');
        const id = await AsyncStorage.getItem('userId');
        const response = await axios.get(`users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log('in index useeffect', response.data);
        if (response.status !== 200) {
          throw new Error('restore token failed');
        }
        dispatch({
          type: 'RESTORE_TOKEN',
          payload: { token: token, user: response.data, id: id },
        });
        // console.log('restore token from async storage');
      } catch (e) {
        // console.log('error retrieving/checking token', e.message);
        dispatch({ type: 'SIGN_OUT' });
      } finally {
        dispatch({ type: 'DONE_LOADING' });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => action.signInUser(data, dispatch),
      signOut: async (data) => action.signOutUser(data, dispatch),
      signUp: async (data) => action.signUpUser(data, dispatch),
      modifyUser: async (data) => action.modifyUser(data, dispatch),
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
