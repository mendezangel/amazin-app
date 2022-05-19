const LOAD = 'reviews/load';
const CREATE = 'reviews/load';
const DELETE = 'reviews/delete';
const UPDATE = 'reviews/update';

// const createReviewAction = payload => {
//   return { type: CREATE, payload }
// }

const loadReviewsAction = payload => {
  return { type: LOAD, payload }
}

const deleteReviewAction = payload => {
  return { type: DELETE, payload }
}

// const updateReviewAction = payload => {
//   return {type: UPDATE, payload}
// }

export const editReview = (data) => async (dispatch) => {
  const res = await fetch('/api/reviews/edit/', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const { review } = await res.json()
    return dispatch(loadReviewsAction(review))
  }
  const resData = await res.json()
  if (resData.errors) return resData;
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
  const res = await fetch(`/api/products/reviews/${id}/`)
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

    case DELETE:
      newState = { ...state }
      newState.reviews = [...state.reviews]
      delete newState[action.payload]
      for (let i = 0; i < newState.reviews.length; i++) {
        const review = newState.reviews[i];
        if (review.id === action.payload) newState.reviews.splice(i, 1)
      }
      return newState;

    default:
      return state;
  }
}

export default ReviewReducer;