import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthProvider';

export const DataContext = createContext(null);

function DataProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isModerator, setIsModerator] = useState(false);
  const [role, setRole] = useState('user');

  useEffect(() => {
    if (user?.email) {
      fetch(`https://newtova-server.vercel.app/users/${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log('Fetched data:', data.role); // Log the fetched data
          setUserData(data);
          setRole(data.role);
        })
        .catch((error) => {
          console.error('Error fetching user role:', error);
        });
    }
  });

  const data = {
    isAdmin,
    role,
    setRole,
    isModerator,
    isLoading,
    userData,
  };

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export default DataProvider;
