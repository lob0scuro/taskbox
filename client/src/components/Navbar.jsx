import styles from "../styles/Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Task Box</h1>
      {/* <div>
        <NavLink to="/">Home</NavLink>
        <NavLink>Create Task</NavLink>
        <NavLink>Send Tasks</NavLink>
      </div> */}
    </nav>
  );
};

export default Navbar;
