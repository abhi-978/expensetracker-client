import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import ExpenseEditModal from '../Components/Modals/ExpenseEditModal';
import { startDeleteOneExpense } from '../Actions/expensesAction';

const ExpensesSection = (props) => {
  const { expenseArr } = props;
  const categories = useSelector((state) => state.categories);
  const [show, setShow] = useState(false);
  const [exp, setExp] = useState({});
  const dispatch = useDispatch();

  const categoryName = categories.reduce((acc, catg) => {
    acc[`${catg._id}`] = `${catg.name}`;
    return acc;
  }, {});

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleEdit = (exp) => {
    setExp({ ...exp });
    handleShow();
  };

  const handleDelete = (id) => {
    dispatch(startDeleteOneExpense(id));
  };

  return (
    <div>
      {Object.keys(exp).length > 0 && (
        <ExpenseEditModal expense={exp} show={show} onHide={handleClose} />
      )}
      <Table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Item Name</th>
            <th>Amount</th>
            <th>Expense Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenseArr.map((exp) => (
            <tr key={exp._id}>
              <td>{categoryName[`${exp.categoryId}`]}</td>
              <td>{exp.name}</td>
              <td>{exp.amount}</td>
              <td>{String(new Date(exp.date)).slice(0, 15)}</td>
              <td className="d-flex justify-content-evenly">
                <Button onClick={() => handleEdit(exp)}>Edit</Button>
                <Button onClick={() => handleDelete(exp._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpensesSection;
