import styles from "../styles/Login.module.css";
import { useAuth } from "../context/AuthContext";
import { fetchAllUsers, renderUserOptions } from "../Utils";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser, setUser, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [password, setPasword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const gitem = async () => {
      const gotem = await fetchAllUsers();
      if (!gotem.success) {
        toast.error(gotem.message);
        return;
      }
      setUsers(gotem.users);
    };

    gitem();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        id: selectedUser,
        password: password,
      });
      if (!response.success) {
        return toast.error(response.message);
      }
      setUser(response.user);
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      return toast.error(error.message);
    }
  };

  return (
    <div className={styles.loginScreen}>
      <form
        className={styles.loginForm}
        // onSubmit={() => loginUser(selectedUser)}
        onSubmit={handleSubmit}
      >
        <h1>Login</h1>
        <div>
          <select
            name="user"
            id="user"
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">--Select User--</option>
            {renderUserOptions(users)}
          </select>
        </div>
        <div>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password..."
            onChange={(e) => setPasword(e.target.value)}
          />
        </div>
        <Button
          title="Login"
          type="submit"
          className={styles.buttonComponent}
        />
      </form>
    </div>
  );
};

export default Login;
