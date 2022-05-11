import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='20481'>
      <div className='4014'>
        <div className='login-form-container'>
          <h1>Sign-In</h1>
          <form onSubmit={onLogin} className='login-form'>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
              <button type='submit'>Sign-In</button>
            </div>
          </form>
          <p>By continuing, you agree to Amazin's Conditions of Use and Privacy Notice</p>
        </div>
        <div className='27502'>
          <p>New to Amazin?</p>
          <button>Create your Amazin account</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
