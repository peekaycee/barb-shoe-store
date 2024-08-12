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
import Footer from './Components/Footer/Footer';

// axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.baseURL = 'https://barb-shoe-store-9ik8.onrender.com/api';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      if (!localStorage.getItem('loggedIn')) {
        navigate('/');
        window.history.pushState(null, null, window.location.href);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // Assuming you store login state in localStorage

    // Disable forward/backward navigation by replacing the current state and history
    window.history.replaceState(null, null, window.location.href);
    navigate('/'); // Navigate to the homepage

    // Push a new state to the history to override the existing one
    window.history.pushState(null, null, window.location.href);
    window.history.pushState(null, null, window.location.href);

    // Disable back and forward navigation
    window.history.go(-window.history.length);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Login onLogout={handleLogout} />} />
        <Route path='/*' element={<NotFoundPage />} />
        <Route path='/admin/*' element={<AdminLayout />} />
        <Route path='/user/*' element={<UserLayout />} />
      </Routes>
      <Footer/>
    </>
  );
}

function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='products' element={<AdminProductsList />} />
        <Route path='products/productForm' element={<ProductForm />} />
        <Route path='products/edit/:id' element={<EditProductForm />} />
        <Route path='orders' element={<OrdersList />} />
        <Route path='users' element={<UsersList />} />
        <Route path='users/usersForm' element={<UsersForm />} />
        <Route path='users/edit/:id' element={<EditUserForm />} />
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
      </Routes>
    </>
  );
}

export default App;