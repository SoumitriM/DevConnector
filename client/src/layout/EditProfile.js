import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUserProfile } from "../slices/profileReducer";
import { Link } from "react-router-dom";
import { getUserProfile } from "../slices/profileReducer";
const EditProfile = () => {

  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    name: "",
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    bio: "",
    githubusername: "",
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: ""
  });
  const { profile } = useSelector(state => state.profile);

  useEffect(() => {
    if (profile) {
      const skills = profile.skills.join(',');
      console.log(typeof skills);
      setUserDetails({ ...profile, skills: skills });
    }
  }, [profile]);



  const handleInputChange = (e) => {
    const updatedDetails = {};
    updatedDetails[e.target.name] = e.target.value;
    setUserDetails({ ...userDetails, ...updatedDetails });
  }

  const handleProfileSubmit = () => {
    console.log('profile dispatched', userDetails);
    dispatch(createUserProfile(userDetails));
  }

  return <div className="container">
    <h1 className="large text-primary">
      Edit Your Profile
    </h1>
    <p className="lead">
      <i className="fas fa-user"></i> Let's get some information to make your
      profile stand out
    </p>
    <small>* = required field</small>
    <div className="form">
      <div className="form-group">
        <select value={userDetails.status} onChange={handleInputChange} name="status">
          <option value="0">* Select Professional Status</option>
          <option value="Developer">Developer</option>
          <option value="Junior Developer">Junior Developer</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="Manager">Manager</option>
          <option value="Student or Learning">Student or Learning</option>
          <option value="Instructor">Instructor or Teacher</option>
          <option value="Intern">Intern</option>
          <option value="Other">Other</option>
        </select>
        <small className="form-text"
        >Give us an idea of where you are at in your career</small
        >
      </div>
      <div className="form-group">
        <input type="text" placeholder="Company" value={userDetails.company} onChange={handleInputChange} name="company" />
        <small className="form-text"
        >Could be your own company or one you work for</small
        >
      </div>
      <div className="form-group">
        <input type="text" placeholder="Website" value={userDetails.website} onChange={handleInputChange} name="website" />
        <small className="form-text"
        >Could be your own or a company website</small
        >
      </div>
      <div className="form-group">
        <input type="text" placeholder="Location" value={userDetails.location} onChange={handleInputChange} name="location" />
        <small className="form-text"
        >City & state suggested (eg. Boston, MA)</small
        >
      </div>
      <div className="form-group">
        <input type="text" placeholder="* Skills" value={userDetails.skills} onChange={handleInputChange} name="skills" />
        <small className="form-text"
        >Please use comma separated values (eg.
          HTML,CSS,JavaScript,PHP)</small
        >
      </div>
      <div className="form-group">
        <input
          type="text"
          placeholder="Github Username"
          value={userDetails.githubusername} onChange={handleInputChange} name="githubusername"
        />
        <small className="form-text"
        >If you want your latest repos and a Github link, include your
          username</small
        >
      </div>
      <div className="form-group">
        <textarea placeholder="A short bio of yourself" value={userDetails.bio} onChange={handleInputChange} name="bio"></textarea>
        <small className="form-text">Tell us a little about yourself</small>
      </div>

      <div className="my-2">
        <button type="button" className="btn btn-light">
          Add Social Network Links
        </button>
        <span>Optional</span>
      </div>

      <div className="form-group social-input">
        <i className="fab fa-twitter fa-2x"></i>
        <input type="text" placeholder="Twitter URL" value={userDetails.twitter} onChange={handleInputChange} name="twitter" />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-facebook fa-2x"></i>
        <input type="text" placeholder="Facebook URL" value={userDetails.facebook} onChange={handleInputChange} name="facebook" />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-youtube fa-2x"></i>
        <input type="text" placeholder="YouTube URL" value={userDetails.youtube} onChange={handleInputChange} name="youtube" />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-linkedin fa-2x"></i>
        <input type="text" placeholder="Linkedin URL" value={userDetails.linkedin} onChange={handleInputChange} name="linkedin" />
      </div>

      <div className="form-group social-input">
        <i className="fab fa-instagram fa-2x"></i>
        <input type="text" placeholder="Instagram URL" value={userDetails.instagram} onChange={handleInputChange} name="instagram" />
      </div>
      <div className="btn btn-primary my-1" onClick={handleProfileSubmit}>Submit</div>
      <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
    </div>
  </div>
};

export default EditProfile;