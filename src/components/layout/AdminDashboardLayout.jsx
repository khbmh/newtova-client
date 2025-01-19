import { useContext } from 'react';
import { Link, Outlet } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

function AdminDashboardLayout() {
  const { loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex justify-between min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-[#1f1f20] p-4">
        <h2 className="text-xl font-bold text-white mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/statistics"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Statistics
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Manage Users
              </Link>
            </li>
            <li>
              <Link
                to="/admin/coupons"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Manage Coupons
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-900">
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
