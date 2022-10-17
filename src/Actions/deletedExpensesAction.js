import axiosWithHeaders from '../Helpers/axiosConfig';
import { startGetAllExpenses } from './expensesAction';

export const startGetDeletedExpenses = () => {
  return (dispatch) => {
    axiosWithHeaders
      .get(`/api/expenses/deleted`)
      .then((response) => {
        dispatch(getDeletedExpenses(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getDeletedExpenses = (delExpensesArr) => {
  return {
    type: 'GET_DELETED_EXPENSES',
    payload: delExpensesArr,
  };
};

export const startRestoreDeletedExpense = (id) => {
  return (dispatch) => {
    axiosWithHeaders
      .put(`/api/expenses/restore/${id}`, {})
      .then((response) => {
        dispatch(restoreDeletedExpense(id));
        dispatch(startGetAllExpenses());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const restoreDeletedExpense = (id) => {
  return {
    type: 'RESTORE_DELETED_EXPENSE',
    payload: id,
  };
};

export const setDefaultDelExpenses = () => {
  return {
    type: 'SET_DEFAULT',
  };
};
