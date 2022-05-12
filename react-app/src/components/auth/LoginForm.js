import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      return setErrors(data);
    }
    history.push('/')
  };

  const demoUser = async (e) => {
    e.preventDefault();
    dispatch(login('atuny0@sohu.com', 'password'))
    history.push('/')
  }

  const signupButton = (e) => {
    e.preventDefault();
    history.push('/signup')
  }

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
                value={email}
                onChange={updateEmail}
              />
              {errors?.email?.map(error => {
                return (<p className="form-error" key={error}>{error}</p>)
              })}
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <input
                name='password'
                type='password'
                value={password}
                onChange={updatePassword}
              />
              {errors?.password?.map(error => {
                return (<p className="form-error" key={error}>{error}</p>)
              })}
              <button type='submit'>Sign-In</button>
              <button onClick={demoUser}>Demo User</button>
            </div>
          </form>
          <p className='7788'>By continuing, you agree to Amazin's Conditions of Use and Privacy Notice.</p>
        </div>
        <div className='27502'>
          <h5>New to Amazin?</h5>
          <button onClick={signupButton}>Create your Amazin account</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
