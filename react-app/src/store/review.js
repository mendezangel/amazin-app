const LOAD = 'reviews/load';
const CREATE = 'reviews/load';

const createReviewAction = payload => {
  return { type: CREATE, payload }
}

const loadReviewsAction = payload => {
  return { type: LOAD, payload }
}

export const createReview = (data) => async (dispatch) => {
  const res = await fetch('/api/reviews/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (res.errors) {
    const { errors } = res.json()
    return errors;
  }
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