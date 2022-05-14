import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import './ProductPage.css'

export default function ProductPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const user = useSelector(state => state.session.user)
  const product = useSelector(state => state.product[id])

  const [quantity, setQuantity] = useState('1')

  const addToCart = () => {
    let cartItem = product;
    cartItem.quantity = parseInt(quantity)
    localStorage.setItem(id, JSON.stringify(cartItem))
    history.push('/cart')
  }

  const updateQuantity = (e) => {
    setQuantity(e.target.value);
  }

  if (!product) return null;

  return (
    <div className='product-page-11940'>

      <div className='product-details-wrapper'>
        <div className='product-details-img-container'>
          <img src={`${product.image_url}`} />
        </div>
        <div className='product-details-container'>
          <div className='product-details-child1'>
            <h2>{product.name}</h2>
          </div>
          <div className='product-details-child2'>
            <div className='product-card-price-container'>
              <div className="dollar-sign">$</div>
              <div className="price-dollar">{product.price}</div>
              <div className="price-cents-container">
                <p className='price-cents'>99</p>
              </div>
            </div>
          </div>
          <div className='product-details-child3'>
            <h4>About this item</h4>
            <p>{product.description}</p>
          </div>
        </div>
        <div className='product-details-buy-container'>
          <span>{product.price}.99</span>
          <select className='qty-select' onChange={updateQuantity}>
            <option value='1'>Qty: 1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
          </select>
          <button onClick={addToCart}>add to cart</button>
        </div>
      </div>
    </div>
  )
}
