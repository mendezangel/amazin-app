import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import { getAllProducts } from './store/product';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/'
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate())
      await dispatch(getAllProducts())
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <NavBar />
          <HomePage />
        </Route>
        <Route path='/products/:id' exact={true}>
          <NavBar />
          <ProductPage />
        </Route>
        <Route path='/cart' exact={true}>
          <NavBar />
          <Cart />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
