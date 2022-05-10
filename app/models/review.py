from .db import db
from datetime import datetime

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
  description = db.Column(db.Text, nullable=False)
  rating = db.Column(db.Integer, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.now())

  def to_dict(self):
    return {
      'id': self.id,
      'owner_id': self.owner_id,
      'product_id': self.product_id,
      'description': self.description,
      'rating': self.rating
    }