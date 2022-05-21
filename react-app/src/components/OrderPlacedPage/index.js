import React from 'react'
import { Link } from 'react-router-dom'
import './OrderPlacedPage.css'

export default function OrderPlacedPage() {
  return (
    <div className='order-placed-whole-page'>
      <div className='order-placed-container'>
        <div className='checkmark-and-confirmation'>
          <span><i class="fas fa-check"></i></span><h1>Your order has been placed.</h1>
        </div>
        <p>Head to your <Link to={'/orders'}>orders</Link> or return to the <Link to={'/'}>home page.</Link></p>
      </div>
    </div>
  )
}
