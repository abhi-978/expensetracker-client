import React from 'react';
import { useSelector } from 'react-redux';
import { Chart } from 'react-google-charts';
import Table from 'react-bootstrap/Table';
import { Card } from 'react-bootstrap';

const CategorySpends = (props) => {
  const categories = useSelector((state) => state.categories);
  const expenses = useSelector((state) => state.expenses);
  const expensesByCatg = expenses.reduce((acc, exp) => {
    acc[`${exp.categoryId}`]
      ? (acc[`${exp.categoryId}`] += exp.amount)
      : (acc[`${exp.categoryId}`] = exp.amount);
    return acc;
  }, {});

  const data = categories.reduce((acc, catg) => {
    const temp = [catg.name, expensesByCatg[catg._id]];
    acc.push(temp);
    return acc;
  }, []);
  data.unshift(['Category', 'Amount']);

  const options = {
    title: 'Category Split',
    titleTextStyle: {
      fontName: 'monospace',
      fontSize: '22',
    },
    is3D: true,
  };

  return (
    <Card className="d-flex align-items-center justify-content-center flex-fill">
      {data.length <= 6 ? (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={'100%'}
          height={'500px'}
        />
      ) : (
        <Table bordered className="table-light">
          <thead>
            <tr className="table-dark">
              <th>{data[0][0]}</th>
              <th>{data[0][1]}</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((el, i) => (
              <tr key={i}>
                <td>{el[0]}</td>
                <td>{el[1]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
};

export default CategorySpends;
