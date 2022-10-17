import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import {
  startGetDeletedExpenses,
  startRestoreDeletedExpense,
} from '../Actions/deletedExpensesAction';

const DeletedExpensesSection = (props) => {
  const deletedExpenses = useSelector((state) => state.deletedExpenses);
  const categories = useSelector((state) => state.categories);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      dispatch(startGetDeletedExpenses(config));
    }
  }, [token, dispatch]);

  const categoryName = categories.reduce((acc, catg) => {
    acc[`${catg._id}`] = `${catg.name}`;
    return acc;
  }, {});

  const handleRestore = (id) => {
    dispatch(startRestoreDeletedExpense(id, token));
  };

  return (
    <div>
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
          {deletedExpenses.map((exp) => (
            <tr key={exp._id}>
              <td>{categoryName[`${exp.categoryId}`]}</td>
              <td>{exp.name}</td>
              <td>{exp.amount}</td>
              <td>{String(new Date(exp.date)).slice(0, 15)}</td>
              <td className="d-flex justify-content-evenly">
                <Button
                  onClick={() => {
                    handleRestore(exp._id);
                  }}
                >
                  Restore
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DeletedExpensesSection;
