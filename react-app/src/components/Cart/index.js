import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import './Cart.css';
import CartItemCard from './CartItemCard';
import { createOrder } from '../../store/order';
import Footer from '../Footer';

export default function Cart() {
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()

  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [deliveryInstructions, setDeliveryInstructions] = useState('')
  const [errors, setErrors] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

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

  const updateInstructions = (e) => setDeliveryInstructions(e.target.value)

  const onCheckout = async (e) => {
    e.preventDefault();
    if (!user) return history.push('/login');
    const res = await dispatch(createOrder({ user_id: user.id, total_cost: subTotal, delivery_instructions: deliveryInstructions, items: cartItems }))

    if (res) {
      return setErrors(res.errors);
    }

    localStorage.clear()
    return history.push('/');
  }

  if (!isLoaded) return null;

  return (
    <div className='whole-page-div'>
      <div className='cart-container9271'>
        <div className='cart-items-container'>
          <h1>Shopping Cart</h1>
          {cartItems.length >= 1 && (
            <>
              {cartItems.map(product => {
                return (
                  <CartItemCard product={product} deleteItem={deleteItem} key={product.id} />
                )
              })}
              <div className='cart-subtotal2893'>
                {cartItems.length > 1 && (<h3>Subtotal ({cartItems.length} items): <span className='subtotal-span7058'>${subTotal}</span></h3>)}
                {cartItems.length === 1 && (<h3>Subtotal (1 item): <span className='subtotal-span7058'>${subTotal}</span></h3>)}
              </div>
            </>
          )}
          {cartItems.length <= 0 && (
            <div className='empty-cart-div'>
              <h2>Your shopping cart is empty.</h2>
              <Link to={'/'}>Start shopping</Link>
            </div>
          )}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-total-container'>
            <>
              <div className='cart-subtotal9281'>
                {cartItems.length > 1 && (<h3>Subtotal ({cartItems.length} items): <span className='subtotal-span7058'>${subTotal}</span></h3>)}
                {cartItems.length === 1 && (<h3>Subtotal (1 item): <span className='subtotal-span7058'>${subTotal}</span></h3>)}
              </div>
              <textarea
                className='deliveryInstructionsText'
                name='delivery_instructions'
                placeholder='Delivery Instructions'
                maxLength={100}
                value={deliveryInstructions}
                onChange={updateInstructions}
              />
              <div className='checkout-cart6789' onClick={onCheckout}>Proceed to checkout</div>
            </>
          </div>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
