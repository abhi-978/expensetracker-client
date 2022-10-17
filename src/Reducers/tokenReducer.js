const tokenInitialState = '';

const tokenReducer = (state = tokenInitialState, action) => {
  switch (action.type) {
    case 'SET_USER_TOKEN': {
      return action.payload;
    }
    case 'REMOVE_USER_TOKEN': {
      localStorage.removeItem('token');
      return tokenInitialState;
    }
    case 'SET_SAVED_TOKEN': {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default tokenReducer;
