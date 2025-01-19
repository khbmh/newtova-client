import { useContext } from 'react';
import { Navigate } from 'react-router';
import { DataContext } from '../context/DataProvider';
import { AuthContext } from '../context/AuthProvider';

function AdminRoutes({ children }) {
  const { loading } = useContext(AuthContext);
  const { role } = useContext(DataContext);

  if (loading || !role) {
    return <div>Loading...</div>;
  }

  if (role !== 'admin') {
    return <Navigate to="/my" />;
  }

  return children;
}

export default AdminRoutes;
