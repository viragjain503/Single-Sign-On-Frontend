// utils/auth.js
import { useEffect, useState } from 'react';

export const checkAuthentication = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsAuthenticated(token !== null);
  }, []);

  return isAuthenticated;
};
