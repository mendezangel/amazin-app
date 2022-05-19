const LOAD = 'reviews/load';
const CREATE = 'reviews/load';
const DELETE = 'reviews/delete';

// const createReviewAction = payload => {
//   return { type: CREATE, payload }
// }

const loadReviewsAction = payload => {
  return { type: LOAD, payload }
}

const deleteReviewAction = payload => {
  return { type: DELETE, payload }
}

export const deleteReview = (id) => async (dispatch) => {
  const res = await fetch(`/api/reviews/delete/${id}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const { id } = await res.json()
    dispatch(deleteReviewAction(id))
  }
}

export const createReview = (data) => async (dispatch) => {
  const res = await fetch('/api/reviews/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  const { errors } = await res.json();
  if (errors) return errors;
}

export const loadProductReviews = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/reviews/${id}`)
  if (res.ok) {
    const { reviews } = await res.json()
    dispatch(loadReviewsAction(reviews))
  }
}

const initialState = { reviews: [] }

const ReviewReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD:
      newState = {};
      newState.reviews = [...action.payload]

      action.payload.forEach(review => {
        newState[review.id] = review
      })
      return newState;

    default:
      return state;
  }
}

export default ReviewReducer;