import React, { useState } from 'react';
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { startSaveExpense } from '../../Actions/expensesAction';

const ExpenseAddModal = (props) => {
  const { onHide: handleClose } = props;
  const today = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .slice(0, 10);
  const userId = useSelector((state) => state.user._id);
  const categories = useSelector((state) => state.categories);
  const defCatgId = useSelector(
    (state) =>
      state.categories.find((catg) => catg.name === 'uncategorized')?._id
  );
  const errAmount = useSelector((state) => state.errors.minAmount);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(today);
  const [categoryId, setCategoryId] = useState(defCatgId);
  const dispatch = useDispatch();

  const clearFields = () => {
    setName('');
    setAmount('');
    setDate(today);
    setCategoryId('');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e) => {
    console.log(e.target.value);
    setDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setCategoryId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenseBody = {
      name,
      amount,
      date,
      categoryId: categoryId || defCatgId,
      userId,
    };
    console.log(expenseBody);
    dispatch(startSaveExpense(expenseBody, clearFields, handleClose));
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add an expense
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Fill expense details here</h4>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>Expense Name</FormLabel>
            <FormControl
              type="text"
              placeholder="Add expense name"
              value={name}
              onChange={handleNameChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Expense Amount</FormLabel>
            <FormControl
              type="number"
              placeholder="Add expense amount"
              value={amount}
              onChange={handleAmountChange}
            />
            <FormText className="text-danger">{errAmount}</FormText>
          </FormGroup>
          <FormGroup>
            <FormLabel>Date</FormLabel>
            <FormControl type="date" value={date} onChange={handleDateChange} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Select a category</FormLabel>
            <FormSelect onChange={handleCategoryChange}>
              <option value="">Select any category</option>
              {categories.map((catg) => (
                <option value={catg._id} key={catg._id}>
                  {catg.name}
                </option>
              ))}
            </FormSelect>
          </FormGroup>
          <FormGroup className="d-flex justify-content-end m-2">
            <Button type="submit">Save Expense</Button>
            <Button onClick={handleClose}>Close</Button>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ExpenseAddModal;
