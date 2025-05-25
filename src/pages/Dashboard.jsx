import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const docRef = doc(db, 'referees', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRatings(docSnap.data());
      } else {
        setRatings({ foil: 'N/A', epee: 'N/A', sabre: 'N/A' });
      }
    };
    fetchRatings();
  }, []);

  if (!ratings) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Ratings</h2>
      <ul className="space-y-2">
        <li>Foil: <strong>{ratings.foil}</strong></li>
        <li>Epee: <strong>{ratings.epee}</strong></li>
        <li>Sabre: <strong>{ratings.sabre}</strong></li>
      </ul>
    </div>
  );
};

export default Dashboard;
