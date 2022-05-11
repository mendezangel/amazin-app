"""empty message

Revision ID: 7873d4c5d947
Revises: 8346ee99c639
Create Date: 2022-05-10 18:03:52.807107

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7873d4c5d947'
down_revision = '8346ee99c639'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('products', sa.Column('stock', sa.Integer(), nullable=False))
    op.add_column('users', sa.Column('address', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('city', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('state', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('zip_code', sa.String(length=100), nullable=True))
    op.add_column('users', sa.Column('country', sa.String(length=100), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('users', 'country')
    op.drop_column('users', 'zip_code')
    op.drop_column('users', 'state')
    op.drop_column('users', 'city')
    op.drop_column('users', 'address')
    op.drop_column('products', 'stock')
    # ### end Alembic commands ###