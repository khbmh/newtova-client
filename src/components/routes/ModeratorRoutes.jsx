import { useContext } from 'react';
import { Navigate } from 'react-router';
import { DataContext } from '../context/DataProvider';
import { AuthContext } from '../context/AuthProvider';

function ModeratorRoutes({ children }) {
  const { role } = useContext(DataContext);
  const { loading } = useContext(AuthContext);

  // Show loading state while checking user role
  if (loading) {
    return <div>Loading...</div>;
  }

  // Allow access if the user is a moderator or an admin
  if (role === 'admin' || role === 'moderator') {
    return children;
  }

  // Redirect unauthorized users
  return <Navigate to="/my" />;
}

export default ModeratorRoutes;
