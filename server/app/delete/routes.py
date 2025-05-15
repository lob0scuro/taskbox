from flask import request, jsonify
from app.extentions import db
from app.models import User, Task
from flask_login import current_user, login_required
from app.delete import bp

@bp.route("/delete_task/<int:id>", methods=["DELETE"])
@login_required
def delete_task(id):
    task = Task.query.get(id)
    if not task:
        print("Could not find task in database.")
        return jsonify(error="Could not find task in database."), 404
    try:
        db.session.delete(task)
        db.session.commit()
        return jsonify(message="Task deleted."), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error when deleting task: {e}")
        return jsonify(error=f"Error when deleting task: {e}"), 500
    
@bp.route("/delete_all_tasks_by_user/<int:id>", methods=["DELETE"])
@login_required
def delete_all_tasks_by_user(id):
    user = User.query.get(id)
    if not user:
        print("could not find user")
        return jsonify(error="Could not find user."), 404
    try:
        tasks = Task.query.filter_by(owner=id).all()
        for task in tasks:
            db.session.delete(task)
        db.session.commit()
        return jsonify(message="All tasks have been deleted."), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error when deleting tasks: {e}")
        return jsonify(error=f"Error when deleting tasks: {e}"), 500
    
@bp.route("/delete_user/<int:id>", methods=["DELETE"])
@login_required
def delete_user(id):
    user = User.query.get(id)
    if not user:
        print("Could not find user in database.")
        return jsonify(error="Could not find user in database."), 404
    try:
        db.session.delete(user)
        db.session.commit()
        return jsonify(message="User has been deleted."), 200
    except Exception as e:
        db.session.rollback()
        print(f"Error when deleting user: {e}")
        return jsonify(error=f"Error when deleting user: {e}"), 500