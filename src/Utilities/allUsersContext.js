import { createContext, useEffect, useState } from 'react';
import { apiFetch } from './apiClient';

export const AllUsersContext = createContext();

export const AllUserProvider = ({ children }) => {
  const [ALL_USERNAMES, setAllUsernames] = useState([]);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const res = await apiFetch('/api/auth-protected/allUsers');
        setAllUsernames(res);
      } catch (err) {
        console.error('Failed to load usernames:', err);
      }
    };

    fetchUsernames();
  }, []);

  return (
    <AllUsersContext.Provider value={{ ALL_USERNAMES }}>
      {children}
    </AllUsersContext.Provider>
  );
};