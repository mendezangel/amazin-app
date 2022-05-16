from flask import Blueprint, request
from app.models import Order, Order_Item
from flask_login import login_required

order_routes = Blueprint('orders', __name__)

@order_routes.route('/new', methods=['POST'])
@login_required
def new_order():
  data = request.json
  errors = []

  if len(data['items']) <= 0:
    errors.append('Your cart is empty.')
  if len(data['delivery_instructions']) > 100:
    errors.append('Delivery instructions exceed 100 character limit.')
  for item in data['items']:
    if item['quantity'] > item['stock']:
      errors.append(f'Quantity selected exceeds current stock. There are only {item['stock']} available.')

  if errors:
    return {'errors': errors}

  if data['delivery_instructions']:
    order = Order(
      user_id=data['user_id']
      total_cost=data['total_cost']
      delivery_instructions=data['delivery_instructions']
    )
  else:
    order = Order(
      user_id=data['user_id']
      total_cost=data['total_cost']
    )

  db.session.add(order)
  db.session.commit()

  for item in data['items']:
    ordered_item = Order_Item(
      order_id=order.id
      product_id=item['id']
      quantity=item['quantity']
    )
    db.session.add(ordered_item)
  db.session.commit()

  return {'order': order.to_dict()}