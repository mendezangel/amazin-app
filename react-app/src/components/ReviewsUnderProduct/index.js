import React from 'react'
import './ReviewsUnderProduct.css'

export default function ReviewsUnderProduct({ reviews }) {
  return (
    <div className='product-reviews-section-container'>
      <div className='reviews-section-child1'>
        <h2>Customer reviews</h2>
        <div className='review-this-product'>
          <h3>Review this product</h3>
          <p>Share your thoughts with other customers</p>
          <button>Write a customer review</button>
        </div>
      </div>
      <div className='reviews-section-child2'>
        {reviews.map(review => {
          <div className='review-container89023'>
            <p className='reviewee-name'>{review.user.name}</p>
            <p className='review-creation-date'>{new Date(review.created_at).toDateString()}</p>
            <p className='review-description2870'>{review.description}</p>
          </div>
        })}
      </div>
    </div>
  )
}
