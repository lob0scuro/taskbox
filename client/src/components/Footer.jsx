import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Footer = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success(response.message);
    navigate("/login");
  };
  return (
    <footer>
      <p>Task Box</p>
      {user ? (
        <Link onClick={handleLogout}>Logout</Link>
      ) : (
        <Link to="/register">Register</Link>
      )}
    </footer>
  );
};

export default Footer;
