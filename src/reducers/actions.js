import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const signOutUser = async (data, dispatch) => {
  try {
    const response = await axios.post(
      `/users/${data.id}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    if (response.status === 200) {
      await AsyncStorage.multiRemove(['userDetails', 'userToken', 'userId']);

      dispatch({ type: 'SIGN_OUT' });
    }
  } catch (e) {
    console.log('in signoutuser', e.message);
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
    const user = response.data.user;
    const id = response.headers.location;
    console.log('headers', typeof response.headers);
    console.log('token', typeof response.data.token);
    console.log('id', typeof id);
    console.log('user ', typeof user);
    await AsyncStorage.setItem('userDetails', JSON.stringify(user));
    await AsyncStorage.setItem('userId', id);
    await AsyncStorage.setItem('userToken', response.data.token);
    dispatch({
      type: 'SIGN_IN',
      payload: { user: user, token: response.data.token, id: id },
    });
  } catch (e) {
    console.log('in signInUser', e.message);
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
    console.log(data);
    const response = await axios.post('users/', {
      name: data.name,
      email: data.email,
      password: data.password,
      _host: data.host,
    });
    const user = JSON.stringify(response.data.user);
    const id = response.headers.location;
    await AsyncStorage.setItem('userDetails', user);
    await AsyncStorage.setItem('userId', id);
    await AsyncStorage.setItem('userToken', response.data.token);
    console.log(response.status);
    if (response.status === 201) {
      dispatch({
        type: 'SIGN_IN',
        payload: { user: user, token: response.data.token, id: id },
      });
    }
  } catch (e) {
    console.log('in signUpUser', e.message);
    dispatch({
      type: 'ERROR',
      payload: { error: 'Sign up failed. Try again' },
    });
  }
};
