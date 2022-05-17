const CREATE = 'orders/create'
const LOAD = 'orders/load'

const createOrderAction = payload => {
  return { type: CREATE, payload }
}

const loadOrdersAction = payload => {
  return { type: LOAD, payload }
}

export const loadOrders = (id) => async (dispatch) => {
  const res = await fetch(`/api/orders/`)

  if (res.ok) {
    const orders = await res.json()
    dispatch(loadOrdersAction(orders.orders))
  }
}

export const createOrder = (data) => async (dispatch) => {
  const res = await fetch('/api/orders/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
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
    case LOAD:
      newState = { ...state, orders: [...state.orders] }
      newState.orders = [...action.payload];
      for (let i = 0; i < action.payload.length; i++) {
        const order = action.payload[i];
        newState[order.id] = order;
      }
      return newState;

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