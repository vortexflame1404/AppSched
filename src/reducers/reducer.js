import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        userToken: action.payload.token,
        userDetails: action.payload.user,
        userId: action.payload.id,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isSignOut: false,
        userToken: action.payload.token,
        userDetails: action.payload.user,
        userId: action.payload.id,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignOut: true,
        userToken: null,
        userDetails: null,
        userId: null,
      };
    case 'ERROR':
      return {
        ...prevState,
        isLoading: false,
        errorMessage: action.payload.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const initialState = {
  isLoading: true,
  isSignOut: false,
  userToken: null,
  userDetails: null,
  userId: null,
  errorMessage: null,
};
