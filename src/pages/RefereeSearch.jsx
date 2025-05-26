import React, { useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const RefereeSearch = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setHasSearched(false);
    setLoading(true);

    try {
      const snapshot = await getDocs(collection(db, 'referees'));
      const allRefs = snapshot.docs.map(doc => doc.data());

      const filtered = allRefs.filter(ref =>
        ref.name?.toLowerCase().includes(search.toLowerCase())
      );

      setResults(filtered);
    } catch (err) {
      setResults([]);
    }

    setLoading(false);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Referee Database</h1>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
          <input
            type="text"
            name="search"
            placeholder="Enter referee name..."
            className="w-full sm:w-96 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {loading && (
          <p className="text-center text-gray-500">Loading...</p>
        )}

        {!loading && hasSearched && results.length === 0 && (
          <p className="text-center text-gray-500">No referees found.</p>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((ref) => (
              <Link to={`/referee/${encodeURIComponent(ref.name)}`} key={ref.name}>
                <div className="bg-white rounded-md shadow p-4 hover:bg-gray-50 transition">
                  <h2 className="text-lg font-semibold text-blue-700">{ref.name}</h2>
                  <p className="text-sm text-gray-600">City: {ref.city || '—'}</p>
                  <p className="text-sm text-gray-600">Foil: {ref.foil || '—'}, Epee: {ref.epee || '—'}, Sabre: {ref.sabre || '—'}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RefereeSearch;
