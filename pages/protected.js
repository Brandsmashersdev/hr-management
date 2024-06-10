// pages/protected.js
import { useEffect, useState } from 'react';

const Protected = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the protected route
    fetch('/api/protected')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{message}</p>
      {/* <button onClick={handlelogout}>
        Logout
      </button> */}
    </div>
  );
};

export default Protected;
