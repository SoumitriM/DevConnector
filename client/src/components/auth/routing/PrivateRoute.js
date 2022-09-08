import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  console.log('auth->>>>', isAuthenticated);
  return (
    isAuthenticated ? children : navigate("/login")
  )
}

export default PrivateRoute;