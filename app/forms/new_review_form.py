from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class NewReviewForm(FlaskForm):
  headline = StringField('headline', validators=[DataRequired(), Length(max=75, message='Headline is exceeds 75 character limit.')])
  description = StringField('description', validators=[DataRequired(), Length(max=2000, message='Description exceeds 2000 character limit.')])