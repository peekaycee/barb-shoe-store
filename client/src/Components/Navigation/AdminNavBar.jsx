import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import { ImageLogo } from '../../../public/assets/images/index.images';

const AdminNavBar = () => {
  return (
    <>
      <div className='logo-container'>
        <NavLink to={'/admin/home'} className='logo'>
          <img src={ImageLogo} alt="Logo" />
        </NavLink>
        <div className="menu-icon">
          <img src="../../assets/images/menu.png" alt="Menu Icon" />
        </div>
      </div>
      <nav className='navbar'>
        <ul>
          <li>
            <Link to='/admin/home' className='navlinks active'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/admin/products' className='navlinks'>
              Products
            </Link>
          </li>
          <li>
            <Link to='/admin/orders' className='navlinks'>
              Orders
            </Link>
          </li>
          <li>
            <Link to='/admin/users' className='navlinks'>
              Users
            </Link>
          </li>
          <li>
            <Link to='/' className='navlinks'>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavBar;
