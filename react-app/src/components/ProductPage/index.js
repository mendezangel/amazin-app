import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getOneProduct } from '../../store/product'

export default function ProductPage() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const user = useSelector(state => state.session.user)
  const product = useSelector(state => state.product.id)

  useEffect(() => {
    (async () => {
      await dispatch(getOneProduct(id))
    })();
  }, [dispatch])


  return (
    <div className='product-details-wrapper'>
      <div className='product-details-img-container'></div>
      <div className='product-details-container'></div>
      <div className='product-details-buy-container'></div>
    </div>
  )
}
