import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const Availability = () => {
  const [formData, setFormData] = useState({
    tournamentName: '',
    travelCity: '',
    availability: {
      day1Morning: false,
      day1Afternoon: false,
      day2Morning: false,
      day2Afternoon: false
    }
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name in formData.availability) {
      setFormData({
        ...formData,
        availability: { ...formData.availability, [name]: checked }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) return;
      await addDoc(collection(db, 'availability'), {
        userId: user.uid,
        ...formData
      });
      alert('Availability submitted successfully!');
    } catch (error) {
      console.error('Error saving availability:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Tournament Availability</h2>
      <input
        name="tournamentName"
        value={formData.tournamentName}
        onChange={handleChange}
        placeholder="Tournament Name"
        className="w-full p-2 mb-2 border"
        required
      />
      <input
        name="travelCity"
        value={formData.travelCity}
        onChange={handleChange}
        placeholder="Traveling From (City)"
        className="w-full p-2 mb-4 border"
        required
      />
      <fieldset className="mb-4">
        <legend className="mb-2 font-medium">Select Availability</legend>
        {['day1Morning', 'day1Afternoon', 'day2Morning', 'day2Afternoon'].map(slot => (
          <label key={slot} className="block">
            <input
              type="checkbox"
              name={slot}
              checked={formData.availability[slot]}
              onChange={handleChange}
              className="mr-2"
            />
            {slot.replace(/([a-z])([A-Z])/g, '$1 $2')}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="bg-green-600 text-white px-4 py-2">Submit</button>
    </form>
  );
};

export default Availability;