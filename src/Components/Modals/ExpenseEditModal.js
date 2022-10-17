import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { startEditExpense } from '../../Actions/expensesAction';

const ExpenseEditModal = (props) => {
  const { onHide, expense, show } = props;
  console.log('inside modal ', expense);
  console.log(expense.amount, expense.name, expense.date, expense.categoryId);
  const categories = useSelector((state) => state.categories);
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(expense.date.slice(0, 10));
  const [categoryId, setCategoryId] = useState(expense.categoryId);

  const dispatch = useDispatch();

  useEffect(() => {
    setName(expense.name);
    setAmount(expense.amount);
    setDate(expense.date.slice(0, 10));
    setCategoryId(expense.categoryId);
  }, [expense]);

  const clearFields = () => {
    setName('');
    setAmount(0);
    setDate(
      `${new Date().getFullYear()}-${String(new Date().getMonth()).padStart(
        2,
        0
      )}-${String(new Date().getDate()).padStart(2, 0)}`
    );
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
      ...expense,
      name,
      amount,
      date,
      categoryId,
    };
    console.log(expenseBody);
    dispatch(startEditExpense(expense._id, expenseBody, clearFields, onHide));
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit expense
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          </FormGroup>
          <FormGroup>
            <FormLabel>Date</FormLabel>
            <FormControl type="date" value={date} onChange={handleDateChange} />
          </FormGroup>
          <FormGroup>
            <FormLabel>Select a category</FormLabel>
            <FormSelect
              onChange={handleCategoryChange}
              defaultValue={expense.categoryId}
            >
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
            <Button
              onClick={() => {
                onHide();
              }}
            >
              Close
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default ExpenseEditModal;
