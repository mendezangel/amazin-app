import React, { useState } from 'react';
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

  const products = useSelector(state => state.product.products)

  const [searchTerms, setSearchTerms] = useState('')

  const updateSearchTerms = (e) => setSearchTerms(e.target.value);

  const cartButton = () => history.push('/cart')

  const ordersButton = () => {
    if (!user) return history.push('/login')
    history.push('/orders')
  }

  const test = () => {
    return (
      user ?
        <div>
          <div className='hello-nav-right'>
            Hello, {user.name.split(' ')[0]}
          </div>
          <div className='account-nav-right'>Account</div>
        </div> :
        <div>
          <div className='hello-nav-right'>
            Hello, sign in
          </div>
          <div className='account-nav-right'>Account</div>
        </div>
    )
  }

  const inputOnBlur = () => {
    const resultsContainer = document.querySelector('.search-results-container');
    resultsContainer.style.display = 'none';
  }

  const inputOnFocus = () => {
    const resultsContainer = document.querySelector('.search-results-container');
    const body = document.querySelector('body')
    resultsContainer.style.display = 'block';
    body.style.background = 'rgba(0, 0, 0, 0.5)'
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
        <div className='nav-bar-middle-container'>
          <div className='input-and-searchbtn'>
            <input type='text' onChange={updateSearchTerms} value={searchTerms} />
            <div className='magnifying-glass'></div>
          </div>
          {searchTerms && (
            <div className='search-results-container'>
              {products.filter(product => {
                if (product.name.toLowerCase().includes(searchTerms.toLowerCase())) {
                  return product;
                }
              }).map(product => {
                return (
                  <Link to={`/products/${product.id}`} onClick={() => setSearchTerms('')}>
                    <div className='search-result' key={product.id}>
                      <p>{product.name}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
        <div className='nav-bar-right-container'>
          <div className='nav-bar-user' onClick={() => !user ? history.push('/login') : null}>
            <Popup
              trigger={test}
              position='bottom right'
              offsetY={8}
              offsetX={50}
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
          <div className='nav-bar-user' onClick={ordersButton}>
            <div className='hello-nav-right'>Returns</div>
            <div className='account-nav-right'>& Orders</div>
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
