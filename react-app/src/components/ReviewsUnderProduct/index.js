import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteReview } from '../../store/review';
import ReactStars from 'react-stars';
import Popup from 'reactjs-popup';
import './ReviewsUnderProduct.css'

export default function ReviewsUnderProduct({ reviews }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const { id } = useParams()
  const user = useSelector(state => state.session.user)

  const [overallRating, setOverallRating] = useState(0)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let num = 0;
    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i];
      num += review.rating
    }

    setOverallRating(Math.round(num / reviews.length))
  })

  const closeModal = () => setOpen(false);

  const dateString = (date) => {
    const arr = date.split(' ');
    return `${arr[1]} ${arr[2]}, ${arr[3]}`;
  }

  const reviewLink = (e) => {
    e.preventDefault()

    if (!user) history.push('/login')

    history.push({
      pathname: `/create-review`,
      state: id
    })
  }

  const onDelete = async (e) => {
    await dispatch(deleteReview(e.target.id));
    closeModal()
  }

  return (
    <div className='product-reviews-section-container'>
      <div className='reviews-section-child1'>
        <h2>Customer reviews</h2>
        <ReactStars
          className='overall-rating-stars'
          count={5}
          value={overallRating}
          edit={false}
          size={35}
          color2={'#FFA41C'}
        />
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
            <div className='review-container89023' key={review.id}>
              <div className='reviewee-name'>
                <i className="fas fa-user-circle"></i>
                <p>{review.user.name}</p>
              </div>
              <div className='stars-headline-container'>
                <ReactStars
                  className='review-stars9237'
                  count={5}
                  value={review.rating}
                  edit={false}
                  size={20}
                  color2={'#FFA41C'}
                />
                <p>{review.headline}</p>
              </div>
              <p className='review-creation-date'>Reviewed in {review.user.country} {dateString(new Date(review.created_at).toDateString())}</p>
              <p className='verified-purchase'>Verified Purchase</p>
              <p className='review-description2870'>{review.description}</p>
              {review.owner_id === user?.id && (
                <div className='review-btn-options297'>
                  <button className='edit-review0812'>Edit</button>
                  <button className='delete-review9027' onClick={() => setOpen(o => !o)}>Delete</button>
                  <Popup
                    open={open}
                    closeOnDocumentClick={false}
                    onClose={closeModal}
                    modal
                  >
                    <div className='delete-confirm-modal'>
                      <div className='confirm-container82903'>
                        <i className="fas fa-exclamation-triangle"></i>
                        <h2>Are you sure you want to delete your review?</h2>
                      </div>
                      <div className='confirm-btns-container9723'>
                        <button className='cancel-btn27931' onClick={closeModal}>Nope</button>
                        <button className='delete-btn81794' id={review.id} onClick={onDelete}>Yes</button>
                      </div>
                    </div>
                  </Popup>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
