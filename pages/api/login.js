// pages/api/login.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (username === 'mann mittal' && password === 'mann') {
      const userData = { username: username, password: password };
      res.setHeader('Set-Cookie', serialize('user', JSON.stringify(userData), { maxAge: 1000, path: '/' }));
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
      
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
