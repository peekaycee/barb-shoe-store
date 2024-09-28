import { useEffect } from 'react';
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
import ProductForm from './Components/Products/ProductForm';
import UsersForm from './Components/Users/UsersForm';
import EditUserForm from './Components/Users/EditUserForm';
import EditProductForm from './Components/Products/EditProductForm';
import Dashboard from './Components/Dashboard/Dashboard';

axios.defaults.baseURL = 'https://barb-shoe-store-9ik8.onrender.com/api';
// axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const handlePopState = (event) => {
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

    // Replace the current state and navigate to the homepage
    navigate('/');
    window.history.replaceState(null, null, window.location.href);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Login onLogout={handleLogout} />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/admin/*' element={<AdminLayout />} />
        <Route path='/user/*' element={<UserLayout />} />
      </Routes>
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Routes>
        <Route path='home' element={<Home admin={true} />} />
        <Route path='products' element={<AdminProductsList />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='products/productForm' element={<ProductForm />} />
        <Route path='products/edit/:id' element={<EditProductForm />} />
        <Route path='orders' element={<OrdersList />} />
        <Route path='users' element={<UsersList />} />
        <Route path='users/usersForm' element={<UsersForm />} />
        <Route path='users/edit/:id' element={<EditUserForm />} />
        <Route path='*' element={<NotFoundPage />} />{' '}
        {/* Catch-all for not found */}
      </Routes>
    </>
  );
}

function UserLayout() {
  return (
    <>
      <UserNavBar />
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='products' element={<ProductsList />} />
        <Route path='paymentGateway' element={<PaymentGateway />} />
        <Route path='*' element={<NotFoundPage />} />{' '}
        {/* Catch-all for not found */}
      </Routes>
    </>
  );
}

export default App;
