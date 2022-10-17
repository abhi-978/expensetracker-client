import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLoginUser } from '../../Actions/tokenAction';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import { addNewUser } from '../../Actions/registerAction';
import {
  setRegisterEmailError,
  setRegisterPwdError,
} from '../../Actions/errorsAction';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector((state) => {
    return state.errors.login;
  });

  const token = useSelector((state) => {
    return state.token;
  });

  useEffect(() => {
    dispatch(addNewUser({}));
    dispatch(setRegisterEmailError(''));
    dispatch(setRegisterPwdError(''));
  }, [dispatch]);

  useEffect(() => {
    if (token === localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [token, navigate]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userCreds = { email, password };
    dispatch(startLoginUser(userCreds, clearfields));
  };

  return (
    <Container fluid>
      <div className="row">
        <div className="col-7 d-flex align-items-center justify-content-center">
          <img src="tracker.jpg" alt="tracker" width="60%" />
        </div>
        <div className="col-5 d-flex align-items-center justify-content-center">
          <div className="col-7">
            <h3 className="mb-4">Track your expenses </h3>
            <div className="mt-1 mb-1">
              {error && (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              )}
            </div>
            <Form noValidate onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
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

              <Button variant="primary" type="submit" className="mb-3">
                Login
              </Button>
            </Form>
            <Button
              variant="link"
              className="text-decoration-none p-0"
              onClick={() => {
                navigate('/register');
              }}
            >
              Dont have an account. Sign Up here
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;
