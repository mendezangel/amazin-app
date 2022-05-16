const CREATE = 'orders/create'

const createOrderAction = payload => {
  return { type: CREATE, payload }
}

export const createOrder = (data) => async (dispatch) => {
  console.log('before res')
  const res = await fetch('/api/orders/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  console.log('after res')
  if (res.ok) {
    const data = await res.json()
    dispatch(createOrderAction(data))
    return
  } else if (res.status < 500) {
    const data = await res.json();

    if (data.errors) return data.errors;
  } else return ['An error occurred.'];
}

const initialState = { orders: [] }
const OrderReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE:
      newState = { ...state, orders: [...state.orders] }
      newState[action.payload.id] = action.payload
      newState.orders.push(action.payload)
      return newState

    default:
      return state;
  }
}

export default OrderReducer;