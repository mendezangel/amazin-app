from .db import db
from datetime import datetime

class Order(db.Model):
  __tablename__ = 'orders'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  total_cost = db.Column(db.Float, nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.now())