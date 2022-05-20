from app.models import db, Order, Order_Item, Product
from datetime import datetime
from faker import Faker

def seed_orders():
  fake = Faker()
  for x in range(500):
    order = Order(
      user_id=fake.random_int(min=1, max=30),
      delivery_instructions=fake.paragraph(nb_sentences=1),
      total_cost=fake.random_int(min=50.00, max=2000.00),
      created_at=datetime(fake.random_int(min=2000, max=2021), fake.random_int(min=1, max=12), fake.random_int(min=1, max=28), hour=fake.random_int(min=0, max=23), minute=fake.random_int(min=0, max=59), second=0)
    )
    db.session.add(order)
    db.session.commit()

    for x in range(fake.random_int(min=1, max=9)):
      ordered_item = Order_Item(
        order_id=order.id,
        product_id=fake.random_int(min=1, max=100),
        quantity=fake.random_int(min=1, max=9)
      )
      db.session.add(ordered_item)
    db.session.commit()

def undo_orders_and_items():
  db.session.execute('TRUNCATE orders RESTART IDENTITY CASCADE;')
  db.session.execute('TRUNCATE order_items RESTART IDENTITY CASCADE;')
  db.session.commit()