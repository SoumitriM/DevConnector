import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfiles } from '../slices/profileReducer';

export const Profiles = () => {

  const dispatch = useDispatch();
  const { profiles } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(getProfiles());
    console.log('ddd');
  }, []);

  return (
    <div className="container">
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with developers
      </p>
      <div className="profiles">
        {profiles && profiles.map((profile) => (
        <div className="profile bg-light" key={profile._id}>
          <img
            className="round-img"
            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
            alt=""
          />
          <div>
            <h2>{profile.user !== null ? profile.user.name : 'dd'}</h2>
            <p>{profile.bio}</p>
            <p>{profile.location}</p>
            <Link to={`profile/${profile.user._id}`}className="btn btn-primary">View Profile</Link>
          </div>

          <ul>
            {profile.skills && profile.skills.slice(0,4).map(skill => (
              <li className="text-primary" key={skill}>
              <i className="fas fa-check"></i>{skill}
            </li>
            ))}
          </ul>
        </div>))}
      </div>
    </div>
  )
}
