import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../store/session'

export default function UserDropdownMenu({ user }) {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/login');
  }

  const handleSignIn = () => {
    history.push('/login')
  }

  return (
    <>
      {user && (
        <div className='menu-item'>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
      {!user && (
        <div className='menu-signin-container'>
          <button onClick={handleSignIn}>Sign In</button>
          <p>New customer? <span><Link to='/signup'>Start here.</Link></span></p>
        </div>
      )}
    </>
  )
}
