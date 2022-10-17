const deletedExpensesInitialState = [];

const deletedExpensesReducer = (
  state = deletedExpensesInitialState,
  action
) => {
  switch (action.type) {
    case 'GET_DELETED_EXPENSES': {
      return [...action.payload];
    }
    case 'RESTORE_DELETED_EXPENSE': {
      return state.filter((exp) => exp._id !== action.payload);
    }
    default: {
      return state;
    }
  }
};

export default deletedExpensesReducer;
