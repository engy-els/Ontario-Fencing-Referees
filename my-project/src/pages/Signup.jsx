import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';

const Signup = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    city: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, city } = form;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        firstName,
        lastName,
        city
      });
      alert('Signup successful');
    } catch (error) {
      console.error(error);
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-10">
      <input name="firstName" placeholder="First Name" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="city" placeholder="City" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} className="border p-2 w-full mb-2" />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} className="border p-2 w-full mb-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
    </form>
  );
};

export default Signup;