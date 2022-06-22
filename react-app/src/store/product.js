const LOAD = 'products/load';
const SEARCH = 'products/search';
const CLEARSEARCH = 'products/clearsearch';

const products = payload => {
  return { type: LOAD, payload }
};

const searchAction = searchTerms => {
  return { type: SEARCH, searchTerms }
}

const clearSearchAction = () => {
  return { type: CLEARSEARCH }
};

export const clearSearch = () => async (dispatch) => {
  dispatch(clearSearchAction())
}

export const search = (searchTerms) => async (dispatch) => {
  dispatch(searchAction(searchTerms))
}

export const getAllProducts = () => async (dispatch) => {
  const res = await fetch('/api/products/');
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
const initialState = { products: [] }

const ProductReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case SEARCH:
      newState = { ...state, products: [...state.products] }
      newState.searchTerms = action.searchTerms
      return newState;

    case CLEARSEARCH:
      newState = { ...state, products: [...state.products] }
      delete newState.searchTerms;
      return newState;

    case LOAD:
      newState = { ...state, products: [...state.products] };
      newState.products = [...state.products]
      // newState.reviews = { ...newState.reviews }
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