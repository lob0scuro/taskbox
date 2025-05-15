from flask import Flask
from config import Config
from app.extentions import db, cors, login_manager, bcrypt, migrate
from app.models import User

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    db.init_app(app)
    cors.init_app(app)
    login_manager.init_app(app)
    bcrypt.init_app(app)
    migrate.init_app(app, db)
    
    
    from app.auth import bp as auth_bp
    app.register_blueprint(auth_bp)
    from app.read import bp as read_bp
    app.register_blueprint(read_bp)
    from app.update import bp as update_bp
    app.register_blueprint(update_bp)
    from app.create import bp as create_bp
    app.register_blueprint(create_bp)
    from app.delete import bp as delete_bp
    app.register_blueprint(delete_bp)
    
    
    @login_manager.user_loader
    def load_user(id):
        return User.query.get(id)
    
    return app