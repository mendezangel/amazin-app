const LOAD = 'reviews/load';

const loadReviewsAction = payload => {
  return { type: LOAD, payload }
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
      // newState.reviews = [...state.reviews]
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