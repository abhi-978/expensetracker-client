import axios from 'axios';
import { setRegisterEmailError, setRegisterPwdError } from './errorsAction';

export const startRegisterUser = (body, clearfields) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3058/users/register', body)
      .then((response) => {
        dispatch(addNewUser(response.data));
        dispatch(setRegisterEmailError(''));
        dispatch(setRegisterPwdError(''));
        clearfields();
      })
      .catch((err) => {
        let errors;
        if (err.response.data.errors) {
          errors = { ...err.response.data.errors };
        } else if (err.response.data.code === 11000) {
          errors = {
            email: {
              message: 'Email ID already exists',
            },
          };
        }

        if (errors && errors.email) {
          dispatch(setRegisterEmailError(errors.email.message));
          dispatch(setRegisterPwdError(''));
        } else if (errors && errors.password) {
          dispatch(setRegisterEmailError(''));
          dispatch(setRegisterPwdError(errors.password.message));
        } else {
          dispatch(setRegisterEmailError(''));
          dispatch(setRegisterPwdError(''));
        }
      });
  };
};

export const addNewUser = (user) => {
  return {
    type: 'ADD_NEW_USER',
    payload: user,
  };
};

export const setDefaultNewUser = () => {
  return {
    type: 'SET_DEFAULT',
  };
};
