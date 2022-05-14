import React, { useState, useEffect } from 'react';
import CartItemCard from './CartItemCard';

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const items = Object.values(localStorage)
    const arr = [];
    items.forEach(item => {
      arr.push(JSON.parse(item))
    });
    setCartItems(arr)
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null;

  return (
    <div className='cart-container9271'>
      <div className='cart-items-container'>
        <h1>Shopping Cart</h1>
        {cartItems.map(product => {
          return (
            <CartItemCard product={product} />
          )
        })}
      </div>
      <div className='cart-total-container'></div>
    </div>
  )
}
