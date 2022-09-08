import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../slices/authReducer";
const Navbar = () => {

  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  }
  return <div>
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      {!isAuthenticated ? (
        <ul>
          <li><Link to="/profiles">Developers</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      ) :
        <ul><li onClick={handleLogOut}><a href="#">Logout</a></li></ul>}
    </nav>
  </div>
};

export default Navbar;
