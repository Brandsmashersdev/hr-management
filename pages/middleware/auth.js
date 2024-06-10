// middleware/auth.js
import { serialize, parse } from 'cookie';

export const authenticate = (handler) => async (req, res) => {
  const cookies = parse(req.headers.cookie || '');

  if (!cookies.user || !validateUser(cookies.user)) {
    res.setHeader('Set-Cookie', serialize('user', '', { maxAge: -1, path: '/' }));
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Unauthorized' }));
    return;
  }

  return handler(req, res);
};

const validateUser = (userData) => {
  // Validate user data here
  // For simplicity, just check username and password
  return userData.username === 'mann mittal' && userData.password === 'mann';
};
