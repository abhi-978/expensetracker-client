import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Pages/Home/Home';
import Profile from './Pages/Profile/Profile';
import Settings from './Pages/Settings/Settings';
import { Provider } from 'react-redux';
import configureStore from './Store/configureStore';
import PrivateOutlet from './Components/PrivateOutlet/PrivateOutlet';
import App from './App';

const store = configureStore();
// console.log('state', store.getState());

// store.subscribe(() => {
//   console.log('state updated', store.getState());
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<PrivateOutlet />}>
            <Route path="home" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
