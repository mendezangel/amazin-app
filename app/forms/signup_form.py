from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

class SignUpForm(FlaskForm):
    name = StringField(
        'name', validators=[DataRequired(), Length(min=3, max=40, message='Name must be within 3 to 40 characters.')])
    email = StringField('email', validators=[DataRequired(), Email(message='Please input a valid email address.'), user_exists])
    password = StringField('password', validators=[DataRequired(), EqualTo('repeat_password', message='Passwords must match'), Length(min=7, message='Password must be at least 7 characters long.')])
    repeat_password = StringField('repeat_password')
