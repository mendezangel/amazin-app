import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './OrderCard.css'
import { deleteOrder } from '../../../store/order';
import { loadOrders } from '../../../store/order';
import { updateOrder } from '../../../store/order'
import Popup from 'reactjs-popup';

export default function OrderCard({ order }) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)

  const [products, setProducts] = useState([])
  const [deliveryDate, setDeliveryDate] = useState('')
  const [textArea, setTextArea] = useState(order.delivery_instructions)
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [loaded, setLoaded] = useState(false)

  const orderPlaced = order.created_at.split(' ')
  const closeModal = () => setOpen(false)
  const closeModal1 = () => setOpen1(false)

  useEffect(() => {
    setDeliveryDate(new Date(new Date(order.created_at).setDate(new Date(order.created_at).getDate() + 2)))
    setProducts(order.products_ordered)
    setLoaded(true)
  }, [])

  const handleDelete = async (e) => {
    await dispatch(deleteOrder(e.target.id))
    await dispatch(loadOrders(user.id))
  }

  const updateTextArea = (e) => {
    setTextArea(e.target.value)
  }

  const onUpdateInstructions = async (e) => {
    const order = await dispatch(updateOrder(e.target.id, textArea))
    closeModal()
    setTextArea(order.order[0].delivery_instructions)
  }


  if (!loaded) return null;

  return (
    <div className='order-card-container'>
      <div className='order-card-child1'>
        <div className='order-card-details-container'>
          <div className='details-order-placed'>
            <p>ORDER PLACED</p>
            <p>{orderPlaced[2]} {orderPlaced[1]}, {orderPlaced[3]}</p>
          </div>
          <div className='details-total'>
            <p>TOTAL</p>
            <p className=''>${order.total_cost}</p>
          </div>
          <div className='details-ship-to'>
            <p>SHIP TO</p>
            <p>{order.user.name}</p>
          </div>
        </div>
        {deliveryDate > new Date() && (
          <>
            <div className='update-delivery-instructions' onClick={() => setOpen(o => !o)}>Update Delivery Instructions</div>
            <Popup
              open={open}
              closeOnDocumentClick
              onClose={closeModal}
              modal
            >
              <div className='update-instructions-modal-container'>
                <textarea className='modal-textarea' value={textArea} onChange={updateTextArea} maxLength={100} />
                <div className='modal-bts-container'>
                  <button className='modal-cancel-button modal-button' onClick={closeModal}>Cancel</button>
                  <button className='modal-submit-button modal-button' onClick={onUpdateInstructions} id={order.id}>Update</button>
                </div>
              </div>
            </Popup>
          </>
        )}
      </div>
      <div className='order-card-child2'>
        <div className='order-card-child2-text'>
          {order.created_at && deliveryDate < new Date() ?
            <h2 className='order-delivered-text'>Delivered {deliveryDate.toDateString().split(' ')[1]} {deliveryDate.toDateString().split(' ')[2]}</h2>
            :
            <h2 className='order-not-delivered-text'>Expected Delivery: {deliveryDate.toDateString().split(' ')[1]} {deliveryDate.toDateString().split(' ')[2]}</h2>
          }
        </div>
        <div className='item-details-container6840'>
          {products.map(product => {
            return (
              <div className='single-item-container9458' key={product.id}>
                <div className='image-container12738'><img src={product.product.image_url} /></div>
                <div className='item-info4672'>
                  <Link to={`/products/${product.product_id}`}>{product.product.name}</Link>
                  <div className='product-buy-again'>Buy it again</div>
                </div>
              </div>

            )
          })}
        </div>
      </div>
      <div className='order-card-child3'><p onClick={() => setOpen1(o => !o)} id={order.id}>
        {order.created_at && deliveryDate < new Date() ? 'Delete archive' : 'Cancel order'}
      </p></div>
      <Popup
        open={open1}
        closeOnDocumentClick={false}
        onClose={closeModal1}
        modal
      >
        <div className='delete-confirm-modal'>
          <div className='confirm-container82903'>
            <i className="fas fa-exclamation-triangle"></i>
            <h2>{order.created_at && deliveryDate < new Date() ? 'Are you sure you want to delete this archive?' : 'Are you sure you want to cancel your order?'}</h2>
          </div>
          <div className='confirm-btns-container9723'>
            <button className='cancel-btn27931' onClick={closeModal1}>Nope</button>
            <button className='delete-btn81794' id={order.id} onClick={handleDelete}>Yes</button>
          </div>
        </div>
      </Popup>
    </div>
  )
}
