import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const RefereeProfile = () => {
  const { name } = useParams();
  const [referee, setReferee] = useState(null);

  useEffect(() => {
    const fetchReferee = async () => {
      const docRef = doc(db, 'referees', decodeURIComponent(name));
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setReferee(snapshot.data());
      } else {
        setReferee(null);
      }
    };
    fetchReferee();
  }, [name]);

  if (!referee) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading referee profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{referee.name}</h1>
          <Link to="/" className="text-blue-600 text-sm underline hover:text-blue-800">
            ← Back to Search
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
          <div>
            <h2 className="font-semibold text-gray-700 mb-2">General Info</h2>
            <div className="space-y-1">
              <p><span className="font-medium">City:</span> {referee.city || '—'}</p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-gray-700 mb-2">Ratings</h2>
            <div className="space-y-1">
              <p><span className="font-medium">Foil:</span> {referee.foil || '—'}</p>
              <p><span className="font-medium">Epee:</span> {referee.epee || '—'}</p>
              <p><span className="font-medium">Sabre:</span> {referee.sabre || '—'}</p>
              <p><span className="font-medium">Secretariat:</span> {referee.secretariat || '—'}</p>
              <p><span className="font-medium">Armoury:</span> {referee.armoury || '—'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefereeProfile;
