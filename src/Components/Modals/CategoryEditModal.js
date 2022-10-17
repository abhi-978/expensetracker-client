import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { startUpdateCategory } from '../../Actions/categoriesAction';

const CategoryEditModal = (props) => {
  const { category, show, handleClose, config } = props;
  const [name, setName] = useState(category.name);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const editedCategory = { ...category, name };
    dispatch(
      startUpdateCategory(category._id, editedCategory, handleClose, config)
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="mx-2"
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="mx-2">
                Save Changes
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default CategoryEditModal;
