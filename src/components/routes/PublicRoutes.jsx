import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

function PublicRoutes({ children }) {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>loading...</div>;
  if (!user) {
    return children;
  }
  return (
    <Navigate to={location.state ? `${location.state.from}` : '/my'}></Navigate>
  );
}

export default PublicRoutes;
