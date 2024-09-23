import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initialState, setInitialState] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [hideLoginForm, setHideLoginForm] = useState('hide');
  const [hideRegisterForm, setHideRegisterForm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Disable forward and backward navigation
    window.history.pushState(null, null, window.location.href);
    window.history.pushState(null, null, window.location.href);
    window.history.go(-2);

    // Store the initial state
    setInitialState({
      username: '',
      email: '',
      password: ''
    });
  }, []);

  const hasFormChanged = () => {
    return (
      username !== initialState.username || 
      email !== initialState.email || 
      password !== initialState.password
    );
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('loggedIn', 'admin'); // Set loggedIn status
      navigate('/admin/home');
    } else {
      setErrorMessage('Invalid admin password');
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch the list of users
      const response = await axios.get('/users');
      const users = response.data;

      // Check if the entered password matches any user password
      const validUser = users.find(user => user.password === password);

      if (validUser) {
        localStorage.setItem('loggedIn', 'user'); // Set loggedIn status
        navigate('/user/home');
      } else {
        setErrorMessage('Invalid user password');
      }

    } catch (error) {
      console.error('Error fetching users:', error);
      setErrorMessage('Error fetching users. Please try again.');
    }
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    setHideLoginForm('');
  };

  const submitRegisterForm = async (e) => {
    e.preventDefault();

    if (!hasFormChanged()) {
      setErrorMessage('No changes made to the form.');
      return;
    }

    const userDetail = {
      username,
      email,
      password,
    };

    try {
      // Send POST request to create a new user
      const response = await axios.post('/users', userDetail);
      console.log('User created:', response.data);

      // Reset the form to initial state
      setUsername('');
      setEmail('');
      setPassword('');
      setInitialState({ username: '', email: '', password: '' });
      setErrorMessage('');
      setHideRegisterForm('hide');
      setHideLoginForm('');

    } catch (error) {
      console.error('Error creating user:', error);
      setErrorMessage('Failed to register. Please try again.');
    }
  };

  const switchToLoginForm = () => {
    setHideRegisterForm('hide');
    setHideLoginForm('');
    setErrorMessage(''); // Clear any error messages when switching to the login form
  };

  return (
    <>
      <section className='login-container'>
        <div className='sign-post'>
          <div className='barb'>
            <h1>BARB</h1>
          </div>
          <div className='shoe-store'>
            <div className='s'>S</div>
            <div className='others'>
              <div className='complete'>
                <h2>hoe</h2>
              </div>
              <div className='complete'>
                <h2>tore</h2>
              </div>
            </div>
          </div>
        </div>

        <form className='register' id={hideRegisterForm} onSubmit={submitRegisterForm}>
          <h2>Register</h2>
          <div className='input-fields'>
            <div className='username'>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter username'
                autoComplete='on'
              />
            </div>
            <div className='email'>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter email'
                autoComplete='on'
              />
            </div>
            <div className='password'>
              <input
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
                autoComplete='on'
              />
            </div>
          </div>
          <button type='submit' className='submitBtn'>
            Submit
          </button>
          {errorMessage && hideRegisterForm === '' && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <p className='login-link'>
            Have an account? <em onClick={switchToLoginForm}>login...</em>
          </p>
        </form>

        <form className='login-credentials' id={hideLoginForm} onSubmit={submitLoginForm}>
          <h2>Login</h2>
          <div className='input-fields'>
            <div>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter password'
              />
            </div>
            <div className='login-buttons'>
              <button onClick={handleAdminLogin}>Login as Admin</button>
              <button onClick={handleUserLogin}>Login as User</button>
            </div>
            <div className='error'>
              {errorMessage && hideLoginForm === '' && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;