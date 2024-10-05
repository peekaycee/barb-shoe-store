import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import './Login.css';
import {
  Shoe1,
  Shoe2,
  Shoe3,
  Shoe4,
  Shoe5,
  Shoe6,
  Shoe7,
  Shoe8,
} from '../../../public/assets/galleryImages/gallery.images';
import { ImageLogo } from '../../../public/assets/images/index.images'; 
import WhiteCanvas from '../../../public/assets/images/white-canvas.jpg'; 

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initialState, setInitialState] = useState({ username: '', email: '', password: '' });   
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const [hideLoginForm, setHideLoginForm] = useState('hide');
  const [hideRegisterForm, setHideRegisterForm] = useState('');
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
  const shoes = [Shoe1, Shoe2, Shoe3, Shoe4, Shoe5, Shoe6, Shoe7, Shoe8];
  const navigate = useNavigate();
  const adminPassword = 'admin123'; 


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShoeIndex((prevIndex) => (prevIndex + 1) % shoes.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [shoes.length]);

  useEffect(() => {
    // Disable forward and backward navigation
    window.history.pushState(null, null, window.location.href);
    window.history.pushState(null, null, window.location.href);
    window.history.go(-2);

    // Store the initial state
    setInitialState({
      username: '',
      email: '',
      password: '',
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    // Check if the password is for admin
    if (password === adminPassword) {
      localStorage.setItem('loggedIn', 'admin');
      navigate('/admin/home', { state: { fromLogin: true } }); // Pass fromLogin flag for admin
      setLoading(false); // Reset loading state
      return;
    }

    // Check if it's a user by fetching from the backend
    try {
      const { data: users } = await axiosInstance.get('/users'); // Use axiosInstance
      const validUser = users.find(user => user.password === password);

      if (validUser) {
        localStorage.setItem('loggedIn', 'user');
        localStorage.setItem('username', validUser.username); // Store the username
        navigate('/user/home', { state: { fromLogin: true } }); // Pass fromLogin flag for user
      } else {
        setErrorMessage('Invalid user password');
      }
    } catch (error) {
      // Centralized error handling
      const message = error.response?.data?.message || 'Error fetching users. Please try again.';
      setErrorMessage(message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const hasFormChanged = () => {
    return (
      username !== initialState.username ||
      email !== initialState.email ||
      password !== initialState.password
    );
  };

  const submitRegisterForm = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (!hasFormChanged()) {
      setErrorMessage('No changes made to the form.');
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      await axiosInstance.post('/users', { username, email, password }); // Use axiosInstance

      // Reset the form to initial state
      setUsername(initialState.username);
      setEmail(initialState.email);
      setPassword(initialState.password);
      setErrorMessage('');
      setHideRegisterForm('hide');
      setHideLoginForm('');
      setInitialState({ username: '', email: '', password: '' }); // Reset initial state
    } catch (error) {
      // Centralized error handling
      const message = error.response?.data?.message || 'Failed to register. Please try again.';
      setErrorMessage(message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const switchToLoginForm = () => {
    setHideRegisterForm('hide');
    setHideLoginForm('');
    setErrorMessage('');
    setUsername(initialState.username);
    setEmail(initialState.email);
    setPassword(initialState.password);
  };

  return (
    <section className='login-container'>
      <div className='sign-post'>
        <img src={'/public/assets/images/logo2.png'} alt='Barb Shoe Store Logo' />
        <h1>Barb Shoe Store</h1>
        <p>Fit, Style, and Comfort for Every Foot</p>
        <div className='login-gallery'>
          <img src={shoes[currentShoeIndex]} alt={`Shoe ${currentShoeIndex}`} />
        </div>
      </div>

      {/* Register Form */}
      <form
        className='register'
        id={hideRegisterForm}
        onSubmit={submitRegisterForm}>
        <div className='brand'>
          <div className='overlay'></div>
          <div className='shoe-image'>
            <img src={WhiteCanvas} alt='Image of a brown shoe' />
          </div>
          <div className='brand-details'>
            <img src={ImageLogo} alt='Brand Logo' />
            <h1>Barb Shoe Store</h1>
            <p className='text'>Fit, Style, and Comfort for Every Foot</p>
            <h3 className='reg-text'>Register</h3>
          </div>
        </div>

        
        <h2>Register</h2>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <p>
          Have an account? <em onClick={switchToLoginForm}>Login...</em>
        </p>
      </form>

      {/* Login Form */}
      <form
        className='login-credentials'
        id={hideLoginForm}
        onSubmit={handleLogin}>
        <div className='brand'>
          <div className='overlay'></div>
          <div className='shoe-image'>
            <img src={WhiteCanvas} alt='Image of a brown shoe' />
          </div>
          <div className='brand-details'>
            <img src={ImageLogo} alt='Brand Logo' />
            <h1>Barb Shoe Store</h1>
            <p className='text'>Fit, Style, and Comfort for Every Foot</p>
            <h3 className='reg-text'>Login</h3>
          </div>
        </div>
        <h2>Login</h2>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Submit'}
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </section>
  );
}

export default Login;
