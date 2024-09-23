import { NavLink } from 'react-router-dom';
import './Homepage.css';

// eslint-disable-next-line react/prop-types
function Home({ admin }) {
  return (
    <>
      <section className='home-container'>
        <div className='homepage-content'>
          <h1>Fit, Style, and Comfort for Every Foot.</h1>
          <p>
            We specialize in creating custom-made shoes that
            perfectly combine fit, style, and comfort, ensuring every customer
            walks away with footwear designed uniquely for them.
          </p>
          {admin ? (
            <NavLink to='/admin/products' className='home-button'>
              <button type='button'>Products</button>
            </NavLink>
          ) : (
            <NavLink to='/user/products' className='home-button'>
              <button type='button'>Shop Now!</button>
            </NavLink>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
