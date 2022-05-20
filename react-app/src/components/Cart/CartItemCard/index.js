import React, { useEffect, useState } from 'react'
import './CartItemCard.css'

export default function CartItemCard({ product, deleteItem }) {

  const [inStock, setInStock] = useState(true);
  const [productPrice, setProductPrice] = useState(0);
  const [quantity, setQuantity] = useState(product.quantity)

  const updateQuantity = (e) => {
    setQuantity(e.target.value)
    product.quantity = quantity
  }

  if (product.stock === 0) setInStock(false)

  useEffect(() => {
    let num = (product.price + 0.99) * product.quantity;
    setProductPrice(num.toFixed(2))
  }, [])

  return (
    <div className='product-card-container92367'>
      <div className='img-details-container'>
        <div className='image-container4495'>
          <img src={product.image_url} />
        </div>
        <div className='details-container29256'>
          <h2>{product.name}</h2>
          {inStock && (<p className='in-stock-h3'>In Stock.</p>)}
          {!inStock && (<p className='out-of-stock-h3'>Out of Stock.</p>)}
          <div className='free-returns3827'>FREE Returns</div>
          <div className='qty-delete-container'>
            <p className='item-qty9217'>Qty: {quantity}</p>
            <div className='delete-item8723' id={product.id} onClick={deleteItem}>Delete</div>
          </div>
        </div>
      </div>
      <div className='price-container3320'>
        {product.quantity > 1 && (
          <h2>${productPrice}</h2>
        )}
        {product.quantity === 1 && (
          <h2>{product.price}.99</h2>
        )}
      </div>
    </div>
  )
}
