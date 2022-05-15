import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const signinButton = (e) => {
    e.preventDefault();
    history.push('/login')
  }

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='20481'>
      <div className='4014'>
        <div className='login-form-container'>
          <h1>Create account</h1>
          <form onSubmit={onSignUp} className='login-form'>
            <div>
              <label htmlFor='name'>Your name</label>
              <input
                name='name'
                type='text'
                value={name}
                onChange={updateName}
              />
              {/* {errors?.email?.map(error => {
                return (<p className="form-error" key={error}>{error}</p>)
              })} */}
            </div>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                name='email'
                type='text'
                value={email}
                onChange={updateEmail}
              />
              {/* {errors?.password?.map(error => {
                return (<p className="form-error" key={error}>{error}</p>)
              })} */}
              <div>
                <label htmlFor='password'>Password</label>
                <input
                  name='password'
                  type='password'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div>
                <label htmlFor='repeat_password'>Re-enter password</label>
                <input
                  name='repeat_password'
                  type='password'
                  value={repeatPassword}
                  onChange={updateRepeatPassword}
                />
              </div>
              <button type='submit'>Sign-Up</button>
            </div>
          </form>
          <p className='7788'>By continuing, you agree to Amazin's Conditions of Use and Privacy Notice.</p>
        </div>
        <div className='27502'>
          <h5>Already have an account?</h5>
          <button onClick={signinButton}>Sign-In</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
