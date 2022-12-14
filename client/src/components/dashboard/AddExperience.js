import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addUserExperience } from '../../slices/profileReducer';

const AddExperience = () => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    title: "",
    company: "",
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
   dispatch(addUserExperience(details, navigate));
  }
  return (
    <div className="container">
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form">
        <div className="form-group">
          <input type="text" placeholder="* Job Title" value={details.title} name="title" onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" value={details.company} name="company" onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" value={details.location} name="location" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" value={details.from} name="from" onChange={handleInputChange}/>
        </div>
         <div className="form-group">
          <p><input type="checkbox" name="current" onChange={handleInputChange}/> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" value={details.to} name="to" onChange={handleInputChange}/>
        </div>
        <div className="form-group">
          <textarea
            value={details.description} name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="btn btn-primary my-1" onClick={handleSubmit}>Submit</div>
        <Link to="/dashboard">Go Back</Link>
      </form>
    </div>
  )
}

export default AddExperience;