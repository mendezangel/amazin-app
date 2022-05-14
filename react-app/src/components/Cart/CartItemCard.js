import React, { useEffect, useState } from 'react'

export default function CartItemCard({ product, deleteItem }) {

  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    if (product.stock === 0) setInStock(false)
  })

  return (
    <div className='product-card-container'>
      <div className='image-container4495'>
        <img src={product.image - url} />
      </div>
      <div className='details-container29256'>
        <h2>{product.name}</h2>
        {inStock && (<p className='in-stock-h3'>In Stock.</p>)}
        {!inStock && (<p className='out-of-stock-h3'>Out of Stock.</p>)}
        <div className='free-returns3827'>FREE Returns</div>
        <div clasName='item-qty9217'>Qty: {product.quantity}</div>
        <div className='delete-item8723' onClick={deleteItem}>Delete</div>
      </div>
      <div className='price-container3320'>
        <h2>${product.price}.99</h2>
      </div>
    </div>
  )
}
