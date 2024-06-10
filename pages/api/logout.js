// pages/api/logout.js
import { serialize } from 'cookie';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', serialize('user', '', { maxAge: -1, path: '/' }));
  res.status(200).json({ message: 'Logout successful' });
}
