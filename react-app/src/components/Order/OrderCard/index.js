import React, { useEffect, useReducer, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './OrderCard.css'

export default function OrderCard({ order }) {

  const [products, setProducts] = useState([...order.products_ordered])
  const [deliveryDate, setDeliveryDate] = useState('')
  const [loaded, setLoaded] = useState(false)

  const orderPlaced = order.created_at.split(' ')

  useEffect(() => {
    setDeliveryDate(new Date(new Date(order.created_at).setDate(new Date(order.created_at).getDate() + 2)))
    setLoaded(true)
  }, [])

  if (!loaded) return null;

  console.log(deliveryDate.toDateString())

  return (
    <div className='order-card-container'>
      <div className='order-card-child1'>
        <div className='order-card-details-container'>
          <div className='details-order-placed'>
            <p>ORDER PLACED</p>
            <p>{orderPlaced[2]} {orderPlaced[1]}, {orderPlaced[3]}</p>
          </div>
          <div className='details-total'>
            <p>TOTAL</p>
            <p className=''>${order.total_cost}</p>
          </div>
          <div className='details-ship-to'>
            <p>SHIP TO</p>
            <p>{order.user.name}</p>
          </div>
        </div>
      </div>
      <div className='order-card-child2'>
        <div className='order-card-child2-text'>
          {order.created_at && deliveryDate < new Date() ?
            <h2 className='order-delivered-text'>Delivered {deliveryDate.toDateString().split(' ')[1]} {deliveryDate.toDateString().split(' ')[2]}</h2>
            :
            <h2 className='order-not-delivered-text'>Expected Delivery: {deliveryDate.toDateString().split(' ')[1]} {deliveryDate.toDateString().split(' ')[2]}</h2>
          }
        </div>
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
      <div className='order-card-child3'><p>Delete archive</p></div>
    </div>
  )
}
