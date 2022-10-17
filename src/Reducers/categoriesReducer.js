const categoriesInitialState = [];

const categoriesReducer = (state = categoriesInitialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES': {
      return [...action.payload];
    }
    case 'UPDATE_CATEGORY': {
      return state.map((cat) =>
        cat._id === action.payload._id ? { ...action.payload } : { ...cat }
      );
    }
    case 'SAVE_CATEGORY': {
      return [...state, { ...action.payload }];
    }
    case 'DELETE_CATEGORY': {
      return state.filter((cat) => cat._id !== action.payload._id);
    }
    default: {
      return state;
    }
  }
};

export default categoriesReducer;
