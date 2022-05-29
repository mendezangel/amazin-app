import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import './OrderDetails.css'

export default function OrderDetails() {
  const { id } = useParams();
  const { state: order } = useLocation();
  const user = useSelector(state => state.session.user);

  const orderPlaced = order.created_at.split(' ');
  console.log(order)

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
          <p className='user-street'>{user.address}</p>
          <p className='user-city-state'>{user.city}, {user.state} {user.zip_code}</p>
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
      {/* map here */}
    </div>
  )
}
