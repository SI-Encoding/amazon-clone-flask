
class Controller:
    def __init__(self, model, db):
        self.model = model
        self.db = db

    def get_one(self, **criteria):
        item = self.model.query.filter(**criteria).first()
        return item

    def get_many(self, limit=10, **criteria):
        if criteria:
            items = self.model.query.filter(**criteria).limit(limit=limit)
        else:
            items = self.model.query.all()
        return items

    def add_one(self, *args, **kwargs):
        new_item = self.model(*args, **kwargs)
        self.db.session.add(new_item)
        self.db.session.commit()
        return new_item

    def update_one(self, item, **kwargs):
        for key, val in kwargs.items():
            setattr(item, key, val)
        self.db.session.commit()

    def delete_one(self, item):
        item.delete()
        self.db.session.commit()


