from flask import Blueprint, request
from app.models import db, Review
from app.forms import NewReviewForm
from flask_login import login_required

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/')
def load_reviews():
  reviews = Review.query.all();
  return {'reviews': [review.to_dict() for review in reviews]}

@review_routes.route('/new', methods=['POST'])
@login_required
def new_review():
  data = request.json
  form = NewReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review = Review(
      owner_id=data['owner_id'],
      product_id=data['product_id'],
      headline=form.data['headline'],
      description=form.data['description'],
      rating=data['rating']
    )
    db.session.add(review)
    db.session.commit()
    return review.to_dict()
  
  return {'errors': form.errors}, 401

@review_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_review(id):
  review = Review.query.get(id)
  db.session.delete(review)
  db.session.commit()
  return {'id': id}

@review_routes.route('/edit/', methods=['PATCH'])
@login_required
def edit_review():
  data = request.json
  review = Review.query.get(data['review_id'])
  form = NewReviewForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    review.headline = data['headline']
    review.description = data['description']
    review.rating = data['rating']
    db.session.commit()
    return {'review': [review.to_dict()]}

  return {'errors': form.errors}, 401