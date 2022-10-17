const budgetInitialState = {};

const budgetReducer = (state = budgetInitialState, action) => {
  switch (action.type) {
    case 'SET_DEFAULT_BUDGET': {
      return { ...action.payload };
    }
    case 'SHOW_BUDGET': {
      return { ...action.payload };
    }
    case 'EDIT_BUDGET': {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default budgetReducer;
