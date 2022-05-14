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
  const [freeDelivery, setFreeDelivery] = useState('')
  const [fastDelivery, setFastDelivery] = useState('')
  const [orderWithin, setOrderWithin] = useState('')
  const [returnable, setReturnable] = useState('')
  const [loaded, setLoaded] = useState(false)

  const addToCart = () => {
    let cartItem = product;
    cartItem.quantity = parseInt(quantity)
    localStorage.setItem(id, JSON.stringify(cartItem))
    history.push('/cart')
  }

  const updateQuantity = (e) => {
    setQuantity(e.target.value);
  }

  useEffect(() => {
    const date = new Date()
    const date1 = new Date()
    const today = new Date()

    date.setDate(date.getDate() + 5)
    const freeDeliveryArr = date.toDateString().split(' ')
    setFreeDelivery(`${freeDeliveryArr[0]}, ${freeDeliveryArr[1]} ${freeDeliveryArr[2]}`)

    date1.setDate(date1.getDate() + 2)
    const fastDeliveryArr = date1.toDateString().split(' ')
    setFastDelivery(`${fastDeliveryArr[0]}, ${fastDeliveryArr[1]} ${fastDeliveryArr[2]}`)

    setOrderWithin(`Order within ${23 - today.getHours()} hrs and ${59 - today.getMinutes()} mins`)

    setLoaded(true)
  })


  if (!loaded) return null;

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
              <p className='free-returns-p'>& <span className='free-returns'>FREE Returns</span></p>
            </div>
          </div>
          <div className='product-details-child3'>
            <h4>About this item</h4>
            <p>{product.description}</p>
          </div>
        </div>
        <div className='product-details-buy-container'>
          <p className='price21549'>${product.price}.99</p>
          <p className='free-returns-p'>& <span className='free-returns'>FREE Returns</span></p>
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
