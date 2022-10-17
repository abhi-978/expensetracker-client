import axios from 'axios';
import { setLoginErrors } from './errorsAction';
import { startGetUserDetails } from './userAction';

export const startLoginUser = (body, clearfields) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3058/users/login', body)
      .then((response) => {
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
          dispatch(setToken(token));
          dispatch(setLoginErrors(''));
          clearfields();
          dispatch(startGetUserDetails(token));
        } else {
          dispatch(setToken(''));
        }
      })
      .catch((err) => {
        dispatch(setToken(''));
        const error = err.response.data.message;
        if (error) {
          dispatch(setLoginErrors(error));
        } else {
          dispatch(setLoginErrors(''));
        }
      });
  };
};

export const setToken = (token) => {
  return {
    type: 'SET_USER_TOKEN',
    payload: token,
  };
};

export const setSavedToken = (token) => {
  return {
    type: 'SET_SAVED_TOKEN',
    payload: token,
  };
};

export const removeToken = () => {
  return {
    type: 'REMOVE_USER_TOKEN',
  };
};
