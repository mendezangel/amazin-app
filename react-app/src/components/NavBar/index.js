import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './NavBar.css'
import image from '../../images/Amazin.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Popup from 'reactjs-popup';
import UserDropdownMenu from '../UserDropdownMenu'
import './script';
import { search } from '../../store/product';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products)

  const storageTerms = sessionStorage.getItem('searchTerms')

  const [searchTerms, setSearchTerms] = useState(
    storageTerms && storageTerms !== '' ? storageTerms : ''
  )

  const updateSearchTerms = (e) => setSearchTerms(e.target.value);

  useEffect(() => {
    sessionStorage.setItem('searchTerms', searchTerms)
  }, [searchTerms])

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

  const inputOnFocus = () => {
    const middleContainer = document.querySelector('.nav-bar-middle-container');

    middleContainer.classList.add('search-focus')
  }

  const inputOnBlur = () => {
    const middleContainer = document.querySelector('.nav-bar-middle-container');

    middleContainer.classList.remove('search-focus');
  }

  const onSearch = async () => {
    const searchBar = document.querySelector('.search-bar')
    searchBar.blur();
    const dropdown = document.querySelector('.search-results-container');
    await dispatch(search(searchTerms))
    if (dropdown) dropdown.style.display = 'none'
    return history.push('/search-results');
  }

  // if (!user) return null;

  return (
    <header className='nav-bar-header'>
      <div className='nav-bar-container'>
        <div className='nav-bar-left-container'>
          <div className='nav-bar-logo-container'>
            <Link to='/' onClick={() => { setSearchTerms('') }}>
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
            <div className='search-bar-container'>
              <input type='text' onChange={updateSearchTerms} value={searchTerms} className='search-bar' onFocus={inputOnFocus} onBlur={inputOnBlur} onKeyDown={(e) => { if (e.key === "Enter") onSearch() }} />
              {searchTerms && (
                <div className='search-results-container'>
                  {products.filter(product => {
                    if (product.name.toLowerCase().includes(searchTerms.toLowerCase())) {
                      return product;
                    }
                  }).map(product => {
                    return (
                      <Link to={`/products/${product.id}`} onClick={() => setSearchTerms('')} key={product.id}>
                        <div className='search-result' key={product.id}>
                          <p>{product.name}</p>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
            <div className='magnifying-glass' onClick={onSearch}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>

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
