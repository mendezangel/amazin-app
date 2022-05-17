import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import OrderCard from './OrderCard'
import { loadOrders } from '../../store/order'

export default function Order() {
  const history = useHistory()
  const dispatch = useDispatch()

  const user = useSelector(state => state.session.user)
  const orders = useSelector(state => state.order.orders)

  useEffect(() => {
    dispatch(loadOrders(user.id))
  }, [dispatch])

  if (!user) return history.push('/login')

  return (
    <div>
      Order
      {/* {orders.map(order => {
        <OrderCard order={order} />
      })} */}
    </div>
  )
}
