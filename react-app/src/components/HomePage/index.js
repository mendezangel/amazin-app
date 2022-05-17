import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../ProductCard';
import './HomePage.css';

export default function HomePage() {
  // const dispatch = useDispatch()
  // const user = useSelector(state => state.session.user);
  const products = useSelector(state => state.product.products)

  const [loaded, setLoaded] = useState(false);

  const [randProducts, setRandProducts] = useState([])

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

  if (!loaded) return null;

  return (
    <div className='whole-page-div'>
      <div className='home-page-products-container1'>
        {randProducts.slice(0, 4).map(product => {
          return (
            <ProductCard product={product} key={product.id} />
          )
        })}
      </div>
      <div className='home-page-products-container2'>
        {randProducts.slice(4, 8).map(product => {
          return (
            <ProductCard product={product} key={product.id} />
          )
        })}
      </div>
    </div>
  )
}
