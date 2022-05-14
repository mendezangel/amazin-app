import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/product';
import ProductCard from '../ProductCard';

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const products = useSelector(state => state.product.products)

  const [loaded, setLoaded] = useState(false);

  const [randProducts, setRandProducts] = useState([])


  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getAllProducts())
  //   })();
  // }, [dispatch])

  useEffect(() => {
    function shuffle(array) {
      let currentIndex = array.length, randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return setRandProducts(array);
    }
    shuffle(products)
    setLoaded(true)
  })

  if (!loaded) return null;

  return (
    <div>
      {randProducts.map(product => {
        return (
          <ProductCard product={product} key={product.id} />
        )
      })}
    </div>
  )
}
