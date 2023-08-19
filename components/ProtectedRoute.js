// components/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
    
const checkAuthenticationLogic = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem('jwtToken');
      setIsAuthenticated(token !== null);
    }, []);
  
    return isAuthenticated;
};

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  // Replace with your actual authentication check
  const isAuthenticated = checkAuthenticationLogic();
//   const isAuthenticated = false

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
