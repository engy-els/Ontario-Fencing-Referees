import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const RefereeProfile = () => {
  const { name } = useParams();
  const [ref, setRef] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'referees', name);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRef(docSnap.data());
      } else {
        setRef(null);
      }
    };
    fetchProfile();
  }, [name]);

  if (!ref) {
    return <p className="p-6">Referee not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{ref.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>City:</strong> {ref.city}</p>
          <p><strong>Secretariat:</strong> {ref.secretariat}</p>
          <p><strong>Armoury:</strong> {ref.armoury}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Ratings</h2>
          <p><strong>Foil:</strong> {ref.foil}</p>
          <p><strong>Epee:</strong> {ref.epee}</p>
          <p><strong>Sabre:</strong> {ref.sabre}</p>
        </div>
      </div>
    </div>
  );
};

export default RefereeProfile;