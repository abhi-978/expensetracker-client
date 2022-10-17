import axios from 'axios';

export const startGetCategories = (config) => {
  return (dispatch) => {
    axios
      .get('http://localhost:3058/api/categories', config)
      .then((response) => {
        dispatch(setCategories(response.data));
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
};

export const setCategories = (categories) => {
  return {
    type: 'SET_CATEGORIES',
    payload: categories,
  };
};

export const startUpdateCategory = (id, body, handleClose, config) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:3058/api/categories/${id}`, body, config)
      .then((response) => {
        dispatch(updateCategory(response.data));
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateCategory = (category) => {
  return {
    type: 'UPDATE_CATEGORY',
    payload: category,
  };
};

export const startSaveCategory = (body, clearFields, config) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3058/api/categories`, body, config)
      .then((response) => {
        dispatch(saveCategory(response.data));
        clearFields();
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const saveCategory = (category) => {
  return {
    type: 'SAVE_CATEGORY',
    payload: category,
  };
};

export const startDeleteCategory = (id, config) => {
  return (dispatch) => {
    axios
      .delete(`http://localhost:3058/api/categories/${id}`, config)
      .then((response) => {
        dispatch(deleteCategory(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteCategory = (category) => {
  return {
    type: 'DELETE_CATEGORY',
    payload: category,
  };
};

export const setDefaultCategory = () => {
  return {
    type: 'SET_DEFAULT',
  };
};
