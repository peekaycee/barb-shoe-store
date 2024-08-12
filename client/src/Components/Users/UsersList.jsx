import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import './UsersList.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addNewUser = () => {
    navigate('/admin/users/usersForm');
  };

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get('/users')
      .then((response) => {
        console.log('Users fetched:', response.data);
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        setError(`Error fetching users: ${error.response?.data?.message || error.message}`);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const reloadPage = () => {
    fetchUsers();
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;
  
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editUser = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className='usersList'>
      <h2>Users Details</h2>
      <button className='add-user' onClick={addNewUser}>
        Add New User
      </button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th></th>
            <th className='refresh' onClick={reloadPage}>
              <FontAwesomeIcon icon={faSync} style={{ marginLeft: '10px', cursor: 'pointer' }} />
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <p>{user.username}</p>
              </td>
              <td>
                <p>{user.email}</p>
              </td>
              <td>
                <p>{user.password}</p>
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                  onClick={() => editUser(user._id)}
                />
                </td>
                <td>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ cursor: 'pointer' }}
                  onClick={() => deleteUser(user._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default UsersList;
