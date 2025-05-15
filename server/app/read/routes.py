from flask import request, jsonify
from app.extentions import db
from app.models import User, Task
from flask_login import login_required
from app.read import bp

@bp.route("/fetch_one_user/<int:id>", methods=["GET"])
def fetch_one_user(id):
    try:
        user = User.query.get(id)
        if not user:
            print("User not found.")
            return jsonify(error="User not found."), 404
        return jsonify(user=user.serialize()), 200
    except Exception as e:
        print(f"Error when fetching user: {e}")
        return jsonify(f"Error when fetching user"), 500

@bp.route("/fetch_all_users", methods=['GET'])
def fetch_all_users():
    try:
        users = User.query.all()
        if not users:
            return jsonify(error="No users found."), 404
        return jsonify(users=[user.serialize() for user in users]), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify(error="Error fetching users from database."), 500


@bp.route("/fetch_one_task/<int:id>", methods=["GET"])
def fetch_one_task(id):
    task = Task.query.get(id)
    if not task:
        print("Task not found.")
        return jsonify(error="Task not found."), 404
    return jsonify(task=task.serialize())

    
@bp.route("/fetch_all_tasks", methods=['GET'])
@login_required
def fetch_all_tasks():
    tasks = Task.query.all()
    if not tasks:
        print("Error when querying for tasks")
        return jsonify(error="Error fetching tasks from database."), 400
    return jsonify(tasks=[task.serialize() for task in tasks]), 200

@bp.route("/fetch_all_tasks_by_user/<int:id>", methods=["GET"])
@login_required
def fetch_all_tasks_by_user(id):
    tasks = Task.query.filter_by(owner=id).all()
    if not tasks:
        print("Could not find tasks for user.")
        return jsonify(error="Could not find tasks for user"), 400
    return jsonify(tasks=[task.serialize() for task in tasks]), 200
    
