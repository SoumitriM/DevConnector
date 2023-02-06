import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../slices/profileReducer";
import React from 'react'
import formatDate from "../utils/commonFunctions";

export const Profile = () => {

  const { devProfile } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    console.log('ussss')
    dispatch(getProfile(id));
  }, []);

  return  (devProfile.user !== undefined && <div className="container">
    <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
    <div className="profile-grid my-1">
      <div className="profile-top bg-primary p-2">
        <img
          className="round-img my-1"
          src={''}
          alt=""
        />
        <h1 className="large">{devProfile.user.name}</h1>
        <p className="lead">{devProfile.status} {devProfile.company && <span> at {devProfile.company}</span>}</p>
        <p>{devProfile.location}</p>
        {devProfile.social &&
        (<div className="icons my-1">
          {devProfile.website && 
          <Link to="" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </Link>
          }
          {devProfile.social.twitter && <Link to="" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </Link>
        }
          {devProfile.social.facebook && <Link to="" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </Link>
          }
          {devProfile.social.linkedin && <Link to="" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </Link>
          }
          {devProfile.social.youtube && <Link to="" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </Link>
          }
          {devProfile.social.instagram && <Link to="" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </Link>
          }
        </div>)}
      </div>
      <div className="profile-about bg-light p-2">
        <h2 className="text-primary">{`${devProfile.user.name}\'s Bio`}</h2>
        <p>
          {devProfile.bio}
        </p>
        <div className="line"></div>
        <h2 className="text-primary">Skill Set</h2>
        <div className="skills">
          {devProfile.skills && devProfile.skills.map((item) => (
            <div className="p-1" key={item}><i className="fa fa-check"></i>{item}</div>
          ))}
        </div>
      </div>
      <div className="profile-exp bg-white p-2">
        <h2 className="text-primary">Experience</h2>
        {devProfile.experience.map((item) => (
          <div key={item._id}>
            <h3 className="text-dark">{item.company}</h3>
            <p>{formatDate(item.from)} - {item.current ? `Now` : formatDate(item.to)}</p>
            <p><strong>Position: </strong>{item.title}</p>
            <p><strong>Description: </strong>{item.description}</p>
          </div>
        ))}
      </div>
      <div className="profile-edu bg-white p-2">
        <h2 className="text-primary">Education</h2>
        {devProfile.education.map((item) => (
          <div key={item._id}>
            <h3 className="text-dark">{item.school}</h3>
            <p>{formatDate(item.from)} - {item.current ? `Now` : formatDate(item.to)}</p>
            <p><strong>Degree: </strong>{item.degree}</p>
            <p><strong>Field Of Study: </strong>{item.fieldofstudy}</p>
            <p><strong>Description: </strong>{item.description}</p>
          </div>
        ))}
      </div>

      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github"></i> Github Repos
        </h2>
        {devProfile.repose ? devProfile.repos.map((item) => (
          <div className="repo bg-white p-1 my-1">
          <div>
            <h4><Link to="" target="_blank"
              rel="noopener noreferrer">{item.name}</Link></h4>
            <p>
             {item.description}
            </p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: {item.stargazers_count}</li>
              <li className="badge badge-dark">Watchers: {item.watchers_count}</li>
              <li className="badge badge-light">Forks: {item.forks_count}</li>
            </ul>
          </div>
        </div>)) : <h3>No repo found</h3>}
      </div>
    </div>
  </div>
  )
};

export default Profile;