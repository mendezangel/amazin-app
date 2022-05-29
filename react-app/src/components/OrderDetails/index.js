import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function OrderDetails() {
  const { id } = useParams();
  const { state: order } = useLocation();


  return (
    <div className='order-details-container5239'>
      <div className='details-child1-9842'></div>
      <div className='details-child2-8720'></div>
      {/* map here */}
    </div>
  )
}
