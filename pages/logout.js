// pages/logout.js
import { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    // Logout logic
    fetch('/api/logout', {
      method: 'POST',
    })
      .then(() => {
        // Redirect to login page after logout
        window.location.href = '/login';
      })
      .catch((error) => console.error('Logout failed:', error));
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
