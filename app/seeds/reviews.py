from app.models import db, User, Review
from faker import Faker

def seed_reviews():
  fake = Faker()
  for x in range(1000):
    review = Review(
      owner_id=fake.random_int(min=1, max=30),
      product_id=fake.random_int(min=1, max=100),
      description=fake.paragraph(nb_sentences=15),
      rating=fake.random_int(min=1, max=5)
    )
    db.session.add(review)
  db.session.commit()

def undo_reviews():
  db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
  db.session.commit()