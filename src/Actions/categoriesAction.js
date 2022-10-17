import axiosWithHeaders from '../Helpers/axiosConfig';

export const startGetCategories = () => {
  return (dispatch) => {
    axiosWithHeaders
      .get('/api/categories')
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

export const startUpdateCategory = (id, body, handleClose) => {
  return (dispatch) => {
    axiosWithHeaders
      .put(`/api/categories/${id}`, body)
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

export const startSaveCategory = (body, clearFields) => {
  return (dispatch) => {
    axiosWithHeaders
      .post(`/api/categories`, body)
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

export const startDeleteCategory = (id) => {
  return (dispatch) => {
    axiosWithHeaders
      .delete(`/api/categories/${id}`)
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
