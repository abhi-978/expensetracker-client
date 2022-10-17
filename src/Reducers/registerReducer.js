const registerInitialState = {};

const registerReducer = (state = registerInitialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_USER': {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default registerReducer;
