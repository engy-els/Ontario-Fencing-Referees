import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const RefereeSearch = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (search.length === 0) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      const q = query(
        collection(db, 'referees'),
        orderBy('name'),
        startAt(search),
        endAt(search + '\uf8ff')
      );

      const querySnapshot = await getDocs(q);
      const matches = querySnapshot.docs.map(doc => doc.data());
      setResults(matches);
    };

    fetchResults();
  }, [search]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Search Referees</h1>
      <input
        type="text"
        placeholder="Start typing a name..."
        className="w-full p-2 border rounded mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="space-y-4">
        {results.map((ref) => (
          <Link to={`/referee/${encodeURIComponent(ref.name)}`} key={ref.name}>
            <div className="border p-4 rounded hover:bg-gray-100">
              <h2 className="text-lg font-semibold">{ref.name}</h2>
              <p className="text-sm text-gray-600">{ref.city}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RefereeSearch;