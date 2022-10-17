import React from 'react';
import { Card } from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import './styles.css';
import { useSelector } from 'react-redux';

const BudgetOverview = (props) => {
  const expenses = useSelector((state) => state.expenses);
  const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const budgetAmount = useSelector((state) => state.budget.balance);
  let remBudget =
    budgetAmount - totalExpenses < 0 ? 0 : budgetAmount - totalExpenses;

  const data = [
    ['Name', 'Amount'],
    ['Remaining Budget', remBudget],
    ['Expenses', totalExpenses],
  ];

  const options = {
    title: 'Budget Overview',
    titleTextStyle: {
      fontName: 'monospace',
      fontSize: '22',
    },
    pieHole: 0.55,
    is3D: false,
  };

  return (
    <Card id="donutchart" className="">
      <Chart
        chartType="PieChart"
        width="100%"
        height="500px"
        data={data}
        options={options}
        id="chart"
      />

      <div id="labelOverlay">
        <p className="used-size">
          {remBudget > 0 ? (
            <>
              {Math.round((totalExpenses / budgetAmount) * 100)}
              <span>%</span>
            </>
          ) : (
            <>{'limit'}</>
          )}
        </p>
        <p className="total-size py-2">{remBudget > 0 ? 'Used' : 'Crossed'}</p>
      </div>
    </Card>
  );
};

export default BudgetOverview;
