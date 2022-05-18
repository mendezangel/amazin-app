import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css'
import image from '../../images/Amazin.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Popup from 'reactjs-popup';
import UserDropdownMenu from '../UserDropdownMenu'

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const history = useHistory()

  const helloUser = () => {
    if (!user) {
      return (
        <h3 className='nav-bar-user-p'>Hello, Sign in</h3>
      )
    }
    return (
      <h3 className='nav-bar-user-p'>Hello, {user.name.split(' ')[0]}</h3>
    )
  }

  const cartButton = () => history.push('/cart')

  const ordersButton = () => {
    if (!user) return history.push('/login')
    history.push('/orders')
  }

  // if (!user) return null;

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
            <div className="nav-marker-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="deliver-to-container">
              {user && (<><div className="deliver-to-user">Deliver to {user.name.split(' ')[0]}</div>
                <div className="user-location">{user.city} {user.zip_code}</div></>)}
              {!user && (<><div className="deliver-to-user">Hello, Guest</div>
                <div className="select-your-address">
                  <Link to='/login'>
                    Select your address
                  </Link>
                </div></>)}
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
            <h3 onClick={ordersButton}>Orders</h3>
          </div>
          <div className='nav-bar-cart' onClick={cartButton}>
            <ShoppingCartOutlinedIcon fontSize='large' style={{ color: '#fff' }} /><p className='nav-cart-text'>Cart</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
