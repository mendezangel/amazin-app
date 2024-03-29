import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenticate } from './store/session';
import { getAllProducts } from './store/product';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/'
import HomePage from './components/HomePage';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import Order from './components/Order';
import ReviewForm from './components/ReviewForm';
import EditReviewForm from './components/EditReviewForm';
import OrderPlacedPage from './components/OrderPlacedPage';
import OrderDetails from './components/OrderDetails';
import ResultsPage from './components/ResultsPage';
import Footer from './components/Footer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  // const location = useLocation();

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
        <Route path='/create-review' exact={true}>
          <NavBar />
          <ReviewForm />
        </Route>
        <Route path='/edit-review' exact={true}>
          <NavBar />
          <EditReviewForm />
        </Route>
        <Route path='/cart' exact={true}>
          <NavBar />
          <Cart />
        </Route>
        <Route path='/orders' exact={true}>
          <NavBar />
          <Order />
        </Route>
        <Route path='/order-placed' exact={true}>
          <NavBar />
          <OrderPlacedPage />
          <Footer />
        </Route>
        <Route path='/orders/:id' exact={true}>
          <NavBar />
          <OrderDetails />
          <Footer />
        </Route>
        <Route path='/search-results' exact={true}>
          <NavBar />
          <ResultsPage />
          <Footer />
        </Route>
      </Switch>
      {/* <footer>
        {location.pathname == '/login' || location.pathname == '/signup' ? null : <Footer />}
      </footer> */}
    </BrowserRouter>
  );
}

export default App;
