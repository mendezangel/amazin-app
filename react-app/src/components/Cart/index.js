import React, { useState, useEffect } from 'react';
import './Cart.css';
import CartItemCard from './CartItemCard';

export default function Cart() {

  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  const [subTotal, setSubTotal] = useState(0)

  const calculateSubTotal = (arr) => {
    let num = 0;
    arr.forEach(item => {
      num += (item.price + 0.99) * item.quantity;
    })

    setSubTotal(num.toFixed(2));
  }

  useEffect(() => {
    const items = Object.values(localStorage)
    const arr = [];
    items.forEach(item => {
      arr.push(JSON.parse(item))
    });
    setCartItems(arr)
  }, [])

  useEffect(() => {
    calculateSubTotal(cartItems)
    setIsLoaded(true)
  }, [cartItems])

  const deleteItem = (e) => {
    const id = e.target.id

    localStorage.removeItem(id)

    const items = Object.values(localStorage)
    const arr = [];
    items.forEach(item => {
      arr.push(JSON.parse(item))
    });
    setCartItems(arr)
    calculateSubTotal(cartItems)
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
          <div className='cart-subtotal2893'>
            {cartItems.length > 1 && (<h3>Subtotal ({cartItems.length} items): <span className='subtotal-span7058'>${subTotal}</span></h3>)}
            {cartItems.length === 1 && (<h3>Subtotal (1 item): <span className='subtotal-span7058'>${subTotal}</span></h3>)}
          </div>
        </div>
        <div className='cart-total-container'>Placeholder</div>
      </div>
    </div>
  )
}
