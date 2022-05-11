from app.models import db, User
import requests
from faker import Faker

# Adds a demo user, you can add other users here if you want
def seed_users():
    fake = Faker()
    response = requests.get('https://dummyjson.com/users')
    users = response.json()['users']
    for user in users:
      newUser = User(
        name=user['firstName'] + ' ' + user['lastName'],
        email=user['email'],
        password='password',
        address=user['address']['address'],
        city=user['address']['city'],
        state=user['address']['state'],
        zip_code=fake.postcode(),
        country=fake.country()
      )
      db.session.add(newUser)
      db.session.commit()


# # Uses a raw SQL query to TRUNCATE the users table.
# # SQLAlchemy doesn't have a built in function to do this
# # TRUNCATE Removes all the data from the table, and RESET IDENTITY
# # resets the auto incrementing primary key, CASCADE deletes any
# # dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
