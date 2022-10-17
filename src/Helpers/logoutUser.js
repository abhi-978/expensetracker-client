import { setDefaultBudget } from '../Actions/budgetAction';
import { setDefaultCategory } from '../Actions/categoriesAction';
import { setDefaultDelExpenses } from '../Actions/deletedExpensesAction';
import { setDefaultExpenses } from '../Actions/expensesAction';
import { setDefaultUser } from '../Actions/userAction';
import { setDefaultTempData } from '../Actions/tempDataAction';
import { setDefaultNewUser } from '../Actions/registerAction';
import { setNoError } from '../Actions/errorsAction';
import { removeToken } from '../Actions/tokenAction';

const logoutUser = (dispatch) => {
  localStorage.removeItem('token');
  dispatch(setDefaultBudget());
  dispatch(setDefaultCategory());
  dispatch(setDefaultDelExpenses());
  dispatch(setDefaultExpenses());
  dispatch(setDefaultUser());
  dispatch(setDefaultTempData());
  dispatch(setDefaultNewUser());
  dispatch(setNoError());
  dispatch(removeToken());
  window.location.reload();
};

export default logoutUser;
