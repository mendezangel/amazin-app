import React, { useState, useEffect } from 'react';
import './Cart.css';
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

  const deleteItem = (e) => {
    const id = e.target.id

    localStorage.removeItem(id)

    const items = Object.values(localStorage)
    const arr = [];
    items.forEach(item => {
      arr.push(JSON.parse(item))
    });
    setCartItems(arr)
  }

  if (!isLoaded) return null;

  return (
    <div className='whole-page-div'>
      <div className='cart-container9271'>
        <div className='cart-items-container'>
          <h1>Shopping Cart</h1>
          {cartItems.map(product => {
            return (
              <CartItemCard product={product} deleteItem={deleteItem} key={product.id} />
            )
          })}
        </div>
        <div className='cart-total-container'>Placeholder</div>
      </div>
    </div>
  )
}
