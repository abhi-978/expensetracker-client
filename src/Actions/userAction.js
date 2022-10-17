import axios from 'axios';
import { startSetBudget } from './budgetAction';
import { startGetCategories } from './categoriesAction';
import { startGetAllExpenses } from './expensesAction';

export const startGetUserDetails = (token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return (dispatch) => {
    axios
      .get('http://localhost:3058/users/account', config)
      .then((response) => {
        dispatch(setUserDetails(response.data));
        dispatch(startSetBudget({ userId: response.data._id }, config));
        dispatch(startGetCategories(config));
        dispatch(startGetAllExpenses(config));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setUserDetails = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  };
};

export const setDefaultUser = () => {
  return {
    type: 'SET_DEFAULT',
  };
};
