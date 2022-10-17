import axios from 'axios';
import { config } from '../Helpers/axiosConfig';
import { startGetUserDetails } from './userAction';

export const startGetOneExpense = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3058/api/expenses/${id}`, config)
      .then((response) => {
        console.log(response.data);
        dispatch(getOneExpense(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getOneExpense = (expense) => {
  return {
    type: 'GET_ONE_EXPENSE',
    payload: expense,
  };
};

export const startSaveProfileImage = (formdata, config, onHide) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3058/users/profile/image`, formdata, config)
      .then((response) => {
        dispatch(startGetUserDetails(config.headers.Authorization));
        onHide();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setDefaultTempData = () => {
  return {
    type: 'SET_DEFAULT',
  };
};
