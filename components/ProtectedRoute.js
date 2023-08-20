// components/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { checkAuthentication } from '../utils/auth';

const LoadingComponent = () => {
  return <p>Loading...</p>;
};

const RedirectComponent = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace('/login');
  }, []);

  return null;
};

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const isAuthenticated = checkAuthentication();

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return isAuthenticated ? children : <RedirectComponent />;
};

export default ProtectedRoute;
