const tempDataInitialState = {
  expense: {},
};

const tempDataReducer = (state = tempDataInitialState, action) => {
  switch (action.type) {
    case 'GET_ONE_EXPENSE': {
      return { ...state, expense: { ...action.payload } };
    }
    default: {
      return state;
    }
  }
};

export default tempDataReducer;
