import { useContext } from 'react';
import { NavLink, Outlet } from 'react-router';
import { AuthContext } from '../context/AuthProvider';

function AdminDashboardLayout() {
  const { loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col justify-between min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <div className="mx-auto bg-[#1f1f20] p-4 w-screen">
        <h2 className="text-xl font-bold text-white mb-6">Admin Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin/statistics"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Statistics
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/coupons"
                className="block p-2 text-white hover:bg-gray-700 rounded-md"
              >
                Manage Coupons
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-4 lg:px-8 w-screen overflow-x-hidden">
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
}

export default AdminDashboardLayout;
