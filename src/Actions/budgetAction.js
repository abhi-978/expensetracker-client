import axiosWithHeaders from '../Helpers/axiosConfig';

export const startSetBudget = (body) => {
  return (dispatch) => {
    axiosWithHeaders
      .post('/api/budget', body)
      .then((response) => {
        dispatch(setBudget(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const setBudget = (budget) => {
  return {
    type: 'SET_DEFAULT_BUDGET',
    payload: budget,
  };
};

export const startUpdateBudget = (id, body) => {
  return (dispatch) => {
    axiosWithHeaders
      .put(`/api/budget/${id}`, body)
      .then((response) => {
        dispatch(updateBudget(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateBudget = (budget) => {
  return {
    type: 'EDIT_BUDGET',
    payload: budget,
  };
};

export const startGetBudget = (id) => {
  return (dispatch) => {
    axiosWithHeaders
      .get(`/api/budget/${id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(setBudget(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getBudget = (budget) => {
  return {
    type: 'SHOW_BUDGET',
    payload: budget,
  };
};

export const setDefaultBudget = () => {
  return {
    type: 'SET_DEFAULT',
  };
};
