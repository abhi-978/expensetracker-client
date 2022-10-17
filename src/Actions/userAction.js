import axiosWithHeaders from '../Helpers/axiosConfig';
import { startSetBudget } from './budgetAction';
import { startGetCategories } from './categoriesAction';
import { startGetAllExpenses } from './expensesAction';

export const startGetUserDetails = () => {
  return (dispatch) => {
    axiosWithHeaders
      .get('/users/account')
      .then((response) => {
        dispatch(setUserDetails(response.data));
        dispatch(startSetBudget({ userId: response.data._id }));
        dispatch(startGetCategories());
        dispatch(startGetAllExpenses());
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
