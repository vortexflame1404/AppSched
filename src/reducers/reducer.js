import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...prevState,
        isLoading: true,
        errorMessage: '',
      };
    case 'DONE_LOADING':
      return {
        ...prevState,
        isLoading: false,
      };
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
        errorMessage: '',
        isLoading: false,
        userId: action.payload.id,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isSignOut: true,
        errorMessage: '',
        userToken: null,
        userDetails: null,
        userId: null,
      };
    case 'MODIFY_PROFILE':
      return {
        ...prevState,
        userDetails: action.payload.user,
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
  errorMessage: '',
};
