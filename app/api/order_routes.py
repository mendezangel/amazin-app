from flask import Blueprint, request
from app.models import db, Order, Order_Item
from flask_login import login_required, current_user

order_routes = Blueprint('orders', __name__)

@order_routes.route('/')
@login_required
def get_orders():
  orders = Order.query.filter_by(user_id=current_user.id).all()

  return {'orders': [order.to_dict() for order in orders]}

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
      stock = item['stock']
      errors.append(f'Quantity selected exceeds current stock. There are only {stock} available.')

  if errors:
    return {'errors': errors}, 401

  if data['delivery_instructions']:
    order = Order(
      user_id=data['user_id'],
      total_cost=data['total_cost'],
      delivery_instructions=data['delivery_instructions']
    )
  else:
    order = Order(
      user_id=data['user_id'],
      total_cost=data['total_cost']
    )

  db.session.add(order)
  db.session.commit()

  for item in data['items']:
    ordered_item = Order_Item(
      order_id=order.id,
      product_id=item['id'],
      quantity=item['quantity']
    )
    db.session.add(ordered_item)
  db.session.commit()

  return order.to_dict()

@order_routes.route('/delete/<int:id>')
def delete_order(id):
  print('\n\n\n\n\nYOU HIT THIS ROUTE\n\n\n\n')
  order = Order.query.get(id)
  db.session.delete(order)
  db.session.commit
  return order.to_dict()