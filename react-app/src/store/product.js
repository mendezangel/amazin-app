const LOAD = 'products/load';

const products = payload => {
  return { type: LOAD, payload }
};

export const getAllProducts = () => async (dispatch) => {
  const res = await fetch('api/products');
  if (res.ok) {
    const { products: productsArray } = await res.json();
    // console.log(products(productsArray))
    dispatch(products(productsArray))
    return productsArray;
  }
}

// const initialState = { productsId: [], reviews: {} }
const initialState = {}

const ProductReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case LOAD:
      newState = { ...state };
      console.log(action)
      action.payload.forEach(product => {
        newState[product.id] = product
      })
      return newState;

    default:
      return state;
  }
}

export default ProductReducer;