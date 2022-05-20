import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../ProductCard';
import './HomePage.css';
import { loadOrders } from '../../store/order';
import ProductSlider from '../ProductSlider';
import { backgroundImages } from '../../data/product_card_text';

export default function HomePage() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);
  const products = useSelector(state => state.product.products)

  const [loaded, setLoaded] = useState(false);

  const [randProducts, setRandProducts] = useState([])

  const backgroundImage = (function () {
    return Math.floor(Math.random() * (backgroundImages.length - 1) + 1);
  })()

  useEffect(() => {
    function shuffle(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return setRandProducts(array.slice(0, 8));
    }
    shuffle(products)
    setLoaded(true)
  }, [])

  useEffect(() => {
    (async () => {
      if (user) await dispatch(loadOrders(user.id));
    })()
  }, [user])

  if (!loaded) return null;

  return (
    <div className='whole-page9835'>
      <div className='home-page-img'>
        <img src={backgroundImages[backgroundImage]} />
        <div className='content'></div>
      </div>
      <div className='home-page-products-container'>
        <div className='cards-container1'>
          <ProductCard product={randProducts[0]} />
          <ProductCard product={randProducts[1]} />
          <ProductCard product={randProducts[2]} />
          <ProductCard product={randProducts[3]} />
        </div>
        <div className='home-slider-container'>
          <ProductSlider />
        </div>
        <div className='cards-container1'>
          <ProductCard product={randProducts[4]} />
          <ProductCard product={randProducts[5]} />
          <ProductCard product={randProducts[6]} />
          <ProductCard product={randProducts[7]} />
        </div>
      </div>
    </div>
  )
}
