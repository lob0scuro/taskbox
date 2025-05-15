from flask import request, jsonify
from app.extentions import db
from app.models import User, Task
from flask_login import current_user, login_required
from app.create import bp


@bp.route("add_task", methods=["POST"])
@login_required
def add_task():
    data = request.get_json()
    if not data:
        print("Error: no payload in request")
        return jsonify(error="Error: No data in payload"), 400
    content = data.get("content")
    if not content:
        print("Error when creating new task - No content.")
        return jsonify(error="Error: No content in payload."), 400
    try:
        new_task = Task(content=content, owner=current_user.id)
        db.session.add(new_task)
        db.session.commit()
        return jsonify(message="Created new task!"), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error when creating new task: {e}")
        return jsonify(error=f"Error when creating new task: {e}"), 500
    

@bp.route("/send_task_to_user", methods=["POST"])
@login_required
def send_task_to_user():
    data = request.get_json()
    if not data:
        print("Error: no payload in request")
        return jsonify(error="Error when sending task: No data in payload"), 400
    content = data.get("content")
    reciever_id = int(data.get("reciever_id"))
    reciever = User.query.get(reciever_id)
    if not reciever:
        print("Error when sending task: User id not valid")
        return jsonify("User id not valid")
    try:
        sent_task = Task(content=content, sent_by=current_user.id, owner=reciever.id)
        db.session.add(sent_task)
        db.session.commit()
        return jsonify(message=f"Task sent to {reciever.full_name}"), 200
    except Exception as e:
        print(f"Error when sending task: {e}")
        db.session.rollback()
        return jsonify(f"Error when sending task: {e}"), 500