import styles from "../styles/Home.module.css";
import buttonStyles from "../styles/Button.module.css";
import { fetchOneUser, currentDay } from "../Utils";
import { useAuth } from "../context/AuthContext.jsx";
import TaskList from "../components/TaskList.jsx";
import Button from "../components/Button.jsx";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddTaskModal from "../components/AddTaskModal.jsx";

const Home = () => {
  const { user, refreshUser } = useAuth();
  const [isActive, setIsActive] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    refreshUser(user.id);
  }, []);

  return (
    <>
      {modalOpen && <AddTaskModal setModalOpen={setModalOpen} />}
      <div className={modalOpen ? styles.modalHomeScreen : styles.homeScreen}>
        <div className={styles.homeScreenHeader}>
          <span>{user.first_name}'s</span>
          <h1>Task Box</h1>
          <p>{currentDay()}</p>
        </div>
        <div className={styles.currentTasksBlock}>
          <div className={styles.taskStateButtonBlock}>
            <Button
              onClick={() => setIsActive(true)}
              className={!isActive ? buttonStyles.activeButton : ""}
              title="Active"
            />
            <Button
              onClick={() => setIsActive(false)}
              className={isActive ? buttonStyles.activeButton : ""}
              title="Done"
            />
            <Button
              title={<FontAwesomeIcon icon={faPlus} />}
              className={buttonStyles.addTaskButton}
              onClick={() => setModalOpen(true)}
            />
          </div>
          <TaskList is_active={isActive} />
        </div>
      </div>
    </>
  );
};

export default Home;
