import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const Profile = () => {
  const [referee, setReferee] = useState(null);

  useEffect(() => {
    const loadReferee = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, 'referees'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setReferee(snapshot.docs[0].data());
      }
    };

    loadReferee();
  }, []);

  if (!referee) {
    return <p className="text-center mt-10">No referee profile found.</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{referee.name}</h2>
      <p><strong>City:</strong> {referee.city}</p>
      <p><strong>Foil:</strong> {referee.foil || '—'}</p>
      <p><strong>Epee:</strong> {referee.epee || '—'}</p>
      <p><strong>Sabre:</strong> {referee.sabre || '—'}</p>
      <p><strong>Secretariat:</strong> {referee.secretariat || '—'}</p>
      <p><strong>Armoury:</strong> {referee.armoury || '—'}</p>
    </div>
  );
};

export default Profile;
