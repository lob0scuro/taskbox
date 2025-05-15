from flask import request, jsonify
from app.extentions import db
from app.models import User, Task
from flask_login import current_user, login_required
from app.update import bp

@bp.route("/complete_task/<int:id>", methods=["PATCH"])
@login_required
def complete_task(id):
    task = Task.query.get(id)
    if not task:
        print("Error: could not find task in database.")
        return jsonify(error="Could not find task"), 401
    try:
        task.is_complete = True
        db.session.commit()
        return jsonify(message="Task completed!"), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error could not complete task: {e}")
        return jsonify(error=f"Error could not complete task: {e}"), 500
    
@bp.route("/redo_task/<int:id>", methods=["PATCH"])
@login_required
def redo_task(id):
    task = Task.query.get(id)
    if not task:
        print("Error: could not find task in database")
        return jsonify(error="Could not find task"), 401
    try:
        task.is_complete = False
        db.session.commit()
        return jsonify(message="Task undone"), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error when performing task redo: {e}")
        return jsonify(error=f"Could not redo task: {e}"), 500
    
@bp.route("/complete_all_tasks_by_user/<int:id>", methods=["PATCH"])
@login_required
def complete_all_tasks_by_user(id):
    user = User.query.get(id)
    if not user:
        print("User not found")
        return jsonify(error="User not found"), 404
    try:
        tasks = Task.query.filter_by(owner=user.id).all()
        for task in tasks:
            task.is_complete = True
        db.session.commit()
        return jsonify(message="All tasks have been completed!."), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error when completing tasks: {e}")
        return jsonify(error=f"Error when completing tasks: {e}"), 500
    
@bp.route("/edit_user_info/<int:id>", methods=["PATCH"])
@login_required
def edit_user_info(id):
    try:
        user = User.query.get(id)
        if not user:
            print("Error: user not found.")
            return jsonify(error="Error: user not found."), 404
        data = request.get_json()
        if not data:
            print("Error when editing user: no payload in request")
            return jsonify(error="Error when editing user: no payload in request"), 400
        fields = ["first_name", "last_name"]
        updated = False
        for field in fields:
            incoming_value = data[field]
            current_value = getattr(user, field)
            if incoming_value != current_value:
                setattr(user, field, incoming_value)
                updated = True
        if updated:
            db.session.commit()
            return jsonify(message="User updated.", user=user.serialize()), 200
        else:
            return jsonify(message="No updated were made"), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error when updating user: {e}")
        return jsonify(error=f"Error when updating user: {e}"), 500