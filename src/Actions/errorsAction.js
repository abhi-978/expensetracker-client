export const setLoginErrors = (error) => {
  return {
    type: 'SET_LOGIN_ERROR',
    payload: error,
  };
};

export const setRegisterEmailError = (error) => {
  return {
    type: 'SET_REG_EMAIL_ERROR',
    payload: error,
  };
};

export const setRegisterPwdError = (error) => {
  return {
    type: 'SET_REG_PWD_ERROR',
    payload: error,
  };
};

export const setCreateExpenseError = (error) => {
  return {
    type: 'SET_CREATE_EXPENSE_ERROR',
    payload: error,
  };
};

export const setNoError = () => {
  return {
    type: 'SET_DEFAULT',
  };
};
