import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Form, Accordion } from 'react-bootstrap';
import BudgetOverview from '../../Components/DataGraphs/BudgetOverview';
import CategorySpends from '../../Components/DataGraphs/CategorySpends';
import ExpenseAddModal from '../../Components/Modals/ExpenseAddModal';
import Pagination from '../../Components/Pagination/Pagination';
import ExpensesSection from '../../Helpers/ExpensesSection';
import DeletedExpensesSection from '../../Helpers/DeletedExpensesSection';
import SearchExpensesList from '../../Helpers/SearchExpensesList';

const Home = (props) => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const expenses = useSelector((state) => state.expenses);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = expenses.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(expenses.length / recordsPerPage);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Container className="d-flex flex-row justify-content-between my-4">
        <Container fluid>
          <BudgetOverview />
        </Container>
        <Container fluid className=" d-flex text-center align-items-center">
          <CategorySpends />
        </Container>
      </Container>

      <Container>
        <div className="d-flex flex-row justify-content-between mb-3">
          <div className="d-flex">
            <Button onClick={handleShow}>Add Expense</Button>
            <ExpenseAddModal
              show={show}
              onHide={() => {
                handleClose();
              }}
            />
          </div>
          <div
            className="d-flex flex-fill justify-content-end"
            style={{ gap: '20px' }}
          >
            <Form.Label className="fs-4">
              Search expenses by name or amount
            </Form.Label>
            <input
              type="text"
              className="fs-5 px-4 rounded"
              placeholder="Search expenses"
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {search ? (
          <SearchExpensesList search={search} />
        ) : (
          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <strong>Expenses</strong>
              </Accordion.Header>
              <Accordion.Body>
                <ExpensesSection expenseArr={currentRecords} />
                <Pagination
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <strong>Deleted Expenses</strong>
              </Accordion.Header>
              <Accordion.Body>
                <DeletedExpensesSection />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </Container>
    </div>
  );
};

export default Home;
