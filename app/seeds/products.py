from app.models import db, User, Product
import requests
import random
from faker import Faker


def seed_products():
  response = requests.get('https://dummyjson.com/products?limit=100')
  data = response.json()['products']

  for item in data:
    product = Product(
      name=item['title'],
      description=item['description'],
      category=item['category'],
      price=item['price'],
      stock=item['stock'],
      image_url=item['images'][0]
    )

    db.session.add(product)
    db.session.commit()

  # response1 = requests.get('https://fakestoreapi.com/products')
  # products = response1.json()
  # fake = Faker()

  # for item in products:
  #   product = Product(
  #     name=item['title'],
  #     description=item['description'],
  #     category=item['category'],
  #     price=item['price'],
  #     stock=(fake.random_digit_not_null() * fake.random_digit_not_null()) * 2,
  #     image_url=item['image']
  #   )
    
  #   db.session.add(product)
  #   db.session.commit()


def undo_products():
  db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
  db.session.commit()