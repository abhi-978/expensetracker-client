import React, { useState, useEffect } from 'react';
import {
  Col,
  Container,
  FormControl,
  Row,
  FormGroup,
  Button,
} from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { startUpdateBudget } from '../Actions/budgetAction';

const BudgetSection = (props) => {
  const defaultBalance = useSelector((state) => state.budget.balance);
  const budgetId = useSelector((state) => state.budget._id);
  const userId = useSelector((state) => state.user._id);
  const [budgetBalance, setBudgetBalance] = useState(defaultBalance);
  const [minStopper, setMinStopper] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {}, []);

  const handleChange = (e) => {
    setBudgetBalance(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budgetBalance < 1000) {
      setMinStopper(true);
    } else {
      setMinStopper(false);
      const body = {
        userId,
        balance: budgetBalance,
      };
      dispatch(startUpdateBudget(budgetId, body));
    }
  };

  return (
    <Card className="p-3" border="secondary">
      <Container>
        <div>
          <p className="fs-3">Set your Budget here</p>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label className="p-3 fs-4">Budget</Form.Label>
            </Col>
            <Col xs={9}>
              <FormGroup className="d-flex">
                <div className="col-8 p-3">
                  <FormControl
                    type="number"
                    placeholder="Enter your budget"
                    value={budgetBalance}
                    onChange={handleChange}
                  />
                  {minStopper && (
                    <Form.Text className="p-2 text-danger">
                      Budget cant be less than 1000.
                    </Form.Text>
                  )}
                </div>
                <div className="col-4 p-3">
                  <Button type="submit" className="px-5">
                    Update
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    </Card>
  );
};

export default BudgetSection;
