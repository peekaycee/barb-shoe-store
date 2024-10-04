import { Link, NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './NavBar.css';
import { ImageLogo } from '../../../public/assets/images/index.images';

function UserNavBar() {
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
        <NavLink to={'/user/home'} className='logo'>
          <img src={ImageLogo} alt='Logo' />
        </NavLink>
        <MenuIcon className='menu-icon' onClick={handleNavbar} />
      </div>
      <nav className='navbar users'>
        <ul>
          <li>
            <Link to='/user/home' className='navlinks active'>
              Home
            </Link>
          </li>
          <li>
            <Link to='/user/products' className='navlinks'>
              Products
            </Link>
          </li>
          <li>
            <Link to='/' className='navlinks' onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>

      {/* Responsive navigation bar */}
      <nav className='responsive-navbar'>
        <ul>
          <li>
            <Link
              to='/user/home'
              className='navlinks active'
              onClick={handleNavbar}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to='/user/products'
              className='navlinks'
              onClick={handleNavbar}>
              Products
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
}

export default UserNavBar;
