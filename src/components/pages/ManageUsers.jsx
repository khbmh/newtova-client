import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// import { AuthContext } from '../context/AuthProvider';

function ManageUsers() {
  const [users, setUsers] = useState([]);
  // const { user } = useContext(AuthContext);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://newtova-server.vercel.app/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users. Please try again.');
      }
    };

    fetchUsers();
  }, []);

  // Update user role
  const updateUserRole = async (email, role) => {
    try {
      const response = await fetch(`https://newtova-server.vercel.app/users/${email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        toast.success(`User role updated to ${role}`);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, role } : user,
          ),
        );
      } else {
        toast.error('Failed to update user role. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
      <table className="w-screen mx-auto max-w-[900px] bg-[#1f1f20] rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-2 lg:px-6 py-3 text-center text-md font-medium text-white">
              User Name
            </th>
            <th className="px-2 lg:px-6 py-3 text-center text-md font-medium text-white">
              User Email
            </th>
            <th className="px-2 lg:px-6 py-3 text-center text-md font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-white/10">
              <td className="px-2 lg:px-6 py-4 text-xs text-white">{user.name}</td>
              <td className="px-2 lg:px-6 py-4 text-xs text-white">{user.email}</td>
              <td className="px-2 lg:px-6 py-4 space-y-3 text-xs text-white space-x-2">
                {user.role === 'moderator' ? (
                  <button
                    onClick={() => updateUserRole(user.email, 'user')}
                    className="px-4 py-2 bg-red-800 text-white font-bold rounded-md hover:bg-gray-600 disabled:opacity-50"
                  >
                    Remove Moderator
                  </button>
                ) : (
                  <button
                    onClick={() => updateUserRole(user.email, 'moderator')}
                    className="px-4 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-600 disabled:opacity-50"
                  >
                    Make Moderator
                  </button>
                )}
                {user.role === 'admin' ? (
                  <button
                    onClick={() => updateUserRole(user.email, 'user')}
                    className="px-4 py-2 bg-red-800 text-white font-bold rounded-md hover:bg-gray-600 disabled:opacity-50"
                  >
                    Remove Admin
                  </button>
                ) : (
                  <button
                    onClick={() => updateUserRole(user.email, 'admin')}
                    className="px-4 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-600 disabled:opacity-50"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
}

export default ManageUsers;
