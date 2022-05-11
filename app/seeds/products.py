from app.models import db, User, Product
import requests


def seed_products():
  response = requests.get('https://dummyjson.com/products?limit=100')
  data = response.json()['products']

  for item in data:
    product = Product(
      name=item['title'],
      description=item['description'],
      category=item['category'],
      price=item['price'],
      stock=item['stock']
    )

    for image in item[images]:
      product.images.append(image)

    db.session.add(product)
    db.session.commit()

def undo_products():
  db.session.execute('TRUNCATE products RESTART IDENTITY CASCADE;')
  db.session.commit()