import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import ReactStars from 'react-stars'
import Footer from '../Footer'
import { editReview } from '../../store/review'

export default function EditReviewForm() {
  const { state } = useLocation()
  const { id, review } = state;
  const dispatch = useDispatch()
  const history = useHistory()

  const product = useSelector(state => state.product[id])
  const user = useSelector(state => state.session.user)

  const [headline, setHeadline] = useState(review.headline)
  const [description, setDescription] = useState(review.description)
  const [value, setValue] = useState(review.rating)
  const [errors, setErrors] = useState([])

  const updateHeadline = (e) => setHeadline(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updateRating = (num) => setValue(num)

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(editReview({
      review_id: review.id,
      headline,
      description,
      rating: value
    }))

    if (data.errors) return setErrors(data.errors);

    return history.push(`/products/${id}`);
  }

  return (
    <div>
      <div className='whole-page-review-form'>
        <div className='create-review-container'>
          <h1 className='create-review-h1'>Edit Review</h1>
          <div className='product-details34578'>
            <div className='img-container7923'>
              <img src={product.image_url} />
            </div>
            <p>{product.name}</p>
          </div>
          <h2 className='overall-rating27289'>Overall rating</h2>
          <ReactStars
            className='set-rating-stars2397'
            count={5}
            value={value}
            color2={'#FFA41C'}
            half={false}
            size={50}
            onChange={updateRating}
          />
          <form onSubmit={onSubmit} className='create-review-form'>
            <label htmlFor='headline'><h2>Add a headline</h2></label>
            <input
              name='headline'
              type='text'
              placeholder="What's most important to know?"
              value={headline}
              onChange={updateHeadline}
            />
            {errors?.headline?.map(error => {
              return (
                <p className='error' key={error}>{error}</p>
              )
            })}
            <label htmlFor='description'><h2>Add a written review</h2></label>
            <textarea
              name='description'
              type='text'
              placeholder='What did you like or dislike? What did you use this product for?'
              value={description}
              onChange={updateDescription}
            />
            {errors?.description?.map(error => {
              return (
                <p className='error' key={error}>{error}</p>
              )
            })}
            <div className='create-review-button-container'>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}