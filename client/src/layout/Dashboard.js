import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, removeEducation, removeExperience } from "../slices/profileReducer";
import formatDate from "../utils/commonFunctions";

const Dashboard = () => {

  const { profile } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('dashboard profile', profile);
    dispatch(getUserProfile());
  }, []);

  const handleEducationDelete = (id) => {
    dispatch(removeEducation(id));
  }

  const handleExperienceDelete = (id) => {
    dispatch(removeExperience(id));
  }

  if (!profile) return <div className="container">Create Profile
    <Link to="/edit-profile" href="edit-profile.html" className="btn btn-light"
    ><i className="fas fa-user-circle text-primary"></i> Create Profile</Link>
  </div>;
  else return <div className="container">
    <h1 className="large text-primary">
      Dashboard
    </h1>
    <p className="lead"><i className="fas fa-user"></i> Welcome {profile.user.name}</p>
    <div className="dash-buttons">
      <Link to="/edit-profile" href="edit-profile.html" className="btn btn-light"
      ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>
      <Link to="/add-experience" className="btn btn-light"
      ><i className="fab fa-black-tie text-primary"></i> Add Experience</Link>
      <Link to="/add-education" className="btn btn-light"
      ><i className="fas fa-graduation-cap text-primary"></i> Add Education</Link>
    </div>

    <h2 className="my-2">Experience Credentials</h2>
    {/* <div>{profile.education[0].school}</div> */}
    <table className="table">
      <thead>
        <tr>
          <th>Company</th>
          <th className="hide-sm">Title</th>
          <th className="hide-sm">Years</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {profile.experience && profile.experience.map(item => (
          <tr key={item.company}>
            <td>{item.company}</td>
            <td className="hide-sm">{item.title}</td>
            <td className="hide-sm">
            {formatDate(item.from)} - {item.current ? <span>Now</span> : formatDate(item.to)}
            </td>
            <td>
              <button className="btn btn-danger" onClick={() => handleExperienceDelete(item._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2 className="my-2">Education Credentials</h2>
    <table className="table">
      <thead>
        <tr>
          <th>School</th>
          <th className="hide-sm">Degree</th>
          <th className="hide-sm">Years</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {profile.education && profile.education.map(item => (
          <tr key={item.company}>
            <td>{item.school}</td>
            <td className="hide-sm">{item.degree}</td>
            <td className="hide-sm">{formatDate(item.from)} - {item.current ? <span>Now</span> : formatDate(item.to)}</td>
            <td />
            <td>
              <button className="btn btn-danger" onClick={() => handleEducationDelete(item._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="my-2">
      <button className="btn btn-danger">
        <i className="fas fa-user-minus"></i>

        Delete My Account
      </button>
    </div>
  </div>
};

export default Dashboard;