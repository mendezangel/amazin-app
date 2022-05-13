import React from 'react'

export default function ProductCard({ products }) {

  console.log(products[0])

  return (
    <>
      {products.map(product => {
        return (
          <div className='product-card-container' key={product.id}>
            <div className='product-text-container'>
              <h2>{product.name}</h2>
            </div>
          </div>
        )
      })}
    </>
  )
}
