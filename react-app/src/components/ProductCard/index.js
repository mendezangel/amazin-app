import React from 'react'
import { singleItemText } from '../../data/product_card_text'
import './ProductCard.css'

export default function ProductCard({ product }) {

  const num = (function () {
    return Math.floor(Math.random() * (singleItemText.length - 1) + 1);
  })()

  return (
    <div className='product-card-container'>
      <div className='product-text-container'>
        <h2>{singleItemText[num]}</h2>
      </div>
      <div className='product-img-container'>
        <img src={`${product.image_url}`} />
      </div>
      <div className='product-card-price-container'>
        <div class="dollar-sign">$</div>
        <div class="price-dollar">{product.price}</div>
        <div class="price-cents-container">
          <p className='price-cents'>99</p>
        </div>
      </div>
      <div className='product-card-name-container'>{product.name}</div>
    </div>
  )
}