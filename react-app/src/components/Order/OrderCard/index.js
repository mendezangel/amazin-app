import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function OrderCard({ order }) {

  const products = useSelector(state => state.product.products)
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const productsArr = []

    for (const item in order.items) {
      for (const product in products) {
        if (product.id === item.product_id) productsArr.push(product)
      }
    }

    setFilteredProducts(productsArr)
  }, [])

  console.log(products)

  return (
    <div className='order-card-container'>
      <div className='order-card-child1'>
        <div className='order-card-details-container'>
          <div className='details-order-placed'></div>
          <div className='details-total'></div>
          <div className='details-ship-to'></div>
        </div>
      </div>
      <div className='order-card-child2'>
        <div className='order-card-child2-text'>Delivered PlaceHolder</div>
        <div className='item-details-container6840'>
          {/* {order.items.map(item => {
            <div className='image-container12738'><img src={item.image_id}</div>
          })} */}
        </div>
      </div>
      <div className='order-card-child3'></div>
    </div>
  )
}
