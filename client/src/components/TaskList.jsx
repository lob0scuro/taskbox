import styles from "../styles/TaskList.module.css";
import { useAuth } from "../context/AuthContext";
import { trimDate, completeTask, redoTask } from "../Utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSound from "use-sound";
import Ding from "../assets/audio/ding.mp3";
import Undo from "../assets/audio/undo.mp3";

// add functionality to send tasks to other users.
// add sound to toast notifications

const TaskList = ({ is_active }) => {
  const { user, refreshUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [play] = useSound(Ding);
  const [undo] = useSound(Undo);

  useEffect(() => {
    if (user?.tasks) {
      setTasks(
        is_active
          ? user.tasks.filter((task) => !task.is_complete)
          : user.tasks.filter((task) => task.is_complete)
      );
    }
  }, [user, is_active]);

  const complete = async (id) => {
    const sendOff = await completeTask(id);
    if (!sendOff.success) {
      toast.error(sendOff.error);
      return;
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    refreshUser(user.id);
    toast.success(sendOff.message);
    play();
  };

  const redo = async (id) => {
    const sendOff = await redoTask(id);
    if (!sendOff.success) {
      toast.error(sendOff.error);
      return;
    }
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    refreshUser(user.id);
    toast.success(sendOff.message);
    undo();
  };

  return (
    <div className={styles.taskList}>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={task.is_complete}
                onChange={(e) => {
                  if (e.target.checked) {
                    complete(task.id);
                  } else {
                    redo(task.id);
                  }
                }}
              />
              <div>
                <p
                  style={{
                    textDecoration: task.is_complete ? "line-through" : "",
                  }}
                >
                  {task.content}
                </p>
                <p
                  style={{
                    textDecoration: task.is_complete ? "line-through" : "",
                  }}
                >
                  {trimDate(task.created_on)}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p style={{ color: "#f9f9f9" }}>
            {is_active ? "-- Add More Tasks --" : "-- No tasks completed --"}
          </p>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
