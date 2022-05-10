from .db import db
from datetime import datetime

class Order_Item(db.Model):
  __tablename__ = 'order_items'

  id = db.Column(db.Integer, primary_key=True)
  order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), unique=True, nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
  quantity = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  product = db.relationship('Product', back_populates='not_sure')
  order = db.relationship('Order', back_populates='products_ordered')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'product_id': self.product_id,
      'quantity': self.quantity,
      'is_owned': self.is_owned,
      'created_at': self.created_at
    }