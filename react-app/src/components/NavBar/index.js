import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import image from '../../images/Amazin.png'

const NavBar = () => {
  return (
    <header className='nav-bar-container'>
      <div className='nav-bar-left-container'>
        <div className='nav-bar-logo-container'>
          <img src={image} />
        </div>
        <div className='nav-bar-address-container'>
          <h3>placeholder text</h3>
        </div>
      </div>
      <div className='nav-bar-right-container'>
        <div className='nav-bar-user'>
          <h3>placeholder text</h3>
        </div>
        <div className='nav-bar-orders'>
          <h3>Orders</h3>
        </div>
        <div className='nav-bar-cart'>
          <i className="fa-solid fa-cart-shopping fa-2xl"></i>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
