import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import './OrderDetailsProduct.css'

export default function OrderDetailsProduct({ product }) {

  const history = useHistory();

  return (
    <div className='product-card'>
      <div className='product-card-child1'>
        <div className='product-image-container'>
          <img src={product.product.image_url} />
        </div>
      </div>
      <div className='product-card-child2'>
        <Link to={`/products/${product.product.id}`}>{product.product.name}</Link>
        <p className='sold-by'>Sold by: Amazin.com</p>
        <p className='price'>${product.product.price}.99</p>
        <div className='buy-again' onClick={() => history.push(`/products/${product.product.id}`)}>Buy it again</div>
      </div>
    </div>
  )
}
