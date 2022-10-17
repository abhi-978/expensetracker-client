import React, { useEffect } from 'react';
import NavBar from './Components/NavBar/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSavedToken } from './Actions/tokenAction';
import { startGetUserDetails } from './Actions/userAction';

const App = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(setSavedToken(localStorage.getItem('token')));
      dispatch(startGetUserDetails(token || localStorage.getItem('token')));
    } else {
      if (!localStorage.getItem('token')) navigate('/login');
    }
  }, [dispatch, token, navigate]);

  return (
    <div>
      <NavBar />
      <Container fluid className="mr-3 my-4">
        <Outlet />
      </Container>
    </div>
  );
};

export default App;
