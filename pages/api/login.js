// pages/api/login.js
import { serialize } from 'cookie';
import { db } from '../firebaseConfig'; // Adjust the path as needed
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const q = query(collection(db, 'Employee_login'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        // console.log('User data from Firestore:', userData);

        if (userData.password === password && userData.username === username) {
          const cookieData = { username: userData.username };
          res.setHeader('Set-Cookie', serialize('user', JSON.stringify(cookieData), {
            maxAge: 60 * 60 * 24, // 1 day in seconds
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Helps prevent CSRF attacks
          }));
          res.status(200).json({ message: 'ok' });
        } else {
          // console.log('Invalid credentials');
          res.status(401).json({ message: 'Invalid username or password' });
        }
      } else {
        // console.log('User not found:', username);
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error querying Firestore:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
