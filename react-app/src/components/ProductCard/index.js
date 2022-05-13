import React from 'react'
import { singleItemText } from '../../data/product_card_text'

export default function ProductCard({ product }) {

  const num = (function () {
    return Math.floor(Math.random() * (singleItemText.length - 1) + 1);
  })()

  return (
    <div className='product-card-container'>
      <div className='product-text-container'>
        <h2>{singleItemText[num]}</h2>
        <img src={`${product.image_url}`} />
      </div>
    </div>
  )
}
