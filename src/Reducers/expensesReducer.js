const expensesInitialState = [];

const expenseReducer = (state = expensesInitialState, action) => {
  switch (action.type) {
    case 'GET_ALL_EXPENSES': {
      return [...action.payload];
    }
    case 'SAVE_NEW_EXPENSE': {
      return [...state, { ...action.payload }];
    }
    case 'EDIT_ONE_EXPENSE': {
      return state.map((exp) =>
        exp._id === action.payload._id ? { ...action.payload } : { ...exp }
      );
    }
    case 'DELETE_ONE_EXPENSE': {
      return state.filter((exp) => exp._id !== action.payload);
    }
    default: {
      return state;
    }
  }
};

export default expenseReducer;
