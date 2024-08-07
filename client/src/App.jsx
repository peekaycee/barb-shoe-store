import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import ProductsList from './Components/Products/ProductsList';
import OrdersList from './Components/Orders/OrdersList';
import UsersList from './Components/Users/UsersList';
import Home from './Components/Homepage/Homepage';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import UserNavBar from './Components/Navigation/UserNavBar';
import AdminNavBar from './Components/Navigation/AdminNavBar';
import AdminProductsList from './Components/Products/AdminProductsList';
import Login from './Components/Login/Login';
import PaymentGateway from './Components/PaymentGateWay/PaymentGateway';

axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      if (!localStorage.getItem('loggedIn')) {
        navigate('/');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // Assuming you store login state in localStorage
    navigate('/');
    window.history.pushState(null, null, window.location.href);
    window.history.pushState(null, null, window.location.href);
    window.history.go(-2);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Login onLogout={handleLogout} />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/user/*" element={<UserLayout />} />
      </Routes>
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="products" element={<AdminProductsList />} />
        <Route path="orders" element={<OrdersList />} />
        <Route path="users" element={<UsersList />} />
      </Routes>
    </>
  );
}

function UserLayout() {
  return (
    <>
      <UserNavBar />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="products" element={<ProductsList />} />
        <Route path="paymentGateway" element={<PaymentGateway />} />
      </Routes>
    </>
  );
}

export default App;