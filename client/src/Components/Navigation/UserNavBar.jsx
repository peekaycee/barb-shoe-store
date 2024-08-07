import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

function UserNavBar() {
  return (
    <>
        <NavLink to={'/user/home'} className='logo'>BSS</NavLink>
      <nav className='navbar'>
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
