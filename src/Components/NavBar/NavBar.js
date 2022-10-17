import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import logoutUser from '../../Helpers/logoutUser';
import { useDispatch } from 'react-redux';

const NavBar = (props) => {
  const navigate = useNavigate();
  const userLoggedIn = !!localStorage.getItem('token');
  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch()
    logoutUser(dispatch);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid className="px-5">
        <Navbar.Brand>ExpenseTracker</Navbar.Brand>
        <Nav className="me-auto">
          {userLoggedIn && (
            <>
              <Nav.Link
                onClick={() => {
                  navigate('/home');
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate('/settings');
                }}
              >
                Settings
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate('/profile');
                }}
              >
                Profile
              </Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {userLoggedIn ? (
            <Nav.Link>
              <Button onClick={handleLogout} className="text-center">
                Logout
              </Button>
            </Nav.Link>
          ) : (
            <>
              <Nav.Link
                onClick={() => {
                  navigate('/login');
                }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate('/register');
                }}
              >
                Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
