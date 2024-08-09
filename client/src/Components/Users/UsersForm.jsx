import './UsersForm.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UsersForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    // add function to submit form values to database here...........

    console.log(username, email, password);

    navigate('/admin/users');
  };
  return (
    <section className='userForm'>
      <h2>Add Users Details</h2>
      <form>
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
        <button type='sumbit' onClick={submitForm}>
          add user
        </button>
      </form>
    </section>
  );
};

export default UsersForm;
