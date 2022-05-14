import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../../store/product';
import ProductCard from '../ProductCard';

export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const products = useSelector(state => state.product.products)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async () => {
      await dispatch(getAllProducts())
      setLoaded(true)
    })();
  }, [dispatch])

  if (!loaded) return null;

  return (
    <div>
      {products.map(product => {
        return (
          <ProductCard product={product} key={product.id} />
        )
      })}
    </div>
  )
}
