import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table, Card } from 'react-bootstrap';

const SearchExpensesList = (props) => {
  const { search } = props;
  const [results, setResults] = useState([]);
  const expenses = useSelector((state) => state.expenses);
  const deletedExpenses = useSelector((state) => state.deletedExpenses);
  const categories = useSelector((state) => state.categories);
  const categoryName = categories.reduce((acc, catg) => {
    acc[`${catg._id}`] = `${catg.name}`;
    return acc;
  }, {});

  useEffect(() => {
    const exps = expenses.filter(
      (exp) => exp.name.includes(search) || String(exp.amount).includes(search)
    );
    const delExps = deletedExpenses.filter(
      (exp) => exp.name.includes(search) || String(exp.amount).includes(search)
    );
    setResults([...exps, ...delExps]);
  }, [search, expenses, deletedExpenses]);

  return (
    <div>
      {results.length > 0 ? (
        <>
          <p className="m-2 fs-5">{results.length} entries found</p>
          <Card>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Item Name</th>
                    <th>Amount</th>
                    <th>Expense Date</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((exp) => (
                    <tr key={exp._id}>
                      <td>{categoryName[`${exp.categoryId}`]}</td>
                      <td>{exp.name}</td>
                      <td>{exp.amount}</td>
                      <td>{String(new Date(exp.date)).slice(0, 15)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      ) : (
        <div className="fs-5 text-center m-4">No Results to display</div>
      )}
    </div>
  );
};

export default SearchExpensesList;
