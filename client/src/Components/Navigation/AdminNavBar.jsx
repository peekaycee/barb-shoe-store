import { Link, NavLink } from 'react-router-dom';
import './NavBar.css'

const AdminNavBar = () => {
  return (
    <>
         <NavLink to={'/admin/home'} className='logo'>BSS</NavLink>    
        <nav className='navbar'>
        <ul>
          <li>
            <Link to='/admin/home' className='navlinks active'>Home</Link>
          </li>
          <li>
            <Link to='/admin/products' className='navlinks'>Products</Link>
          </li>
          <li>
            <Link to='/admin/orders' className='navlinks'>Orders</Link>
          </li>
          <li>
            <Link to='/admin/users' className='navlinks'>Users</Link>
          </li>
          <li>
            <Link to='/' className='navlinks'>Logout</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default AdminNavBar
