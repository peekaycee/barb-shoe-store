import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import { ImageLogo } from '../../../public/assets/images/index.images';

function UserNavBar() {
  return (
    <>
    <div className='logo-container'>
        <NavLink to={'/user/home'} className='logo'>
          <img src={ImageLogo} alt="Logo" />
        </NavLink>
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
            <Link to='/' className='navlinks'>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default UserNavBar;
