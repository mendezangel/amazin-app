const LOAD = 'reviews/load';

const loadReviewsAction = payload => {
  return { type: LOAD, payload }
}

export const loadProductReviews = () => async (dispatch) => {
  const res = await fetch('/api/products/reviews')
  if (res.ok) {
    const { products } = await res.json()
    dispatch(loadReviewsAction(products))
  }
}

const initialState = { reviews: [] }

const ReviewReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD:
      newState = { ...state };
      newState.reviews = [...state.reviews]
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