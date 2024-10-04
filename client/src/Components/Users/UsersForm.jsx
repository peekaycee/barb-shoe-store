import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from '../../api/axios'; 
import './UsersForm.css';

const UsersForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    const newUser = {
      username: username, 
      email: email,
      password: password
    };
  
    try {
      const response = await axiosInstance.post('/users', newUser);
      console.log('User created:', response.data);
  
      navigate('/admin/users');
    } catch (error) {
      if (error.response) {
        console.error('Error creating user:', error.response.data.message);
      } else {
        console.error('Error creating user:', error.message);
      }
    }
  };

  return (
    <section className='userForm'>
      <div className="closeBtn" onClick={() => navigate('/admin/users')}>X</div>
      <h2>Add Users Details</h2>
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete='on'
          />
        </div>
        <div>
          <label htmlFor='email'>Email: </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete='on'
          />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete='on'
          />
        </div>
        <button type='submit'>
          Add User
        </button>
      </form>
    </section>
  );
};

export default UsersForm;