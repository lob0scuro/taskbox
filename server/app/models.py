from sqlalchemy import Column, String, Boolean, Integer, Date, func
from flask_login import UserMixin
from app.extentions import db



class User(db.Model, UserMixin):
    id = Column(Integer, primary_key=True)
    first_name = Column(String(100))
    last_name = Column(String(100))
    password = Column(String(255), unique=True, nullable=False)
    tasks = db.relationship('Task', backref="task")
    
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "full_name": f"{self.first_name} {self.last_name}",
            "tasks": [task.serialize() for task in self.tasks]
        }


class Task(db.Model):
    id = Column(Integer, primary_key=True)
    content = Column(String(255))
    created_on = Column(Date, default=func.now())
    owner = Column(Integer, db.ForeignKey("user.id", ondelete='SET NULL'))
    sent_by = Column(Integer, nullable=True)
    is_complete = Column(Boolean, default=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "created_on": self.created_on,
            "owner": self.owner,
            "sent_by": self.sent_by,
            "is_complete": self.is_complete
        }
    
    