import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../slices/authReducer";

const Login = () => {

  const [details, setDetails] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const {error, isAuthenticated} = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('in login');
      navigate('/dashboard');
    }

  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    const updatedDetails = {};
    updatedDetails[e.target.name] = e.target.value;
    setDetails({ ...details, ...updatedDetails });
  }

  const handleLoginUser = async () => {
    dispatch(login(details));
  }

  return <div className="container">
    {error && <div className="alert alert-danger">
      {error}
    </div>}
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
    <form className="form" action="dashboard.html">
      <div className="form-group">
        <input
          type="email"
          value={details.email}
          placeholder="Email Address"
          name="email"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          value={details.password}
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div className="btn btn-primary" onClick={handleLoginUser}>Login</div>
    </form>
    <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </div>
};

export default Login;