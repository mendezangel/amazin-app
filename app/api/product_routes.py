from flask import Blueprint
from app.models import Product, Review

product_routes = Blueprint('products', __name__)

@product_routes.route('/')
def get_products():
  products = Product.query.all()
  return {'products': [product.to_dict() for product in products]}

@product_routes.route('/<int:id>')
def get_product(id):
  product = Product.query.get(id)
  return {'product': [product.to_dict()]}

@product_routes.route('/reviews/<int:id>')
def get_reviews(id):
  reviews = Review.query.filter_by(product_id=id).order_by(Review.id.desc()).all()
  return {'reviews': [review.to_dict() for review in reviews]}