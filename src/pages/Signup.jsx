import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    city: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await createUserWithEmailAndPassword(auth, form.email, form.password);

      const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`;
      const q = query(
        collection(db, 'referees'),
        where('name', '==', fullName),
        where('city', '==', form.city.trim())
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const match = snapshot.docs[0];
        await updateDoc(doc(db, 'referees', match.id), { userId: user.uid });
        console.log('User linked to referee profile');
      } else {
        console.log('No match found in referee list.');
      }

      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input name="email" type="email" onChange={handleChange} placeholder="Email" className="mb-2 w-full p-2 border" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="mb-2 w-full p-2 border" required />
      <input name="firstName" onChange={handleChange} placeholder="First Name" className="mb-2 w-full p-2 border" required />
      <input name="lastName" onChange={handleChange} placeholder="Last Name" className="mb-2 w-full p-2 border" required />
      <input name="city" onChange={handleChange} placeholder="City" className="mb-4 w-full p-2 border" required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;
