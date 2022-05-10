from .db import db
from datetime import datetime

class Order(db.Model):
  __tablename__ = 'orders'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  total_cost = db.Column(db.Float, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  user = db.relationship('User', back_populates='orders')
  products_ordered = db.relationship('Order_Item', back_populates='order', cascade='all, delete')

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'total_cost': self.total_cost,
      'created_at': self.created_at
    }