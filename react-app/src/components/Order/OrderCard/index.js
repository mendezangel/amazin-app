import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './OrderCard.css'

export default function OrderCard({ order }) {

  const [products, setProducts] = useState([...order.products_ordered])


  return (
    <div className='order-card-container'>
      <div className='order-card-child1'>
        <div className='order-card-details-container'>
          <div className='details-order-placed'>
            <p>ORDER PLACED</p>
            <p>DATE</p>
          </div>
          <div className='details-total'>
            <p>TOTAL</p>
            <p className=''>324</p>
          </div>
          <div className='details-ship-to'>
            <p>SHIP TO</p>
            <p>ANGEL</p>
          </div>
        </div>
      </div>
      <div className='order-card-child2'>
        <div className='order-card-child2-text'><h2>Delivered Placeholder</h2></div>
        <div className='item-details-container6840'>
          {products.map(product => {
            return (
              <div className='single-item-container9458' key={product.id}>
                <div className='image-container12738'><img src={product.product.image_url} /></div>
                <div className='item-info4672'>
                  <Link to={`/products/${product.product_id}`}>{product.product.name}</Link>
                  <div className='product-buy-again'>Buy it again</div>
                </div>
              </div>

            )
          })}
        </div>
      </div>
      <div className='order-card-child3'>Delete archive</div>
    </div>
  )
}
