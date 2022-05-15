import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './NavBar.css'
import image from '../../images/Amazin.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Popup from 'reactjs-popup';
import UserDropdownMenu from '../UserDropdownMenu'

const NavBar = () => {
  const user = useSelector(state => state.session.user)

  const helloUser = () => {
    if (!user) {
      return (
        <h3 className='nav-bar-user-p'>Hello, Sign in</h3>
      )
    }
    return (
      <h3 className='nav-bar-user-p'>Hello, {user.name}</h3>
    )
  }

  return (
    <header className='nav-bar-header'>
      <div className='nav-bar-container'>
        <div className='nav-bar-left-container'>
          <div className='nav-bar-logo-container'>
            <Link to='/'>
              <img src={image} />
            </Link>
          </div>
          <div className='nav-bar-address-container'>
            <div class="nav-marker-icon">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div class="deliver-to-container">
              <div class="deliver-to-user">Deliver to {user.name.split(' ')[0]}</div>
              <div class="user-location" style={{ color: '#fff' }}>{user.city} {user.zip_code}</div>
            </div>
          </div>
        </div>
        <div className='nav-bar-right-container'>
          <div className='nav-bar-user'>
            <Popup
              trigger={helloUser}
              position='bottom right'
              offsetY={7}
              on='hover'
              closeOnDocumentClick
              mouseLeaveDelay={200}
              mouseEnterDelay={0}
              contentStyle={{ padding: '0px', border: 'none' }}
            // arrow={false}
            >
              <div className='menu'>
                <UserDropdownMenu user={user} />
              </div>
            </Popup>
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
