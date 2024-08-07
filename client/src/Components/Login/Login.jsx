import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Disable forward and backward navigation
    window.history.pushState(null, null, window.location.href);
    window.history.pushState(null, null, window.location.href);
    window.history.go(-2);
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('loggedIn', 'admin'); // Set loggedIn status
      navigate('/admin/home');
    } else {
      setErrorMessage('Invalid admin password');
    }
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    if (password === 'user123') {
      localStorage.setItem('loggedIn', 'user'); // Set loggedIn status
      navigate('/user/home');
    } else {
      setErrorMessage('Invalid user password');
    }
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

        <form className='register'>
          <h2>Register</h2>
          <div className='input-fields'>
            <div className='username'>
              <input
                type='text'
                id='username'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter username'
                autoComplete='on'
              />
            </div>
            <div className='email'>
              <input
                type='email'
                id='email'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
        </form>

        <form className='login-credentials'>
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
            <div className='buttons'>
              <button onClick={handleAdminLogin}>Login as Admin</button>
              <button onClick={handleUserLogin}>Login as User</button>
            </div>
            <div className='error'>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
