import axios from 'axios';
import { config } from '../Helpers/axiosConfig';

export const startSetBudget = (body, config) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3058/api/budget', body, config)
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
    axios
      .put(`http://localhost:3058/api/budget/${id}`, body, config)
      .then((response) => {
        console.log(response.data);
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
    axios
      .get(`http://localhost:3058/api/budget/${id}`, config)
      .then((response) => {
        console.log(response.data);
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
