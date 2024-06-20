// components/ProtectedRoute.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { checkAuth } from './auth';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const token = Cookies.get('username');

  useEffect(() => {
    if (!token) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
