const errorsInitialState = {
  login: '',
  email: '',
  password: '',
  minAmount: '',
};

const errorsReducer = (state = errorsInitialState, action) => {
  switch (action.type) {
    case 'SET_LOGIN_ERROR': {
      return { ...state, login: action.payload };
    }
    case 'SET_REG_EMAIL_ERROR': {
      return { ...state, email: action.payload };
    }
    case 'SET_REG_PWD_ERROR': {
      return { ...state, password: action.payload };
    }
    case 'SET_CREATE_EXPENSE_ERROR': {
      return { ...state, minAmount: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default errorsReducer;
