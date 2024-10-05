import { Link, NavLink, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
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
    const navBackground = document.querySelector('.logo-container');
    const navBackgroundSvg = document.querySelector('.logo-container > svg');
    const navBackgroundLogo = document.querySelector('.logo-container img');
    if (navMenu) {
      navMenu.style.display = (navMenu.style.display === 'block') ? 'none' : 'block';
      navBackground.style.backgroundColor = (navMenu.style.display === 'none') ? null : '#480505';
      navBackgroundSvg.style.color = (navMenu.style.display === 'none') ? null : '#e7e7e7';
      navBackgroundLogo.src = (navMenu.style.display === 'none') ? ImageLogo : '/assets/images/logo2.svg';
    }
  };

  const handleClickOutside = (event) => {
    const navMenu = document.querySelector('.responsive-navbar');
    const navBackground = document.querySelector('.logo-container');
    const navBackgroundSvg = document.querySelector('.logo-container > svg');
    const navBackgroundLogo = document.querySelector('.logo-container img');
    const menuIcon = document.querySelector('.menu-icon');
    // Check if the clicked element is outside the navbar or the menu icon
    if (navMenu && navMenu.style.display === 'block' && !navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
      navMenu.style.display = 'none';
      navBackground.style.backgroundColor = null;
      navBackgroundSvg.style.color = null;
      navBackgroundLogo.src = ImageLogo;
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the navbar
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

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
            <Link to='/' className='navlinks last' onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default UserNavBar;
