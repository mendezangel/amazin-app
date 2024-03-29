"""empty message

Revision ID: c889e960b9a8
Revises: a698ac3ae57b
Create Date: 2022-05-16 11:05:45.202113

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c889e960b9a8'
down_revision = 'a698ac3ae57b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('order_items_order_id_key', 'order_items', type_='unique')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint('order_items_order_id_key', 'order_items', ['order_id'])
    # ### end Alembic commands ###
