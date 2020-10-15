import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

axios.defaults.baseURL = 'http://192.168.1.120:3000/';
axios.defaults.timeout = 3000;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const signOutUser = async (data, dispatch) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const response = await axios.post(
      `/users/${data.id}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status === 200) {
      await AsyncStorage.removeItem('userDetails');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userToken');

      dispatch({ type: 'SIGN_OUT' });
    }
  } catch (e) {
    dispatch({ type: 'ERROR', payload: { error: 'error sign out' } });
  }
};

export const signInUser = async (data, dispatch) => {
  // In a production app, we need to send some data (usually username, password) to server and get a token
  // We will also need to handle errors if sign in failed
  // After getting token, we need to persist the token using `AsyncStorage`
  // In the example, we'll use a dummy token
  try {
    const payload = JSON.stringify({
      email: data.email,
      password: data.password,
    });

    const config = {
      method: 'post',
      url: '/users/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    };

    const response = await axios(config);
    const user = JSON.stringify(response.data.user);
    const id = response.headers.location;
    console.log('headers', response.headers);
    console.log('token', response.data.token);
    console.log('user ', user);
    await AsyncStorage.setItem('userDetails', user);
    await AsyncStorage.setItem('userId', id);
    await AsyncStorage.setItem('userToken', response.data.token);
    dispatch({
      type: 'SIGN_IN',
      payload: { user: user, token: response.data.token, id: id },
    });
  } catch (e) {
    console.log('in signInUser');
    console.log(e);
    dispatch({
      type: 'ERROR',
      payload: { error: 'Sign in failed. Try again' },
    });
  }
};

export const signUpUser = async (data, dispatch) => {
  // In a production app, we need to send user data to server and get a token
  // We will also need to handle errors if sign up failed
  // After getting token, we need to persist the token using `AsyncStorage`
  // In the example, we'll use a dummy token
  try {
    const response = await axios.post('users/', {
      name: data.name,
      email: data.email,
      password: data.password,
      _host: data.host,
    });
    const user = JSON.stringify(response.data.user);
    const id = response.headers.Location;
    await AsyncStorage.setItem('userDetails', user);
    await AsyncStorage.setItem('userId', id);
    await AsyncStorage.setItem('userToken', response.data.token);
    if (response.status === 201) {
      dispatch({
        type: 'SIGN_IN',
        payload: { user: user, token: response.data.token, id: id },
      });
    }
  } catch (e) {
    dispatch({
      type: 'ERROR',
      payload: { errorMessage: 'Sign up failed. Try again' },
    });
  }
};
