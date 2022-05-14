"""empty message

Revision ID: a698ac3ae57b
Revises: a0f7d82cb9ae
Create Date: 2022-05-13 20:53:39.074427

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a698ac3ae57b'
down_revision = 'a0f7d82cb9ae'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('orders', 'delivery_instructions',
               existing_type=sa.VARCHAR(length=1000),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('orders', 'delivery_instructions',
               existing_type=sa.VARCHAR(length=1000),
               nullable=False)
    # ### end Alembic commands ###