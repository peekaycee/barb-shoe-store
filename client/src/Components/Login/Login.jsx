import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';
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
import { ImageLogo } from '../../../public/assets/images/index.images';           // *** changed
import WhiteCanvas from '../../../public/assets/images/white-canvas.jpg';    // *** changed

function Login() {
  //  ********* section one ************

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [initialState, setInitialState] = useState({});
  const [initialState, setInitialState] = useState({ username: '', email: '', password: '' });    // *** changed
  const [loading, setLoading] = useState(false); // * changed
  const [errorMessage, setErrorMessage] = useState('');
  const [hideLoginForm, setHideLoginForm] = useState('hide');
  const [hideRegisterForm, setHideRegisterForm] = useState('');
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
  const adminPassword = 'admin123'; // * changed

  const shoes = [Shoe1, Shoe2, Shoe3, Shoe4, Shoe5, Shoe6, Shoe7, Shoe8];
  const navigate = useNavigate();

  //  ********* section two ************

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

  //  ********* section three ************

  // const handleAdminLogin = (e) => {
  //   e.preventDefault();
  //   if (password === 'admin123') {
  //     localStorage.setItem('loggedIn', 'admin'); // Set loggedIn status
  //     navigate('/admin/home');
  //   } else {
  //     setErrorMessage('Invalid admin password');
  //   }
  // };

  // const handleUserLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const { data: users } = await axiosInstance.get('/users'); // Use axiosInstance
  //     // Fetch the list of users
  //     // const response = await axios.get('/users');
  //     // const users = response.data;

  //     // Check if the entered password matches any user password
  //     const validUser = users.find((user) => user.password === password);

  //     if (validUser) {
  //       localStorage.setItem('loggedIn', 'user');
  //       navigate('/user/home');
  //     } else {
  //       setErrorMessage('Invalid user password');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //     setErrorMessage('Error fetching users. Please try again.');
  //   }
  // };
  // ******* chnaged below ****************

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

  //  **************** Section four *****************

  // const submitLoginForm = (e) => {
  //   e.preventDefault();
  //   setHideLoginForm('');
  // };

  // const submitRegisterForm = async (e) => {
  //   e.preventDefault();

  //   if (!hasFormChanged()) {
  //     setErrorMessage('No changes made to the form.');
  //     return;
  //   }

  //   const userDetail = {
  //     username,
  //     email,
  //     password,
  //   };

  //   try {
  //     // Send POST request to create a new user
  //     const response = await axiosInstance.post('/users', userDetail);
  //     console.log('User created:', response.data);

  //     // Reset the form to initial state
  //     setUsername('');
  //     setEmail('');
  //     setPassword('');
  //     setInitialState({ username: '', email: '', password: '' });
  //     setErrorMessage('');
  //     setHideRegisterForm('hide');
  //     setHideLoginForm('');
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     setErrorMessage('Failed to register. Please try again.');
  //   }
  // };

  // *************** Changed below ****************
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

  //  **************** Section five *****************
  // const switchToLoginForm = () => {
  //   setHideRegisterForm('hide');
  //   setHideLoginForm('');
  //   setErrorMessage('');
  // };
  //  ************* changed below **************
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
        <img src='/assets/images/logo2.png' alt='Barb Shoe Store Logo' />
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
