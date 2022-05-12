import React from 'react';
import './NavBar.css'
import image from '../../images/Amazin.png'
import { useSelector } from 'react-redux';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  const helloUser = () => {
    if (!user) {
      return (
        <h3 className='nav-bar-user-p'>Hello, Sign in</h3>
      )
    }
    return (
      <h3 className='nav-bar-user-p'>Hello, Sign in</h3>
    )
  }

  return (
    <header className='nav-bar-header'>
      <div className='nav-bar-container'>
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
            {helloUser()}
          </div>
          <div className='nav-bar-orders'>
            <h3>Orders</h3>
          </div>
          <div className='nav-bar-cart'>
            <ShoppingCartOutlinedIcon fontSize='large' style={{ color: '#fff' }} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
