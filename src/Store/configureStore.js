import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import errorsReducer from '../Reducers/errorsReducer';
import registerReducer from '../Reducers/registerReducer';
import tokenReducer from '../Reducers/tokenReducer';
import userReducer from '../Reducers/userReducer';
import budgetReducer from '../Reducers/budgetReducer';
import categoriesReducer from '../Reducers/categoriesReducer';
import expensesReducer from '../Reducers/expensesReducer';
import deletedExpensesReducer from '../Reducers/deletedExpensesReducer';
import tempDataReducer from '../Reducers/tempDataReducer';

const configureStore = () => {
  const store = createStore(
    combineReducers({
      token: tokenReducer,
      errors: errorsReducer,
      newUser: registerReducer,
      user: userReducer,
      budget: budgetReducer,
      categories: categoriesReducer,
      expenses: expensesReducer,
      deletedExpenses: deletedExpensesReducer,
      tempData: tempDataReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
