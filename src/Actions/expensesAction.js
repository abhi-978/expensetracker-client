import axiosWithHeaders from '../Helpers/axiosConfig';
import { startGetDeletedExpenses } from './deletedExpensesAction';
import { setCreateExpenseError } from './errorsAction';

export const startSaveExpense = (body, clearFields, handleClose) => {
  return (dispatch) => {
    axiosWithHeaders
      .post('/api/expenses', body)
      .then((response) => {
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

export const startGetAllExpenses = () => {
  return (dispatch) => {
    axiosWithHeaders
      .get('/api/expenses')
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
    axiosWithHeaders
      .put(`/api/expenses/${id}`, body)
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
  return (dispatch) => {
    axiosWithHeaders
      .delete(`/api/expenses/${id}`)
      .then((response) => {
        dispatch(deleteOneExpense(id));
        dispatch(startGetDeletedExpenses());
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
