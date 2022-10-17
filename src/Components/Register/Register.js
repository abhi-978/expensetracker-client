import React, { useState, useEffect } from 'react';
import { FloatingLabel, Form, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser, startRegisterUser } from '../../Actions/registerAction';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setLoginErrors } from '../../Actions/errorsAction';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoginErrors(''));
  }, [dispatch]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const clearfields = () => {
    setEmail('');
    setPassword('');
  };

  const errors = useSelector((state) => {
    return {
      email: state.errors.email,
      password: state.errors.password,
    };
  });

  const success = useSelector((state) => {
    return !!Object.keys(state.newUser).length && state.errors.email === '';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(startRegisterUser(userData, clearfields));
  };

  const handleClose = () => {
    dispatch(addNewUser({}));
  };

  return (
    <Container fluid>
      <Row>
        <Col></Col>
        <Col xs={7}>
          <div className="row">
            <div className="d-flex align-items-center justify-content-center mb-4 my-4">
              <h2 className="my-4">Create an account to begin</h2>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="col-5">
                <div className="mt-1 mb-1">
                  {(errors.email || errors.password) && (
                    <Alert variant="danger" className="text-center">
                      <strong>
                        {errors.email ? errors.email : errors.password}
                      </strong>
                    </Alert>
                  )}
                  {success && (
                    <Alert
                      variant="success"
                      className="text-center"
                      onClose={handleClose}
                      dismissible
                    >
                      <strong>Account successfully created</strong>
                    </Alert>
                  )}
                </div>
                <Form noValidate onSubmit={handleSubmit}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Email Address"
                    className="mb-4"
                  >
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={handleEmail}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingPassword"
                    label="Password"
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePassword}
                    />
                  </FloatingLabel>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mb-3 px-4 py-2"
                  >
                    Sign Up
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Register;
