from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id =  db.Column(db.String(32), primary_key=True, unique=True)
    date = db.Column(db.Date, nullable=False)
    name = db.Column(db.String(20), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    pwd = db.Column(db.String(255), nullable=False)
    token = db.Column(db.String(255), nullable=True)

    categories = db.relationship("Category", backref="user", lazy=True, cascade="all, delete")
    packs = db.relationship("Pack", backref="user", lazy=True, cascade="all, delete")
    cards = db.relationship("Card", backref="user", lazy=True, cascade="all, delete")

class Category(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True)
    date = db.Column(db.Date, nullable=False)
    name = db.Column(db.String(255), nullable=False, unique=False)
    id_user = db.Column(db.String(32), db.ForeignKey("user.id"))

    packs = db.relationship("Pack", back_populates="category", lazy=True)

mailbox = db.Table('mailbox',
        db.Column('pack_id', db.String(32), db.ForeignKey('pack.id')),
        db.Column('card_id', db.String(32), db.ForeignKey('card.id'))
    )

class Pack(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True)
    date = db.Column(db.Date, nullable=False)
    name = db.Column(db.String(255), nullable=False, unique=False)
    status = db.Column(db.String(255), nullable=False, unique=False)
    id_user = db.Column(db.String(32), db.ForeignKey("user.id"))
    id_cat = db.Column(db.String(32), db.ForeignKey("category.id"))

    cards = db.relationship("Card", secondary=mailbox, back_populates="packs", lazy=True)
    category = db.relationship("Category", back_populates="packs", lazy=True)

class Card(db.Model):
    id = db.Column(db.String(32), primary_key=True, unique=True)
    date = db.Column(db.Date, nullable=False)
    side_a = db.Column(db.String(32), nullable=False, unique=False)
    side_b = db.Column(db.String(32), nullable=False, unique=False)
    id_user = db.Column(db.String(32), db.ForeignKey("user.id"))

    packs = db.relationship("Pack", secondary=mailbox, back_populates="cards", lazy=True)







