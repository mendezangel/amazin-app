const CREATE = 'orders/create'

const createOrderAction = payload => {
  return { type: CREATE, payload }
}

export const createOrder = (data) => async (dispatch) => {
  const res = await fetch('/api/orders/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
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