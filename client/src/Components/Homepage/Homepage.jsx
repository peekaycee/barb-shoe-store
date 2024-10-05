/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
import Canvas from '../../../public/assets/images/multicolor-trenas.png';

function Home({ admin }) {
  const shoes = [Shoe1, Shoe2, Shoe3, Shoe4, Shoe5, Shoe6, Shoe7, Shoe8];
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const location = useLocation(); // Access location object to check the state

  useEffect(() => {
    // Fetch username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Set loading to false after fetching username
    setLoading(false);

    // Rotate the gallery images every 1.5 seconds
    const interval = setInterval(() => {
      setCurrentShoeIndex((prevIndex) => (prevIndex + 1) % shoes.length);
    }, 1500);

    // Check if navigated from Login and alert if true
    if (location.state?.fromLogin) {
      if (admin) {
        alert('You are logging in as an Admin');
      } else {
        alert(`You are logged in as ${storedUsername}`);
      }
      sessionStorage.setItem('alertShown', 'true'); // Store this session to avoid repeated alerts
    }

    return () => clearInterval(interval);
  }, [shoes.length, admin, location.state]);

  return (
    <section className='home-container'>
      {loading ? ( // Show loading indicator if loading
        <div className='loading-indicator'>Loading...</div>
      ) : (
        <>
          <div className='gallery'>
            <img src={shoes[currentShoeIndex]} alt='Shoe Gallery' />
          </div>
          <div className='homepage-content'>
            <div className='brand'>
              <div className='overlay'></div>
              <div className='shoe-image'>
                <img src={Canvas} alt='Image of a brown shoe' />
              </div>
            </div>
            <h1>Barbs Shoe Store</h1>
            <h2>Fit, Style, and Comfort for Every Foot.</h2>
            {!admin && username && (
              <h2 className='greeting'>Welcome back, {username}!</h2>
            )}
            <p>Custom-made shoes uniquely designed for you.</p>
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
        </>
      )}
    </section>
  );
}

export default Home;
