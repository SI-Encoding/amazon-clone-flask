from app import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    password = db.Column(db.Text)

    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password

    def json(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password
        }

    def __repr__(self):
        return f'<User: {self.username}>'

db.create_all()
db.session.add(User(username='Darren', password='password'))
db.session.commit()

