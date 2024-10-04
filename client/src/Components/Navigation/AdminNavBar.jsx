import { Link, NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';
import { ImageLogo } from '../../../public/assets/images/index.images';

const AdminNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedIn'); // Clear user session
    navigate('/');
  };

  const handleNavbar = () => {
    const navMenu = document.querySelector('.responsive-navbar');
    if (navMenu) {
      navMenu.style.display =
        navMenu.style.display === 'block' ? 'none' : 'block';
    }
  };

  return (
    <>
      <div className='logo-container'>
        <NavLink to={'/admin/home'} className='logo'>
          <img src={ImageLogo} alt='Logo' />
        </NavLink>
        <MenuIcon className='menu-icon' onClick={handleNavbar} />
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
            <Link to='/' className='navlinks' onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      {/* Desktop/mobile navigation bar */}
      <nav className='responsive-navbar'>
        <ul>
          <li>
            <Link
              to='/admin/home'
              className='navlinks active'
              onClick={handleNavbar}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/admin/products'
              className='navlinks'
              onClick={handleNavbar}>
              Products
            </Link>
          </li>
          <li>
            <Link
              to='/admin/orders'
              className='navlinks'
              onClick={handleNavbar}>
              Orders
            </Link>
          </li>
          <li>
            <Link to='/admin/users' className='navlinks' onClick={handleNavbar}>
              Users
            </Link>
          </li>
          <li>
            <Link to='/' className='navlinks' onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminNavBar;
