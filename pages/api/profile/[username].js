// pages/api/profile/[username].js

import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  const {
    query: { username },
  } = req;

  try {
    const q = query(collection(db, 'Employee_data'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    let profileData = {};
    querySnapshot.forEach((doc) => {
      profileData = doc.data();
    });

    res.status(200).json(profileData);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
