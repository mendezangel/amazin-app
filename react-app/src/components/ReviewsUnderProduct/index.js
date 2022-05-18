import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './ReviewsUnderProduct.css'

export default function ReviewsUnderProduct({ reviews }) {
  const history = useHistory()
  const { id } = useParams()
  const user = useSelector(state => state.session.user)

  const dateString = (date) => {
    const arr = date.split(' ');
    return `${arr[1]} ${arr[2]}, ${arr[3]}`;
  }

  const reviewLink = (e) => {
    e.preventDefault()

    if (!user) history.push('/login')

    history.push({
      pathname: `/products/create-review`,
      state: id
    })
  }

  return (
    <div className='product-reviews-section-container'>
      <div className='reviews-section-child1'>
        <h2>Customer reviews</h2>
        <p className='global-review-count'>{reviews.length} global ratings</p>
        <div className='review-this-product'>
          <h3>Review this product</h3>
          <p>Share your thoughts with other customers</p>
          <button onClick={reviewLink}>Write a customer review</button>
        </div>
      </div>
      <div className='reviews-section-child2'>
        {reviews.map(review => {
          return (
            <div className='review-container89023'>
              <p className='reviewee-name'>{review.user.name}</p>
              <p className='review-creation-date'>Reviewed in {review.user.country} {dateString(new Date(review.created_at).toDateString())}</p>
              <p className='verified-purchase'>Verified Purchase</p>
              <p className='review-description2870'>{review.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
