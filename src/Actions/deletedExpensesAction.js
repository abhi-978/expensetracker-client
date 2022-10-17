import axios from 'axios';
import { startGetAllExpenses } from './expensesAction';

export const startGetDeletedExpenses = (config) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:3058/api/expenses/deleted`, config)
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

export const startRestoreDeletedExpense = (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return (dispatch) => {
    axios
      .put(`http://localhost:3058/api/expenses/restore/${id}`, {}, config)
      .then((response) => {
        dispatch(restoreDeletedExpense(id));
        dispatch(startGetAllExpenses(config));
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
