import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addUserEducation, addUserExperience } from '../../slices/profileReducer';

const AddEducation = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    description: "",
    location: ""
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const updatedDetails = {};
    if (e.target.type === 'checkbox') {
      updatedDetails[e.target.name] = e.target.checked;
    } else updatedDetails[e.target.name] = e.target.value;
    setDetails({...details, ...updatedDetails});
  };

  const handleSubmit = () => {
    console.log(details)
;   dispatch(addUserEducation(details, navigate));
  }
  return (
    <div className="container">
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            value={details.school}
            name="school"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            value={details.degree}
            name="degree"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" value={details.fieldofstudy} name="fieldofstudy" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" value={details.from} name="from" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" onChange={handleInputChange}/> Current School or Bootcamp
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" value={details.to} name="to" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <textarea
            value={details.description} name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="btn btn-primary my-1" onClick={handleSubmit}>Submit</div>
        <Link to="/dashboard" className="btn btn-light my-1" href="dashboard.html">Go Back</Link>
      </form>
    </div>
  )
}

export default AddEducation;