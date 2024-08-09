import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UsersForm.css';

const EditUserForm = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the user data by ID
    axios.get(`/users/${id}`)
      .then(response => {
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setPassword(user.password);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: username,
      email: email,
      password: password
    };

    try {
      console.log('Submitting updated user data:', updatedUser);
      const response = await axios.put(`/users/${id}`, updatedUser); // Use PUT for consistency
      console.log('User updated:', response.data);
      navigate('/admin/users');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <section className='userForm'>
      <h2>Edit User Details</h2>
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
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default EditUserForm;