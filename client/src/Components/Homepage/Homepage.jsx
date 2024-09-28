import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Homepage.css';
import {
  Shoe1,
  Shoe2,
  Shoe3,
  Shoe4,
  Shoe5,
  Shoe6,
  Shoe7,
  Shoe8,
} from '../../../public/assets/galleryImages/gallery.images';

// eslint-disable-next-line react/prop-types
function Home({ admin }) {
  const shoes = [
    Shoe1,
    Shoe2,
    Shoe3,
    Shoe4,
    Shoe5,
    Shoe6,
    Shoe7,
    Shoe8,
  ];
  // const backgrounds = ['#480505', '#ffcccb', '#000000', '#000000df', '#480505', '#ffcccb', '#000000', '#000000df', '#480505', '#ffcccb', '#000000', '#000000df', '#480505', '#ffcccb'];
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShoeIndex((prevIndex) => (prevIndex + 1) % shoes.length);
    }, 1500);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [shoes.length]);

  return (
    <>
      <section className='home-container'>
        <div className='gallery'>
          <img src={shoes[currentShoeIndex]} alt='Shoe Gallery' />
        </div>
        <div className='homepage-content'>
          <h1>Fit, Style, and Comfort for Every Foot.</h1>
          <p>
            We specialize in creating custom-made shoes that perfectly combine
            fit, style, and comfort, ensuring every customer walks away with
            footwear designed uniquely for them.
          </p>
          {admin ? (
            <NavLink to='/admin/dashboard' className='home-button'>
              <button type='button'>Dashboard</button>
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
