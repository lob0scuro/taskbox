import Button from "../components/Button";
import styles from "../styles/Register.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const inputs = Object.fromEntries(formData);
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error);
        throw new Error(data.error);
      }
      toast.success(data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "There was an error");
      return { success: false, error: error.message || "There was an error" };
    }
  };

  return (
    <>
      <h1 className={styles.registerHeader}>Add User to TaskBox</h1>
      <form onSubmit={submitForm} className={styles.registerForm}>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div>
          <label htmlFor="password1">Password:</label>
          <input type="password" name="password1" id="password1" />
        </div>
        <div>
          <label htmlFor="password2">Enter password again</label>
          <input type="password" name="password2" id="password2" />
        </div>
        <br />
        <Button title="Submit" type="submit" />
      </form>
    </>
  );
};

export default Register;
