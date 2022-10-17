import React, { useState } from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  FormGroup,
  FormControl,
  FormText,
  FormLabel,
  Button,
} from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  startSaveCategory,
  startDeleteCategory,
} from '../Actions/categoriesAction';
import CategoryEditModal from '../Components/Modals/CategoryEditModal';

const CategoriesSection = (props) => {
  const [newCatg, setNewCatg] = useState('');
  const [minStopper, setMinStopper] = useState(false);
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.categories);
  const userId = useSelector((state) => state.user._id);

  const handleChange = (e) => {
    setNewCatg(e.target.value);
  };

  const clearFields = () => {
    setNewCatg('');
  };

  const handleAddCategory = () => {
    const newCategory = {
      userId,
      name: newCatg,
    };
    dispatch(startSaveCategory(newCategory, clearFields));
  };

  const handleDeleteCategory = (id) => {
    dispatch(startDeleteCategory(id));
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleEditCategory = () => {
    handleShow();
  };

  return (
    <Card className="p-4" border="secondary">
      <div className="mb-2">
        <p className="fs-3">Categories</p>
      </div>
      <div className="mb-3">
        <Form>
          <Row>
            <Col>
              <FormLabel className="p-3 fs-4">Add a new category</FormLabel>
            </Col>
            <Col xs={9}>
              <FormGroup className="d-flex p-3">
                <div className="col-8">
                  <FormControl
                    type="text"
                    placeholder="Category Name"
                    value={newCatg}
                    onChange={handleChange}
                  />
                  {minStopper && (
                    <FormText className="p-2 text-danger">{'aaa'}</FormText>
                  )}
                </div>
                <div className="col-4 px-4">
                  <Button className="px-5" onClick={handleAddCategory}>
                    Add
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <div>
          <ListGroup className="col-7 p-2">
            {categories.map((catg) => (
              <ListGroup.Item key={catg._id}>
                <Row>
                  <Col xs={8} className="d-flex align-items-center">
                    {catg.name}
                  </Col>
                  <Col xs={2}>
                    <Button
                      onClick={handleEditCategory}
                      disabled={catg.name === 'uncategorized'}
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col xs={2}>
                    <Button
                      onClick={() => {
                        handleDeleteCategory(catg._id);
                      }}
                      disabled={catg.name === 'uncategorized'}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
                <CategoryEditModal
                  show={show}
                  category={catg}
                  handleClose={handleClose}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </Card>
  );
};

export default CategoriesSection;
