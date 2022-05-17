from .db import db
from datetime import datetime

class Order(db.Model):
  __tablename__ = 'orders'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  delivery_instructions = db.Column(db.String(1000), default='Deliver to front door.')
  total_cost = db.Column(db.Float, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  user = db.relationship('User', back_populates='orders')
  products_ordered = db.relationship('Order_Item', back_populates='order', cascade='all, delete')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'total_cost': self.total_cost,
      'delivery_instructions': self.delivery_instructions,
      'created_at': self.created_at,
      'products_ordered': [product.to_dict() for product in self.products_ordered],
      'user': self.user.to_dict()
    }