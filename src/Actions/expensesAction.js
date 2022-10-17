import axios from 'axios';
import { config } from '../Helpers/axiosConfig';
import { startGetDeletedExpenses } from './deletedExpensesAction';
import { setCreateExpenseError } from './errorsAction';

export const startSaveExpense = (body, clearFields, handleClose) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3058/api/expenses', body, config)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.hasOwnProperty('errors'));
        if (response.data.hasOwnProperty('errors')) {
          dispatch(setCreateExpenseError(response.data.errors.amount.message));
        } else {
          dispatch(saveExpense(response.data));
          dispatch(setCreateExpenseError(''));
          clearFields();
          handleClose();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const saveExpense = (expense) => {
  return {
    type: 'SAVE_NEW_EXPENSE',
    payload: expense,
  };
};

export const startGetAllExpenses = (config) => {
  return (dispatch) => {
    axios
      .get('http://localhost:3058/api/expenses', config)
      .then((response) => {
        dispatch(getAllExpenses(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getAllExpenses = (expensesArr) => {
  return {
    type: 'GET_ALL_EXPENSES',
    payload: expensesArr,
  };
};

export const startEditExpense = (id, body, clearFields, handleClose) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:3058/api/expenses/${id}`, body, config)
      .then((response) => {
        dispatch(editExpense(response.data));
        clearFields();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const editExpense = (expense) => {
  return {
    type: 'EDIT_ONE_EXPENSE',
    payload: expense,
  };
};

export const startDeleteOneExpense = (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return (dispatch) => {
    axios
      .delete(`http://localhost:3058/api/expenses/${id}`, config)
      .then((response) => {
        dispatch(deleteOneExpense(id));
        dispatch(startGetDeletedExpenses(config));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteOneExpense = (id) => {
  return {
    type: 'DELETE_ONE_EXPENSE',
    payload: id,
  };
};

export const setDefaultExpenses = () => {
  return {
    type: 'SET_DEFAULT',
  };
};
