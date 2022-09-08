import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './layout/Landing';
import './App.css';
import Navbar from './layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './layout/Profile';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './slices/authReducer';
import setAuthToken from './utils/setAuthToken';
import CreateProfile from './layout/CreateProfile';
import Dashboard from './layout/Dashboard';
import PrivateRoute from './components/auth/routing/PrivateRoute';
import AddExperience from './components/dashboard/AddExperience';

const App = () => {

  const dispatch = useDispatch();

  if (localStorage.token) {
    setAuthToken(localStorage.token)
  };

  useEffect(() => {
    if (localStorage.token) {
      console.log('app js token present or not', localStorage.token);
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route exact path="/create-profile" element={<PrivateRoute><CreateProfile /></PrivateRoute>} />
        <Route exact path="/add-experience" element={<PrivateRoute><AddExperience /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
