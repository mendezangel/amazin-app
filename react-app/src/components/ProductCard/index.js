import React from 'react'
import { Link } from 'react-router-dom';
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
        <Link to={`/products/${product.id}`}>
          <img src={`${product.image_url}`} />
        </Link>
      </div>
      <div className='product-card-price-container'>
        <div className="dollar-sign">$</div>
        <div className="price-dollar">{product.price}</div>
        <div className="price-cents-container">
          <p className='price-cents'>99</p>
        </div>
      </div>
      <div className='product-card-name-container'>
        <Link to={`/products/${product.id}`}>
          {product.name}
        </Link>
      </div>
    </div>
  )
}