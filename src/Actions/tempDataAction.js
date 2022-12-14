import axiosWithHeaders from '../Helpers/axiosConfig';
import { startGetUserDetails } from './userAction';

export const startGetOneExpense = (id) => {
  return (dispatch) => {
    axiosWithHeaders
      .get(`/api/expenses/${id}`)
      .then((response) => {
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

export const startSaveProfileImage = (formdata, onHide) => {
  return (dispatch) => {
    axiosWithHeaders
      .post(`/users/profile/image`, formdata)
      .then((response) => {
        dispatch(startGetUserDetails());
        onHide();
        window.location.reload();
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
