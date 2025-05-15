import styles from "../styles/AddTaskModal.module.css";
import buttonStyles from "../styles/Button.module.css";
import Button from "./Button";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";
import useSound from "use-sound";
import Added from "../assets/audio/added.mp3";

const AddTaskModal = ({ setModalOpen }) => {
  const { user, refreshUser } = useAuth();
  const [added] = useSound(Added);
  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const input = Object.fromEntries(formData);
    try {
      const response = await fetch("/create/add_task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
        return { success: false, error: data.error };
      }
      added();
      toast.success(data.message);
      refreshUser(user.id);
      setModalOpen(false);
      return { success: true, message: data.message };
    } catch (error) {
      toast.error(error.message);
      return { success: false, error: error.message };
    }
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <h1>Add Task</h1>
        <Button
          title="close"
          onClick={() => setModalOpen(false)}
          className={buttonStyles.closeModalButton}
        />
      </div>
      <form className={styles.modalForm} onSubmit={submitForm}>
        <textarea name="content" id="content"></textarea>
        <Button
          title="Submit"
          type="submit"
          className={buttonStyles.submitFromModalButton}
        />
      </form>
    </div>
  );
};

export default AddTaskModal;
