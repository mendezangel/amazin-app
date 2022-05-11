from .db import db
from datetime import datetime

class Product(db.Model):
  __tablename__ = 'products'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50), nullable=False)
  description = db.Column(db.String(2000))
  category = db.Column(db.String(50), nullable=False)
  price = db.Column(db.Float, nullable=False)
  stock = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  reviews = db.relationship('Review', back_populates='product', cascade='all, delete')
  not_sure = db.relationship('Order_Item', back_populates='product', cascade='all, delete')
  images = []

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'description': self.description,
      'category': self.category,
      'price': self.price
    }