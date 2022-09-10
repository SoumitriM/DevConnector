import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { register } from "../../slices/authReducer";
import ErrorSnackbar from "../common/ErrorSnackbar";
import { resetError } from "../../slices/authReducer";

const Register = () => {
  const [details, setDetails] = useState({ name: "", email: "", password: "", password2: "" });
  const [isMatch, setIsMatch] = useState(true);
  const { loading, error, errorMessage, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetError());
  },[]);

  useEffect(() => {
    if (isAuthenticated) navigate('/create-profile');
  }, [navigate, loading, isAuthenticated]);

  const handleInputChange = (e) => {
    const updatedDetails = {};
    updatedDetails[e.target.name] = e.target.value;
    setDetails({ ...details, ...updatedDetails });
    const { password, password2 } = details;
    if (e.target.name === 'password2') {
      const isPasswordMatch = password === e.target.value;
      setIsMatch(isPasswordMatch);
    }
    if (e.target.name === 'password' && password2) {
      const isPasswordMatch = password2 === e.target.value;
      setIsMatch(isPasswordMatch);
    }
  }

  const handleSave = async () => {
  
    dispatch(register(details));
  }
  return <div className="container">
    {error && <ErrorSnackbar message={errorMessage} />}
    <h1 className="large text-primary">Sign Up</h1>
    <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
    <div className="form">
      <div className="form-group">
        <input type="text" value={details.name} placeholder="Name" name="name" onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <input type="email" placeholder="Email Address" value={details.email} name="email" onChange={handleInputChange} />
        <small className="form-text"
        >This site uses Gravatar so if you want a profile image, use a
          Gravatar email</small
        >
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={details.password}
          name="password"
          minLength="6"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          value={details.password2}
          name="password2"
          minLength="6"
          onChange={handleInputChange}
        />
        {!isMatch && <small className="form-alert-red">Passwords don't match</small>}
      </div>
      <div className="btn btn-primary" onClick={handleSave}>Register</div>
    </div>
    <p className="my-1">
      Already have an account? <a href="login.html">Sign In</a>
    </p>
  </div>

}

export default Register;