import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userInfo = req.body;
    if (!userInfo.username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const q = query(collection(db, 'Employee_data'), where('username', '==', userInfo.username));
        const querySnapshot = await getDocs(q);
  
        let userRef;
        if (querySnapshot.empty) {
          userRef = doc(collection(db, 'Employee_data'));
        } else {
          querySnapshot.forEach((doc) => {
            userRef = doc.ref;
          });
        }
      await updateDoc(userRef, userInfo);
      res.status(200).json({ message: 'User info updated successfully' });
    } catch (error) {
      console.error('Error updating user info:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
