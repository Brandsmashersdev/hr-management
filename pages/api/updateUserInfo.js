import { db } from '../firebaseConfig';
// import { updateDoc, doc, collection } from 'firebase/firestore';
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userInfo = req.body;

    // Validate userInfo to ensure all required fields are present
    if (!userInfo.username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const q = query(collection(db, 'Employee_data'), where('username', '==', userInfo.username));
        const querySnapshot = await getDocs(q);
  
        let userRef;
        if (querySnapshot.empty) {
          // If no document exists with the provided username, create a new document
          userRef = doc(collection(db, 'Employee_data'));
        } else {
          // If document exists, update the first document found (assuming username is unique)
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
