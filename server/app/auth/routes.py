from flask import request, jsonify
from app.extentions import db, bcrypt
from app.auth import bp
from app.models import User
from flask_login import current_user, login_user, logout_user, login_required
 
 
@bp.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        print("Registration Error: Did not recieve payload in request")
        return jsonify(error="Registration Error: Did not recieve payload in request"), 400
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    password1 = data.get("password1")
    password2 = data.get("password2")
    
    if password1 != password2:
        return jsonify(error="Passwords do not match, please check inputs and try again."), 400
    
    hashed_password = bcrypt.generate_password_hash(password1).decode("utf-8")
    
    try:
        new_user = User(first_name=first_name.capitalize(), last_name=last_name.capitalize(), password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message=f"{new_user.first_name} has been registered!"), 201
    except Exception as e:
        db.session.rollback()
        print(f"Server Error during registration: {e}")
        return jsonify(error=f"Server Error during registration: {e}"), 500
    

@bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        if not data:
            print("Error when loggin in: No payload in request")
            return jsonify(error="Error when loggin in: No payload in request"), 400
        id = data.get("id")
        password = data.get("password")
        if not id or not password:
            print("Did not recieve valid credentials")
            return jsonify(error="All fields are required"), 400
        
        user = User.query.get(int(id))
        if not user:
            print("User not found.")
            return jsonify(error="User not found."), 404
        
        if not bcrypt.check_password_hash(user.password, password):
            print("Invalid credentials, check inputs and try again")
            return jsonify(error="Invalid credentials, check inputs and try again"), 403
        
        login_user(user)
        print(f"{user.first_name} has been logged in.")
        return jsonify(message=f"{user.first_name} has been logged in.", user=user.serialize()), 200
    except Exception as e:
        print(f"Server error when logging in: {e}")
        return jsonify(error=f"Server error when logging in: {e}"), 500
    
@bp.route("/logout", methods=['GET'])
@login_required
def logout():
    logout_user()
    print("User has been logged out")
    return jsonify(message="Logged out."), 200
    
    
    
        