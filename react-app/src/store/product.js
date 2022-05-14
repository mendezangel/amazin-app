const LOAD = 'products/load';

const products = payload => {
  return { type: LOAD, payload }
};

export const getAllProducts = () => async (dispatch) => {
  const res = await fetch('/api/products');
  if (res.ok) {
    const { products: productsArray } = await res.json();
    dispatch(products(productsArray))
    return productsArray;
  }
}

export const getOneProduct = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`)
  if (res.ok) {
    const { product } = await res.json();
    dispatch(products(product))
  }
}
const initialState = { products: [], reviews: {} }

const ProductReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD:
      newState = { ...state };
      newState.products = [...newState.products]
      newState.reviews = { ...newState.reviews }
      newState.products = [...action.payload]
      action.payload.forEach(product => {
        newState[product.id] = product
      })
      return newState;

    default:
      return state;
  }
}

export default ProductReducer;