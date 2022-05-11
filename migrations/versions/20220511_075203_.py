"""empty message

Revision ID: 81aaef020a64
Revises: 7873d4c5d947
Create Date: 2022-05-11 07:52:03.671366

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81aaef020a64'
down_revision = '7873d4c5d947'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'name',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.String(length=200),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('products', 'name',
               existing_type=sa.String(length=200),
               type_=sa.VARCHAR(length=50),
               existing_nullable=False)
    # ### end Alembic commands ###