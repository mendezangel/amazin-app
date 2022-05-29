import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import OrderDetailsProduct from './OrderDetailsProduct';
import './OrderDetails.css'

export default function OrderDetails() {
  const { id } = useParams();
  const { state: order } = useLocation();
  const user = useSelector(state => state.session.user);

  const orderPlaced = order.created_at.split(' ');

  const [products, setProducts] = useState([])
  const [deliveryDate, setDeliveryDate] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setDeliveryDate(new Date(new Date(order.created_at).setDate(new Date(order.created_at).getDate() + 2)))
    setProducts(order.products_ordered)
    setLoaded(true)
  }, [])

  if (!loaded) return null;

  return (
    <div className='order-details-container5239'>
      <div className='details-child1-9842'>
        <h1>Order Details</h1>
        <p>Ordered on {orderPlaced[2]} {orderPlaced[1]}, {orderPlaced[3]}</p>
      </div>
      <div className='details-child2-8720'>
        <div className='shipping-address-container'>
          <p className='shipping-address'>Shipping Address</p>
          <p className='user-name'>{user.name}</p>
          <p className='user-street'>{user.address.toUpperCase()}</p>
          <p className='user-city-state'>{user.city.toUpperCase()}, {user.state} {user.zip_code}</p>
          <p className='user-country'>{user.country}</p>
        </div>
        <div className='delivery-instructions-container'>
          <p className='delivery-instructions-p'>Delivery Instructions</p>
          <p className='delivery-instructions'>{order.delivery_instructions}</p>
        </div>
        <div className='grand-total-container'>
          <p className='grand-total'>Grand Total</p>
          <p className='grand-total-number'>${order.total_cost}</p>
        </div>
      </div>
      <div className='details-child3-9729'>
        <div className='delivery-date-container'>
          {order.created_at && deliveryDate < new Date() ?
            <h2 className='order-delivered-text'>Delivered {deliveryDate.toDateString().split(' ')[1]} {deliveryDate.toDateString().split(' ')[2]}, {deliveryDate.toDateString().split(' ')[3]}</h2>
            :
            <h2 className='order-not-delivered-text'>Expected Delivery: {deliveryDate.toDateString().split(' ')[1]} {deliveryDate.toDateString().split(' ')[2]}, {deliveryDate.toDateString().split(' ')[3]}</h2>
          }
        </div>
        <div className='products-bts-container'>
          <div className='products-container'>
            {products.map(product => {
              return (
                <OrderDetailsProduct product={product} key={product.id} />
              )
            })}
          </div>
          <div className='buttons-container'>
            Archive order
          </div>
        </div>
      </div>
    </div>
  )
}
