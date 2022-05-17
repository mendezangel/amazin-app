import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import OrderCard from './OrderCard'
import { loadOrders } from '../../store/order'
import './Order.css'
import { updateOrder } from '../../store/order'

export default function Order() {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const orders = useSelector(state => state.order.orders)

  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dispatch(loadOrders(user.id))
    setLoaded(true)
  }, [dispatch])

  const onUpdateInstructions = (id, instructions) => {
    const data = {
      id,
      instructions
    }
  }

  // if (!user) return history.push('/login')
  if (!loaded) return null;

  return (
    <div className='whole-page-div23467'>
      <div className='your-orders-container'>
        <h1>Your Orders</h1>
        {orders.map(order => {
          return (
            <OrderCard order={order} key={order.id} />
          )
        })}
      </div>
    </div>
  )
}
