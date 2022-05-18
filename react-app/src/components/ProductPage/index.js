import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import ReviewsUnderProduct from '../ReviewsUnderProduct'
import './ProductPage.css'
import { loadProductReviews } from '../../store/review'

export default function ProductPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  // const user = useSelector(state => state.session.user)
  const product = useSelector(state => state.product[id])
  const reviews = useSelector(state => state.review.reviews)

  const [quantity, setQuantity] = useState('1')
  const [freeDelivery, setFreeDelivery] = useState('')
  const [fastDelivery, setFastDelivery] = useState('')
  const [orderWithin, setOrderWithin] = useState('')
  const [returnable, setReturnable] = useState('')
  const [inStock, setInStock] = useState(true)
  const [selectDisabled, setSelectDisabled] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const addToCart = () => {
    if (inStock) {
      let cartItem = product;
      cartItem.quantity = parseInt(quantity)
      cartItem.id = product.id
      localStorage.setItem(id, JSON.stringify(cartItem))
      return history.push('/cart')
    }
    alert('Item is out of Stock!')
  }

  const updateQuantity = (e) => {
    setQuantity(e.target.value);
  }

  useEffect(() => {
    dispatch(loadProductReviews(id))
    const date = new Date()
    const date1 = new Date()
    const today = new Date()
    const date2 = new Date()

    date.setDate(date.getDate() + 5)
    const freeDeliveryArr = date.toDateString().split(' ')
    setFreeDelivery(`${freeDeliveryArr[0]}, ${freeDeliveryArr[1]} ${freeDeliveryArr[2]}`)

    date1.setDate(date1.getDate() + 2)
    const fastDeliveryArr = date1.toDateString().split(' ')
    setFastDelivery(`${fastDeliveryArr[0]}, ${fastDeliveryArr[1]} ${fastDeliveryArr[2]}`)

    setOrderWithin(`${23 - today.getHours()} hrs and ${59 - today.getMinutes()} mins`)

    date2.setMonth(date2.getMonth() + 1);
    const returnableArr = date2.toDateString().split(' ')
    setReturnable(`Returnable until ${returnableArr[1]} ${returnableArr[2]}, ${returnableArr[3]}`);

    if (product?.stock === 0) {
      setInStock(false)
      setSelectDisabled(true)
    }


    setLoaded(true)
  }, [])

  if (!loaded) return null;

  return (
    <>
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
              <p>{product?.description}</p>
            </div>
          </div>
          <div className='product-details-buy-container'>
            <p className='price21549'>${product.price}.99</p>
            <p className='free-returns-p'>& <span className='free-returns'>FREE Returns</span></p>
            <p className='free-delivery-p'><span className='FREE-delivery'>FREE delivery</span> {freeDelivery}</p>
            <p className='fastest-delivery-p'>Or fastest delivery <span className='fastest-delivery'>{fastDelivery}. </span>Order within <span className='order-within-text'>{orderWithin}</span></p>
            {/* <p className='order-within-p'></p> */}
            {inStock && (<h3 className='in-stock-h3'>In Stock.</h3>)}
            {!inStock && (<h3 className='out-of-stock-h3'>Out of Stock.</h3>)}
            <select className='qty-select' onChange={updateQuantity} disabled={selectDisabled}>
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
            <div onClick={addToCart} className='button-container15631'>
              Add to Cart
            </div>
            <p className='secure-transaction-p'>
              <span><i className="fa-solid fa-lock"></i></span>
              Secure transaction
            </p>
            <div className='ships-from-container'>
              <div className='ships-from-text-container'>Ships from</div>
              <div className='website-text-container'>amazin.com</div>
            </div>
            <div className='sold-by-container'>
              <div className='sold-by-text'>Sold by</div>
              <div className='website-text-container'>amazin.com</div>
            </div>
            <p className='return-policy-text'>
              Return policy: <span>{returnable}</span>
            </p>
          </div>
        </div>
      </div>
      <div className='reviews-under-product-container'>
        <ReviewsUnderProduct reviews={reviews} />
      </div>
    </>
  )
}
